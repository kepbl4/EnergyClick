import os
from pathlib import Path
from fastapi import Body, FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import httpx

base_dir = Path(__file__).resolve().parent.parent
app = FastAPI()
app.mount("/static", StaticFiles(directory=base_dir / "app" / "static"), name="static")
templates = Jinja2Templates(directory=base_dir / "app" / "templates")

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/{path:path}", response_class=HTMLResponse)
async def spa(request: Request, path: str):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/setup/menu")
async def setup_menu(payload: dict = Body(...)):
    bot_token = os.getenv("BOT_TOKEN")
    owner_id = os.getenv("OWNER_ID")
    webapp_url = os.getenv("WEBAPP_URL")
    if not bot_token or not owner_id or not webapp_url:
        raise HTTPException(status_code=500, detail="Environment misconfigured")
    try:
        expected_owner = int(owner_id)
    except ValueError as exc:
        raise HTTPException(status_code=500, detail="Environment misconfigured") from exc
    try:
        owner_value = int(payload.get("owner"))
    except (TypeError, ValueError) as exc:
        raise HTTPException(status_code=400, detail="Invalid owner") from exc
    if owner_value != expected_owner:
        raise HTTPException(status_code=403, detail="Forbidden")
    url = f"https://api.telegram.org/bot{bot_token}/setChatMenuButton"
    body = {
        "menu_button": {
            "type": "web_app",
            "text": "Відкрити EnergyClick1",
            "web_app": {"url": webapp_url}
        }
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=body)
    return JSONResponse(status_code=response.status_code, content=response.json())
