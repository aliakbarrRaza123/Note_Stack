# 📝 Note Stack

**Note Stack** is a full-stack note management application built using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)**.

The application allows users to securely register, log in, and manage their personal notes. Authenticated users can create, view, update, and delete their notes through a clean and responsive interface.

---

## 🚀 Features

### 👤 Authentication

* ✅ User Registration
* ✅ User Login
* ✅ JWT-based Authentication
* ✅ Secure Password Hashing using bcrypt
* ✅ Protected Routes
* ✅ User-specific Notes

### 📝 Note Management

* ✅ Create Notes
* ✅ View All Personal Notes
* ✅ Update Notes
* ✅ Delete Notes
* ✅ Add Note Title
* ✅ Add Note Description
* ✅ Add Note Tags
* ✅ Display Notes with Date Information

### 🎨 Frontend

* ✅ Responsive User Interface
* ✅ React Functional Components
* ✅ React Hooks
* ✅ Context API for State Management
* ✅ React Router for Navigation
* ✅ Alert Messages
* ✅ Authentication-aware UI

---

## 🛠️ Technology Stack

### Frontend

* **React.js**
* **JavaScript (ES6+)**
* **HTML5**
* **CSS3**
* **Bootstrap 5**
* **React Router**
* **Context API**

### Backend

* **Node.js**
* **Express.js**
* **REST API**
* **JWT (JSON Web Token)**
* **bcryptjs**
* **Express Validator**

### Database

* **MongoDB**
* **Mongoose**

### Development Tools

* Git
* GitHub
* VS Code
* Thunder Client
* Nodemon

---

## 📁 Project Structure

```text id="3x7pqa"
Note_Stack/
│
├── backend/
│   ├── middleware/
│   │   └── fetchuser.js          # Authentication middleware
│   │
│   ├── models/
│   │   ├── User.js               # User model
│   │   └── Note.js               # Note model
│   │
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   └── notes.js              # Notes routes
│   │
│   ├── .env                      # Environment variables
│   └── index.js                  # Backend entry point
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── About.js
│   │   ├── Alert.js
│   │   ├── Login.js
│   │   ├── Navbar.js
│   │   ├── NoteItem.js
│   │   ├── Notes.js
│   │   └── Signup.js
│   │
│   ├── context/
│   │   └── notes/
│   │       ├── NoteContext.js
│   │       └── NoteState.js
│   │
│   ├── App.js
│   └── index.js
│
├── concepts.txt
├── package.json
├── package-lock.json
├── vercel.json
└── README.md
```

---

## 🔗 API Endpoints

### Authentication

| Method | Endpoint               | Description             |
| ------ | ---------------------- | ----------------------- |
| `POST` | `/api/auth/createuser` | Register a new user     |
| `POST` | `/api/auth/getuser`    | Authenticate/login user |

### Notes

| Method   | Endpoint                    | Description                       |
| -------- | --------------------------- | --------------------------------- |
| `GET`    | `/api/notes/fetchallnotes`  | Fetch all notes of logged-in user |
| `POST`   | `/api/notes/addnote`        | Create a new note                 |
| `PUT`    | `/api/notes/updatenote/:id` | Update an existing note           |
| `DELETE` | `/api/notes/deletenote/:id` | Delete a note                     |

> Authentication is required for protected note endpoints. A valid JWT token must be provided with the request.

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/)
* Git
* npm

---

### 1. Clone the Repository

```bash id="n7d2wq"
git clone https://github.com/aliakbarrRaza123/Note_Stack.git
```

Navigate into the project:

```bash id="j4k8mz"
cd Note_Stack
```

---

### 2. Install Frontend Dependencies

From the project root:

```bash id="v5r1xc"
npm install
```

---

### 3. Install Backend Dependencies

Navigate to the backend directory:

```bash id="a9q3hf"
cd backend
npm install
```

---

### 4. Configure Environment Variables

Create a `.env` file inside the `backend` directory.

Example:

```env id="c6t2py"
PORT=5000
MONGO_URI=mongodb://localhost:27017/Note_Stack
JWT_SECRET=YOUR_SECRET_KEY
```

Replace the values according to your local MongoDB and configuration.

> **Important:** Never commit your `.env` file or secret keys to GitHub.

---

## ▶️ Running the Application

### Start the Backend

Inside the `backend` directory:

```bash id="z8m4vx"
node index.js
```

Or, if Nodemon is installed:

```bash id="q1s6kb"
npx nodemon index.js
```

The backend will run on:

```text id="d5h9ra"
http://localhost:5000
```

### Start the Frontend

Open another terminal and return to the project root:

```bash id="e3k7nw"
cd ..
npm start
```

The React application will run on:

```text id="p2v8cs"
http://localhost:3000
```

---

## 🔐 Authentication Flow

Note Stack uses **JWT authentication** to protect user-specific resources.

The authentication flow works as follows:

```text id="r6y1zt"
User
  │
  ▼
Register / Login
  │
  ▼
Backend Authentication
  │
  ├── Password → bcrypt Hashing
  │
  └── JWT Token Generated
              │
              ▼
        Authenticated Requests
              │
              ▼
       fetchuser Middleware
              │
              ▼
        User ID Retrieved
              │
              ▼
        User's Personal Notes
```

Each user's notes are associated with their user ID, ensuring that authenticated users can access their own notes.

---

## 🧠 React Concepts Used

This project was developed to practice and demonstrate several important React concepts:

* Functional Components
* `useState`
* `useEffect`
* `useContext`
* Context API
* Props
* React Router
* Conditional Rendering
* State Management
* Component Reusability
* Protected UI
* API Integration

---

## 🔧 Backend Concepts Used

The backend demonstrates:

* Express.js routing
* REST API development
* Middleware
* JWT authentication
* Password hashing with bcrypt
* Express Validator
* MongoDB database operations
* Mongoose models
* CRUD operations
* Environment variables
* Authentication and authorization

---

## 🎯 Project Goals

The main purpose of Note Stack was to build a practical full-stack application while understanding how a React frontend communicates with a Node.js/Express backend and MongoDB database.

The project helped demonstrate:

* Full-stack application architecture
* Frontend-backend communication
* REST API development
* User authentication
* Database operations
* Secure password handling
* JWT-based authorization
* State management using Context API

---

## 🌐 Deployment

The project is currently configured for local development.

The frontend contains a `vercel.json` configuration for deployment, while the backend requires a separately hosted server and a cloud MongoDB database for a complete production deployment.

For local development, run the frontend and backend separately as described above.

---

## 🔮 Future Improvements

Possible improvements include:

* 🌐 Complete cloud deployment
* ☁️ MongoDB Atlas integration
* 🔑 Password reset functionality
* 👤 User profile management
* 🔍 Search notes
* 📌 Pin important notes
* 🏷️ Advanced tag filtering
* 🌙 Improved theme customization
* 📱 Progressive Web App support

---

## 👨‍💻 Author

**Ali Akbar Raza**

Software Engineering Student

GitHub: [aliakbarrRaza123](https://github.com/aliakbarrRaza123)

---

⭐ If you find this project useful, consider giving the repository a star!
