# Kanban Task Manager

## Backend

```bash
npm install express cors
node server.js
```

Runs on `http://localhost:4000`

## Frontend

Add a `.env.local` file inside `frontend/`:

```env
NEXT_PUBLIC_API_URL=https://productivity101.onrender.com
```

Then:

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:3000`