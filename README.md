🍬 Sweet Shop Management System – Backend

A RESTful backend API for managing a Sweet Shop, built with Node.js, Express, MongoDB, and JWT-based authentication.
This backend supports user authentication, role-based authorization, sweet inventory management, and automated testing.

🚀 Features

User registration & login (JWT authentication)

Role-based authorization (USER / ADMIN)

Sweet CRUD operations

Inventory management (purchase & restock)

Protected APIs using middleware

Automated tests using Jest & Supertest

Clean, modular architecture

🛠️ Tech Stack

Runtime: Node.js

Framework: Express.js

Database: MongoDB (Mongoose ODM)

Authentication: JWT + bcrypt

Testing: Jest, Supertest

Version Control: Git

📂 Project Structure
src/
 ├── app.js
 ├── server.js
 ├── config/
 │    └── db.js
 ├── models/
 │    ├── User.js
 │    └── Sweet.js
 ├── controllers/
 │    ├── auth.controller.js
 │    └── sweet.controller.js
 ├── routes/
 │    ├── auth.routes.js
 │    └── sweet.routes.js
 ├── middlewares/
 │    ├── auth.middleware.js
 │    └── role.middleware.js
 └── tests/
      ├── setup.js
      ├── auth.test.js
      └── sweet.test.js

⚙️ Environment Variables

Create a .env file in the root directory:

PORT=5000
MONGO_URI=mongodb://localhost:27017/sweet-shop
JWT_SECRET=your_jwt_secret_key


⚠️ Do not commit .env to version control.

▶️ Running the Project Locally
1️⃣ Install dependencies
npm install

2️⃣ Start MongoDB

Make sure MongoDB is running locally (or update MONGO_URI for Atlas).

3️⃣ Start the server
npm run dev


Server will start at:

http://localhost:5000

🔐 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and get JWT
Sweets (Protected)
Method	Endpoint	Access
POST	/api/sweets	Auth
GET	/api/sweets	Auth
GET	/api/sweets/search	Auth
PUT	/api/sweets/:id	Auth
DELETE	/api/sweets/:id	Admin
Inventory
Method	Endpoint	Access
POST	/api/sweets/:id/purchase	Auth
POST	/api/sweets/:id/restock	Admin
🧪 Running Tests

This project follows TDD principles with automated integration tests.

npm test

Test Coverage Includes:

User registration & login

Protected route access

Role-based authorization

Sweet CRUD operations

Inventory purchase & restock logic

🤖 My AI Usage
AI Tools Used

ChatGPT

How I Used AI

To scaffold boilerplate code for Express routes and controllers

To design REST API structure and middleware layering

To debug runtime and testing issues

To write and refine Jest + Supertest test cases

My Reflection

AI significantly accelerated development by reducing setup time and helping debug issues faster.
All logic was reviewed, understood, and manually validated to ensure correctness and originality.

📌 Notes

MongoDB databases and collections are created automatically on first write.

Passwords are securely hashed using bcrypt.

JWT tokens are required for all protected endpoints.

Admin-only operations are enforced via role-based middleware.

✅ Status

✔ Backend complete
✔ Tests passing
✔ Ready for frontend integration & deployment

📦 Future Enhancements (Optional)

Global error handling middleware

Pagination & sorting for sweets

Docker support

Deployment on Render / Railway / AWS

🧾 License

This project is for educational and assessment purposes