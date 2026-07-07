# ChatWave — MERN Stack Real-time Chat App

🔗 **Live Demo:** [chat-wave-orcin-ten.vercel.app](https://chat-wave-orcin-ten.vercel.app/)

![ChatApp Screenshot](/demo/login.png)
![ChatApp Screenshot](/demo/chat_page.png)
![ChatApp Screenshot](/demo/chats.png)

ChatWave is a MERN (MongoDB, Express.js, React.js, Node.js) stack chat application with real-time one-to-one messaging and a WhatsApp-inspired UI. Users can create an account, set a profile picture, and chat with other registered users in real time via Socket.io.

## Features

- **One-to-One Real-time Chat** powered by Socket.io
- **User Authentication** with JWT tokens + bcrypt password hashing
- **Protected API routes** (messages, avatar upload) require a valid JWT
- **Profile Picture** upload via Cloudinary
- **WhatsApp-style UI**

## Project Structure

```
ChatWave/
├── client/   -> React frontend
└── server/   -> Node/Express backend + MongoDB
```

## Setup Instructions

### 1. Server

```shell
cd server
npm install
```

Create a `.env` file inside `server/` with:

```
MONGO_URL=<your_mongodb_connection_string>
CLOUD_NAME=<your_cloudinary_cloud_name>
API_KEY=<your_cloudinary_api_key>
API_SECRET=<your_cloudinary_secret>
JWT_SECRET=<any_long_random_string_you_make_up>
PORT=5000
```

Start the server:

```shell
npm start
```

### 2. Client

```shell
cd client
npm install
```

The client already has a `.env` file set to `REACT_APP_APP_ENV=local`, which points it at your own local server (`http://localhost:5000`). This is your own instance with your own empty database — no one else's account data is in it.

Start the client:

```shell
npm start
```

### 3. Open the app

Visit http://localhost:3000, register a new account, set a profile picture, and start chatting. Open two different browsers (or one normal + one incognito) and register two accounts to test real-time chat with yourself.

## Deployment

The live demo above is deployed as:

- **Client** → [Vercel](https://vercel.com/), built from the `client/` folder → https://chat-wave-orcin-ten.vercel.app/
- **Server** → [Render](https://render.com/), running the `server/` folder → https://chatwave-km6e.onrender.com

To deploy your own copy:

1. **Deploy the server first** (Render/Railway/etc.) with the environment variables listed in the Server setup step above. Note down the live URL it gives you, e.g. `https://your-server.onrender.com`.
2. **Deploy the client to Vercel**, with the project root set to `client/`. In the Vercel project's Environment Variables, add:
   ```
   REACT_APP_APP_ENV=prod
   REACT_APP_PROD_HOST=https://your-server.onrender.com
   ```
3. Redeploy the client — it will now talk to your live server instead of `localhost:5000`.

> **Note:** Render's free tier spins the server down after inactivity, so the first request after a while may take ~30-60 seconds to respond while it wakes up.

## Technologies Used

- **MongoDB** - database
- **Mongoose** - schema modeling for MongoDB
- **Express.js** - server framework
- **React.js** - frontend UI
- **Node.js** - server runtime
- **Socket.io** - real-time messaging
- **JWT (jsonwebtoken)** - authentication tokens
- **bcrypt.js** - password hashing
- **Cloudinary** - profile image storage

## License
This project is licensed under the MIT License.

Happy Chatting!
