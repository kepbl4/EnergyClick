# EnergyClick1

## Local development

```bash
uvicorn api.index:app --reload
```

Перед запуском експортируйте у shell значення `BOT_TOKEN`, `OWNER_ID`, `WEBAPP_URL`.

## Deploy на Render

### Варіант 1. Інфраструктура як код (рекомендовано)

1. Встановіть [Render CLI](https://render.com/docs/cli) та авторизуйтесь.
2. Відредагуйте `render.yaml`, підставивши власні значення змінних середовища (див. нижче).
3. Виконайте команду деплою:

   ```bash
   render blueprint launch
   ```

4. Після створення сервісу Render автоматично запустить контейнер з образу, зібраного на основі `Dockerfile`.

> Коли сервіс отримає фінальний домен від Render, оновіть значення `WEBAPP_URL` у змінних середовища.

### Варіант 2. Налаштування через dashboard.render.com

1. На [dashboard.render.com](https://dashboard.render.com/) натисніть **New → Web Service**.
2. Оберіть «Build and deploy from a Git repository», додайте репозиторій проекту.
3. У полі **Branch** вкажіть гілку з продакшн-кодом.
4. У розділі **Environment** виберіть значення `Docker`.
5. У полі **Dockerfile path** лишіть `Dockerfile`, **Docker context** — `.`.
6. У розділі **Instance Type** оберіть потрібний тариф (Free підійде для тесту).
7. Додайте змінні середовища у вкладці **Environment**:
   - `BOT_TOKEN = <ваш Telegram Bot API token>`
   - `OWNER_ID = <ваш Telegram numeric user ID>`
   - `WEBAPP_URL = <https://ваш-домен-на-Render>`
8. Збережіть налаштування та натисніть **Create Web Service** — Render побудує Docker-образ та запустить застосунок.

> Після того як сервіс отримає постійний домен від Render, оновіть значення `WEBAPP_URL`, щоб воно відповідало продакшн-URL бота.

### Після деплою

1. Виконайте команду для публікації меню бота (підставте власні значення домену та ID власника):

   ```bash
   curl -X POST https://<ваш-домен>/setup/menu \
     -H "Content-Type: application/json" \
     -d '{"owner":"<OWNER_ID>"}'
   ```

2. Відкрийте чат з [@energyclick1bot](https://t.me/energyclick1bot), розгорніть меню та оберіть WebApp.
