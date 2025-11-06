from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os
import httpx

app = FastAPI()
app.mount("/static", StaticFiles(directory="app/static"), name="static")
templates = Jinja2Templates(directory="app/templates")

@app.get("/", response_class=HTMLResponse)
def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "title": "EnergyClick1"})

@app.get("/{path:path}", response_class=HTMLResponse)
def spa(request: Request, path: str):
    return templates.TemplateResponse("index.html", {"request": request, "title": "EnergyClick1"})

@app.post("/setup/menu")
async def setup_menu(req: Request):
    owner_id = os.getenv("OWNER_ID")
    token = os.getenv("BOT_TOKEN")
    webapp_url = os.getenv("WEBAPP_URL")
    if not token or not owner_id or not webapp_url:
        raise HTTPException(500, "env")
    data = await req.json()
    if str(data.get("owner")) != str(owner_id):
        raise HTTPException(403, "forbidden")
    async with httpx.AsyncClient(timeout=20) as c:
        payload = {"menu_button":{"type":"web_app","text":"Відкрити EnergyClick1","web_app":{"url":webapp_url}}}
        r = await c.post(f"https://api.telegram.org/bot{token}/setChatMenuButton", json=payload)
        return JSONResponse(r.json())
