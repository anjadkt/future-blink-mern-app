# FUTURE BLINK MERN-APP

A simple MERN stack application that allows users to input a prompt, generate an AI response using OpenRouter, and visualize the flow using React Flow. Users can also save prompts and responses to MongoDB.

## Features

- Input prompt using React Flow node
- Generate AI response via OpenRouter API
- Visual connection between input and output nodes
- Save prompt & response to MongoDB
- AI responses based on saved chats
- Clean and interactive UI

## Tech Stack

- Language : Typescript
- Frontend: React, React Flow, Axios
- Backend: Node.js, Express.js
- validation : zod
- Database: MongoDB
- AI API: OpenRouter

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/anjadkt/future-blink-mern-app.git
cd your-repo
```

### 2. Setup Backend
cd server
npm install
npm run dev (development mode)
npm run build (build dist)
npm run start (start server)

### 3. Setup Env Backend
PORT = 3000
NODE_ENV = development
CLIENT_URL = your-frontend-url
SALT = 10
JWT_SECRET = your-secret
MONGO_URI = your-mongo-db-url
OPEN_ROUTER_KEY = your-open-router-api-key

### 4. Setup frontend
cd client
npm install
npm run dev

### 5. Setup Env Frontend
VITE_BASE_URL = your-backend-url/api


## API Endpoints

### POST /api/auth/register
Register a new user account and generate access/refresh tokens.

---

### POST /api/auth/login
Authenticate user and generate access/refresh tokens.

---

### GET /api/auth/refresh
Refresh the access token using a valid refresh token.

---

### GET /api/auth/logout
Logout the user and clear authentication tokens.  
**Auth Required:** Yes

---

### GET /api/auth/me
Get details of the currently authenticated user.  
**Auth Required:** Yes

---

### POST /api/ai/ask
Send a prompt to the AI model and receive a generated response.  
**Auth Required:** Yes

---

### POST /api/ai/save
Save the prompt and AI response to the database.  
**Auth Required:** Yes

---

## 🧠 How It Works

1. User lands on the login page.
2. If the user already has an account, they can log in; otherwise, they can register a new account.
3. After successful authentication, the user is redirected to the home page.
4. The home page displays two connected nodes:
   - Input Node → for entering the prompt  
   - Result Node → for displaying the AI response  
5. The user enters a prompt in the input node and clicks **"Execute Flow"**.
6. The frontend sends the prompt to the backend API.
7. The backend calls the OpenRouter API to generate a response.
8. The AI response is returned and displayed in the result node.
9. The user can:
   - Save the prompt and response to the database  **"Save chats"**
   - Clear the input and result fields **"Clear"**


## Demo

[Watch Demo Video](not_available)


## Deployment

Frontend: (https://future-blink-mern-app.vercel.app)  
Backend: (https://api-chatboy.onrender.com/api)


## Author

ANJAD KT  
MERN Stack Developer