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
```text
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
```

⚙️ Installation
1. Clone the repository:

```bash
git clone https://github.com/antony-s17/ecommerce-backend
cd ecommerce-backend
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

## Demo Credentials

To test the administrator features, use the following demo account:

- **Email:** admin@gmail.com
- **Password:** admin123*

These credentials are provided for evaluation purposes only.

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

---

## API Endpoints

Below are the main API endpoints, example requests and short descriptions. The full interactive docs are available at `/api/docs` once the server is running.

Authentication

- Register user

  POST /api/auth/register

  Request JSON:

  ```json
  {
    "username": "jdoe",
    "email": "jdoe@example.com",
    "password": "strongpassword"
  }
  ```

  Example curl:

  ```bash
  curl -X POST http://localhost:3000/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{"username":"jdoe","email":"jdoe@example.com","password":"secret"}'
  ```

- Login

  POST /api/auth/login

  Request JSON:

  ```json
  {
    "email": "jdoe@example.com",
    "password": "secret"
  }
  ```

  Example curl (response sets `access_token` cookie):

  ```bash
  curl -i -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"jdoe@example.com","password":"secret"}'
  ```

- Logout

  POST /api/auth/logout (requires authentication cookie)

User

- Get authenticated profile

  GET /api/user/profile

  Example curl:

  ```bash
  curl -b "access_token=..." http://localhost:3000/api/user/profile
  ```

Products

- Get all products

  GET /api/product

- Create product (ADMIN)

  POST /api/product

  Body: `ProductCreate` schema (see OpenAPI or `src/docs/schemas/product.js`)

- Get / Update / Delete by id

  GET /api/product/{id}
  PUT /api/product/{id}
  DELETE /api/product/{id}

Reviews

- Create review for product

  POST /api/product/{productId}/reviews

- Get reviews for product

  GET /api/product/{productId}/reviews

Cart

- Add item to cart

  POST /api/cart

  Body example:

  ```json
  { "productId": "<product-id>", "quantity": 1 }
  ```

- Get cart

  GET /api/cart

- Checkout

  POST /api/cart/checkout

Wishlist

- Add product to wishlist

  POST /api/wishlist

  Body example:

  ```json
  { "productId": "<product-id>" }
  ```

- Get wishlist

  GET /api/wishlist

- Remove product from wishlist

  DELETE /api/wishlist/{productId}

Notes

- All endpoints that require authentication expect the `access_token` cookie to be set. Use the `/api/auth/login` endpoint which sets the cookie on successful login.
- For full request/response schemas consult the OpenAPI spec served at `/api/docs` or the JSON schemas inside `src/docs/schemas/`.
