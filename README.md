# EnergyClick1

## Local development

```bash
uvicorn api.index:app --reload
```

Перед запуском експортируйте у shell значення `BOT_TOKEN`, `OWNER_ID`, `WEBAPP_URL`.

## Deploy на Vercel

1. Підключіть репозиторій до Vercel.
2. У Project Settings → Environment Variables додайте:
   - `BOT_TOKEN = <ваш Telegram Bot API token>`
   - `OWNER_ID = <ваш Telegram numeric user ID>`
   - `WEBAPP_URL = <прод-URL проекту на Vercel>`
3. Задеплойте проект.
4. Після деплою виконайте команду:

```bash
curl -X POST https://<ваш-домен>/setup/menu \
  -H "Content-Type: application/json" \
  -d '{"owner":7390743758}'
```

5. Відкрийте чат з [@energyclick1bot](https://t.me/energyclick1bot), розгорніть меню та оберіть WebApp.
