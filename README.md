# Products Backend

📌 Description
Backend API for a products e-commerce project. Implements product management, user authentication, wishlist, cart and reviews. Includes OpenAPI documentation served at `/api/docs`.

🚀 Demo / Docs
- Swagger UI: `http://localhost:3000/api/docs`

🛠️ Technologies
- Node.js (ES modules)
- Express 5
- MongoDB (mongoose)
- JWT for authentication
- swagger-jsdoc + swagger-ui-express

📂 Project structure

products-backend/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   ├── docs/
│   │   └── schemas/
│   ├── db/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── prisma/
├── package.json
└── README.md

⚙️ Installation
1. Clone the repository:

```bash
git clone https://github.com/antony-s17/products-backend.git
cd products-backend
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` with the required variables (PORT, MONGO_URI, JWT_SECRET, etc.).

▶️ Run (development)

```bash
pnpm run dev
```

Usage
- Open `http://localhost:3000/api/docs` to view interactive API documentation.
- Health check: `GET /health`
- API base paths mounted in `src/app.js`:
  - `/api/auth` — register, login, logout
  - `/api/user` — user profile
  - `/api/product` — product CRUD and nested reviews
  - `/api/cart` — cart operations and checkout
  - `/api/wishlist` — wishlist management

🌤️ API details
The OpenAPI schemas are defined under `src/docs/schemas/` and referenced by `swagger-jsdoc` configuration.

📌 Best practices applied
- Organized controllers, routes and services
- Centralized error handling and validation
- Swagger documentation generated from route comments and shared schemas

👨‍💻 Author
GitHub: https://github.com/antony-s17