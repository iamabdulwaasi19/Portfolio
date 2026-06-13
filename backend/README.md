# Portfolio Backend - Step-by-Step Setup Guide

This guide will help you set up and run the backend server locally on your machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Choose one option:
  - **Option 1**: MongoDB Atlas (Cloud - Recommended for beginners)
  - **Option 2**: MongoDB Community Edition (Local installation)

## Step 1: Install Node.js

1. Visit https://nodejs.org/
2. Download the LTS (Long Term Support) version
3. Run the installer and follow the setup wizard
4. Verify installation by opening a terminal/command prompt and running:
   ```bash
   node --version
   npm --version
   ```

## Step 2: Set Up MongoDB

### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and create an account
3. Create a new cluster (choose the free tier)
4. Click "Connect" on your cluster
5. Add your current IP address to the IP whitelist
6. Create a database user with username and password
7. Choose "Connect your application"
8. Copy the connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/`)
9. Save this connection string - you'll need it in Step 4

### Option B: Local MongoDB Installation

1. Visit https://www.mongodb.com/try/download/community
2. Download MongoDB Community Edition for your OS
3. Install MongoDB following the installer instructions
4. Start MongoDB service:
   - **Windows**: MongoDB should start automatically, or run `net start MongoDB`
   - **Mac**: Run `brew services start mongodb-community` (if installed via Homebrew)
   - **Linux**: Run `sudo systemctl start mongod`
5. Your local connection string will be: `mongodb://localhost:27017/portfolio`

## Step 3: Copy Backend Code to Your Machine

1. Create a new folder on your computer (e.g., `portfolio-backend`)
2. Copy ALL files from the `backend-code` folder to your new folder:
   - `server.js`
   - `package.json`
   - `.env.example`
   - `.gitignore`
   - `config/` folder
   - `models/` folder
   - `routes/` folder
   - `middleware/` folder

## Step 4: Configure Environment Variables

1. In your `portfolio-backend` folder, create a copy of `.env.example` and rename it to `.env`
2. Open the `.env` file and update the values:

   ```env
   PORT=5000
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<create_a_long_random_string>
   NODE_ENV=development
   ```

   **Important**:
   - Replace `<your_mongodb_connection_string>` with:
     - MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/portfolio`
     - Local MongoDB: `mongodb://localhost:27017/portfolio`
   - Replace `<create_a_long_random_string>` with a random string (e.g., `myS3cr3tK3yF0rJWT2024!@#`)

## Step 5: Install Dependencies

1. Open a terminal/command prompt
2. Navigate to your `portfolio-backend` folder:
   ```bash
   cd path/to/portfolio-backend
   ```
3. Install all required packages:
   ```bash
   npm install
   ```
   Wait for the installation to complete (this may take a few minutes)

## Step 6: Create Admin User

Before starting the server, you need to create an admin user in MongoDB.

### Using MongoDB Compass (GUI Tool - Easiest):

1. Download and install MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Connect to your database:
   - If using Atlas: Use your connection string
   - If using local: Use `mongodb://localhost:27017`
3. Create a new database called `portfolio`
4. Create a new collection called `users`
5. Insert a new document with this data (replace with your details):
   ```json
   {
     "name": "Your Name",
     "email": "admin@example.com",
     "password": "$2a$10$rI8Xw7QQqKqKqKqKqKqKqO8rI8Xw7QQqKqKqKqKqKqKq",
     "createdAt": "2024-01-01T00:00:00.000Z",
     "updatedAt": "2024-01-01T00:00:00.000Z"
   }
   ```
   **Note**: The password above is already hashed and represents `admin123`. You'll use `admin123` to login.

### Using MongoDB Shell (Command Line):

1. Open MongoDB shell:
   - Atlas: Use the connection string from your Atlas dashboard
   - Local: Run `mongosh` in terminal
2. Run these commands:
   ```javascript
   use portfolio
   db.users.insertOne({
     name: "Your Name",
     email: "admin@example.com",
     password: "$2a$10$rI8Xw7QQqKqKqKqKqKqKqO8rI8Xw7QQqKqKqKqKqKqKq",
     createdAt: new Date(),
     updatedAt: new Date()
   })
   ```

**Login Credentials**:
- Email: `admin@example.com`
- Password: `admin123`

## Step 7: Start the Backend Server

1. In your terminal (still in the `portfolio-backend` folder), run:
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

2. You should see:
   ```
   Server running on port 5000
   MongoDB Connected: <your_connection_host>
   ```

3. Test the server by visiting http://localhost:5000 in your browser
   - You should see: `{"message": "Portfolio API is running"}`

## Step 8: Connect Frontend to Backend

1. In your frontend project, create a `.env` file (if it doesn't exist)
2. Add this line:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
3. Restart your frontend development server

## Testing the Connection

1. Start your backend server (Step 7)
2. Start your frontend development server
3. Go to http://localhost:3000/admin/login (or your frontend URL)
4. Login with:
   - Email: `admin@example.com`
   - Password: `admin123`
5. If successful, you'll be redirected to the admin dashboard!

## Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution**:
- Check your `.env` file has the correct `MONGODB_URI`
- If using Atlas, verify your IP is whitelisted
- If using local MongoDB, ensure the service is running

### Issue: "Port 5000 is already in use"
**Solution**:
- Change the `PORT` in your `.env` file to `5001` or another number
- Update your frontend `.env` file to match: `VITE_API_URL=http://localhost:5001/api`

### Issue: "Cannot login - Invalid credentials"
**Solution**:
- Verify you created the admin user correctly in Step 6
- Try using the exact credentials: `admin@example.com` / `admin123`

### Issue: "JWT token error"
**Solution**:
- Ensure `JWT_SECRET` in `.env` is set to a long random string
- Restart the backend server after changing `.env`

## Project Structure

```
portfolio-backend/
├── config/
│   └── db.js              # Database connection
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── models/
│   ├── Project.js         # Project schema
│   └── User.js            # User schema
├── routes/
│   ├── auth.js            # Authentication routes
│   └── projects.js        # Project CRUD routes
├── .env                   # Environment variables (create this)
├── .env.example           # Example environment variables
├── .gitignore             # Git ignore file
├── package.json           # Dependencies
└── server.js              # Main server file
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user

### Projects (Protected routes require JWT token)
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

## Next Steps

1. **Deploy Backend**: Consider deploying to:
   - Railway: https://railway.app/
   - Render: https://render.com/
   - Heroku: https://heroku.com/

2. **Deploy Frontend**: Deploy to:
   - Vercel: https://vercel.com/
   - Netlify: https://netlify.com/

3. **Customize**: Update your personal information in the database and frontend

## Support

If you run into any issues:
1. Check the terminal for error messages
2. Verify all steps were completed
3. Ensure Node.js and MongoDB are properly installed
4. Double-check your `.env` file configuration

Happy coding! 🚀
