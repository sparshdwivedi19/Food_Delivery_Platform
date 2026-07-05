Backend run instructions

1. Create a `.env` in the `backend/` folder (or copy `.env.example`):

   MONGO_URI=your_mongo_connection_string_here
   PORT=4000
   STRIPE_SECRET_KEY=sk_test_your_test_key_here

2. Do NOT commit `.env` to source control. Add it to `.gitignore` if needed.

3. Install dependencies and start the server:

```powershell
cd "F:\PROJECTS\food del\backend"
npm install
npm start
```

4. If you prefer to set the Stripe key only for the current session (PowerShell):

```powershell
$env:STRIPE_SECRET_KEY="sk_test_..."
npm start
```

If you still get `STRIPE_SECRET_KEY is not set`, double-check that `backend/server.js` includes `import 'dotenv/config'` (already present) and that the `.env` file is in the `backend/` folder.
