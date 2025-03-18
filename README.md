# Library Backend API

A simple RESTful API for a library website built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Book management system with CRUD operations
- Wishlist functionality for users
- Admin role with additional privileges
- API documentation with Postman collection

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation**: Postman Collection

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- NPM or Yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/library-backend.git
cd library-backend
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory based on `.env.example`

```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB URI and JWT secret

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/library-db
JWT_SECRET=your_very_secure_jwt_secret_key
JWT_EXPIRE=30d
```

### Running the Server

Development mode with auto-restart:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user profile (protected)
- `PUT /api/auth/make-admin/:id` - Make a user an admin (admin only)

### Book Endpoints

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a single book
- `POST /api/books` - Create a new book (admin only)
- `PUT /api/books/:id` - Update a book (admin only)
- `DELETE /api/books/:id` - Delete a book (admin only)

### Wishlist Endpoints

- `GET /api/wishlist` - Get user's wishlist (protected)
- `POST /api/wishlist/:bookId` - Add a book to wishlist (protected)
- `DELETE /api/wishlist/:bookId` - Remove a book from wishlist (protected)

## Importing Postman Collection

1. Open Postman
2. Click on "Import" button
3. Upload the `postman/Library_API.json` file
4. Set the `BASE_URL` variable to your server URL (default: `http://localhost:5000`)
5. After login/register, set the received token to the `token` variable

## Creating the First Admin

To create the first admin, follow these steps:

1. Register a new user using the signup endpoint
2. Find the user ID in your MongoDB database
3. Use a MongoDB client to change the role to "admin":

```javascript
// Using MongoDB shell
db.users.updateOne({ _id: ObjectId("user_id_here") }, { $set: { role: "admin" } })
```

Or, if another admin exists, they can use the `make-admin` endpoint to promote a user.

## Deployment

For deployment, you can use:

1. **Render** - Easy setup with Git repository integration
2. **Heroku** - Simple Node.js app deployment
3. **Railway** - Modern platform with easy MongoDB integration
4. **Fly.io** - Performance-focused cloud platform

Example Deployment to Render:

1. Create an account on Render
2. Connect your Git repository
3. Create a new Web Service
4. Use the following settings:
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables from your `.env` file

## License

[MIT](LICENSE)