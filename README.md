# secure-web-app

Full-stack fish shop demo with LiqPay payments (sandbox), JWT auth, admin panel.

## Setup

### Backend
1. `cd backend`
2. Copy `.env.example` to `.env` and fill values (MONGO_URI, JWT_SECRET, LIQPAY_PUBLIC, LIQPAY_PRIVATE, BASE_URL)
3. `npm install`
4. `npm run dev` (runs nodemon)

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

Frontend runs on http://localhost:5173, backend on http://localhost:5000 by default.

## Notes
- The provided `.env` in this package contains the **sandbox** LiqPay keys you gave. **Do not push private keys to any public repo.** Rotate keys after use.
- To test payments use LiqPay sandbox workflow.
- To create an admin user: register a user, then set role to 'admin' in the database (Mongo shell / MongoDB Compass).
