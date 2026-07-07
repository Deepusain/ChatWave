# ChatWave — MERN Stack Real-time Chat App

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
