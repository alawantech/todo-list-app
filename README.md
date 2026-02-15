# Full-Stack Todo App (React + Express + Prisma + Neon)

This project contains:
- `backend`: Node.js + Express API with JWT auth, Prisma ORM, and PostgreSQL (Neon-compatible)
- `frontend`: React + Vite app with organized components, normal CSS, and Lucide React icons

## Features
- User registration and login
- Authenticated todo CRUD
- Todo fields: title, description, due date, completed status
- Mark todo as complete/incomplete
- Todo detail route (`/todos/:id`) for editing/deleting an individual todo
- Landing page, header, and footer

---

## 1) Backend setup

```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Set `DATABASE_URL` in `.env` to your Neon connection string.

## 2) Frontend setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` and calls backend on `http://localhost:4000/api` by default.
