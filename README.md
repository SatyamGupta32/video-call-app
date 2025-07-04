# VideoCalling Chat App

A full-stack real-time video calling and chat application with authentication, friend management, and notifications.

---

## 🚀 Features

- Real-time video calling
- Instant chat messaging
- User authentication (signup, login, onboarding)
- Friend requests and notifications
- Theming support
- Responsive UI

---

## 🛠️ Tech Stack

**Client:**

- React
- TanStack Query (React Query) for data fetching and mutations
- Tailwind CSS
- Axios

**Server:**

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication
- WebSockets/Streams for real-time features

---

## 📦 Installation & Setup

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### 1. Clone the repository

```bash
git clone https://github.com/SatyamGupta32/video-call-app.git
cd VideoCalling-Chat-App
```

### 2. Install dependencies

#### Server

```bash
cd server
npm install
```

#### Client

```bash
cd ../client
npm install
```

### 3. Configure Environment Variables

- Create a `.env` file in `server/` for DB connection, JWT secrets, etc.
- Create a `.env` file in `client/` for Sream api key, & secret etc.

### 4. Start the development servers

#### Server

```bash
cd server
npm run dev
```

#### Client

```bash
cd ../client
npm run dev
```

---

## 🗂️ Project Structure

```
VideoCalling Chat App/
├── client/           # Frontend React app
├── server/           # Backend Express server
├── package.json      # Root config
└── README.md         # Readme file
```

### Client Structure

```
client/
├── src/
│   ├── components/   # UI components (Button, Cards, Forms, etc.)
│   ├── constants/    # App-wide constants
│   ├── Hook/         # Custom React hooks (auth, login, signup, onboarding)
│   ├── lib/          # API paths, Axios instance, helpers
│   ├── pages/        # Main pages (Call, Chat, Friends, etc.)
│   ├── store/        # State management (e.g., theme store)
│   └── ...           # Other assets and configs
```

### Server Structure

```
server/
├── src/
│   ├── controllers/  # Route controllers (auth, chat, user)
│   ├── lib/          # DB connection, stream logic
│   ├── middlewares/  # Auth middlewares
│   ├── models/       # Mongoose models (user, friendRequest)
│   ├── routes/       # Express routes (auth, chat, user)
│   └── server.js     # Entry point
```

---

## 🖥️ Server Details

- **API:** RESTful endpoints for authentication, user, chat, and friend management.
- **Controllers:** Handle business logic for each route (auth, chat, user).
- **Auth:** JWT-based authentication, middleware for route protection.
- **Models:** Mongoose schemas for User, FriendRequest, etc.
- **DB:** MongoDB connection via Mongoose (`lib/db.js`).
- **Stream:** Real-time features (e.g., video call signaling) handled in `lib/stream.js`.
- **Middlewares:** Auth checks and other Express middlewares.
- **Routes:** Organized by feature (auth, chat, user).

---

## 💻 Client Details

- **Authentication:**
  - Uses TanStack Query for login, signup, onboarding, and session management.
  - Custom hooks in `src/Hook/` (e.g., `useAuthUser.js`, `useLogin.js`, `useSignup.js`, `useOnboarding.js`).
- **Mutations & Queries:**
  - Managed via TanStack Query for efficient data fetching and cache.
- **Components:**
  - Modular UI components in `src/components/` (Button, Cards, Forms, Loader, Navbar, Sidebar, etc.)
- **Constants:**
  - App-wide constants in `src/constants/constants.js`.
- **Libs:**
  - API paths (`lib/apiPath.js`), Axios instance (`lib/axios.js`), helpers (`lib/helper.js`).
- **Store:**
  - State management (e.g., theme) in `src/store/useThemeStore.js`.
- **Pages:**
  - Main app pages in `src/pages/` (Call, Chat, Friends, Home, etc.)

---

## ▶️ How to Run

1. Start MongoDB (locally or ensure your cloud DB is accessible).
2. Start the server:
   ```bash
   cd server
   npm run dev
   ```
3. Start the client:
   ```bash
   cd client
   npm run dev
   ```
4. Open your browser at `http://localhost:5173` (or the port shown in the terminal).

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

--- 
