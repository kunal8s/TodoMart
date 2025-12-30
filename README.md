# Primetrade.ai ASSIGNMENT

<div align="center">
  <h1>🛒 TodoMART</h1>
  <p><strong>Smart Shopping Made Simple</strong></p>
  <p>A full-stack todo/shopping list application with user authentication, real-time CRUD operations, and a modern responsive UI.</p>
  
  ![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)
  ![React](https://img.shields.io/badge/React-18+-blue?style=flat-square&logo=react)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-blue?style=flat-square&logo=postgresql)
  ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)
</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Authentication Flow](#-authentication-flow)
- [Database Schema](#-database-schema)
- [Scaling for Production](#-scaling-for-production)
- [Future Scope & Improvements](#-future-scope--improvements)
- [Contributing](#-contributing)

---

## 🌟 Overview

**TodoMART** is a modern, full-stack shopping list/todo management application designed to help users organize their shopping needs efficiently. The application features secure user authentication, real-time todo management, and a beautiful, responsive user interface.

### Why TodoMART?

- **Never Forget What to Buy**: Keep track of all your shopping items in one place
- **Secure & Private**: JWT-based authentication ensures your data stays secure
- **Cross-Platform**: Access your lists from any device with a web browser
- **Intuitive UI**: Modern, gradient-rich design with smooth animations
- **Real-time Updates**: Instant CRUD operations with immediate UI feedback

---

## ✨ Features

### Authentication
- ✅ User registration with email validation
- ✅ Secure login with JWT tokens
- ✅ HTTP-only cookie storage for enhanced security
- ✅ Password hashing with bcrypt
- ✅ Session management with auto-logout

### Todo Management
- ✅ Create new todo items with name and description
- ✅ View all todos in a responsive grid layout
- ✅ Update existing todos with pre-filled forms
- ✅ Delete individual todos with confirmation
- ✅ Bulk delete multiple todos with multi-select mode

### User Experience
- ✅ Modern gradient UI matching production standards
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Loading states and error handling
- ✅ Smooth animations and transitions
- ✅ Intuitive navigation flow

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library for building component-based interfaces |
| **Vite** | Fast development server and build tool |
| **React Router v6** | Client-side routing and navigation |
| **TailwindCSS** | Utility-first CSS framework for styling |
| **Fetch API** | HTTP client for API communication |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web application framework |
| **PostgreSQL (Neon)** | Primary database for structured data |
| **MongoDB Atlas** | Secondary database (optional features) |
| **JWT** | Stateless authentication tokens |
| **Bcrypt** | Password hashing algorithm |
| **Joi** | Input validation library |
| **Helmet** | Security middleware |
| **CORS** | Cross-origin resource sharing |

### DevOps & Tools
| Technology | Purpose |
|------------|---------|
| **Nodemon** | Development auto-reload |
| **ESLint** | Code linting and formatting |
| **dotenv** | Environment variable management |

---

## 📁 Project Structure

```
TodoMART/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── signin.controller.js    # Authentication login logic
│   │   │   ├── signup.controller.js    # User registration logic
│   │   │   ├── todo.controller.js      # Todo CRUD operations
│   │   │   ├── dashboard.controller.js # Dashboard endpoints
│   │   │   └── home.controller.js      # Homepage endpoints
│   │   ├── database/
│   │   │   ├── dbPostgresql.js         # PostgreSQL connection pool
│   │   │   └── dbMongoose.js           # MongoDB connection
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js      # JWT verification
│   │   │   ├── validation.middleware.js # Signup/Signin validation
│   │   │   └── todo.validation.js      # Todo input validation
│   │   ├── routes/
│   │   │   ├── index.routes.js         # Route aggregator
│   │   │   ├── signup.routes.js        # Registration routes
│   │   │   ├── signin.routes.js        # Login routes
│   │   │   ├── todo.routes.js          # Todo CRUD routes
│   │   │   ├── dashboard.routes.js     # Dashboard routes
│   │   │   └── homepage.routes.js      # Homepage routes
│   │   └── utils/
│   │       ├── bcrypt.util.js          # Password hashing utilities
│   │       └── jwt.util.js             # JWT token utilities
│   ├── app.js                          # Express app configuration
│   ├── server.js                       # Server entry point
│   ├── package.json                    # Backend dependencies
│   └── .env                            # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Homepage.jsx            # Landing page
│   │   │   ├── Homepage.css            # Landing page styles
│   │   │   ├── Signin.jsx              # Login page
│   │   │   ├── Signin.css              # Login page styles
│   │   │   ├── Signup.jsx              # Registration page
│   │   │   ├── signup.css              # Registration styles
│   │   │   ├── Dashboard.jsx           # Main todo management
│   │   │   └── Dashboard.css           # Dashboard styles
│   │   ├── App.jsx                     # Root component with routes
│   │   ├── App.css                     # Global app styles
│   │   ├── main.jsx                    # React entry point
│   │   └── index.css                   # Base styles
│   ├── public/                         # Static assets
│   ├── index.html                      # HTML template
│   ├── vite.config.js                  # Vite configuration
│   └── package.json                    # Frontend dependencies
│
└── README.md                           # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Neon recommended)
- MongoDB database (Atlas recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/TodoMART.git
   cd TodoMART
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the backend directory:
   ```env
   # Server
   PORT=5000
   NODE_ENV=development
   
   # PostgreSQL (Neon)
   POSTGRES_URL=postgresql://username:password@host/database?sslmode=require
   
   # MongoDB
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   
   # Bcrypt
   BCRYPT_SALT_ROUNDS=10
   ```

4. **Create Database Tables**
   
   Run the following SQL in your PostgreSQL database:
   ```sql
   -- Users table
   CREATE TABLE IF NOT EXISTS users (
     id SERIAL PRIMARY KEY,
     first_name VARCHAR(50) NOT NULL,
     last_name VARCHAR(50) NOT NULL,
     email VARCHAR(100) UNIQUE NOT NULL,
     password_hash VARCHAR(255) NOT NULL,
     newsletter_subscribed BOOLEAN DEFAULT true,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   );

   -- Todo items table
   CREATE TABLE IF NOT EXISTS todo_items (
     todo_id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     description TEXT,
     user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

6. **Run the Application**
   
   Terminal 1 (Backend):
   ```bash
   cd backend
   npm run dev
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd frontend
   npm run dev
   ```

7. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api
   - Health Check: http://localhost:5000/health

---

## 📡 API Documentation

**Base URL:** `http://localhost:5000/api`

All protected endpoints require a JWT token sent via:
- HTTP-only cookie (`authToken`)
- OR Authorization header (`Bearer <token>`)

---

### 🔐 Authentication Endpoints

#### 1. Register User
Creates a new user account.

```http
POST /api/signup
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!",
  "newsletterSubscribed": true
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Account created successfully! Welcome to TodoMART.",
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "newsletterSubscribed": true,
    "createdAt": "2024-12-30T10:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Please enter a valid email address",
    "password": "Password must be at least 8 characters"
  }
}
```

**Error Response (409 Conflict):**
```json
{
  "success": false,
  "message": "An account with this email already exists"
}
```

---

#### 2. Login User
Authenticates a user and returns a JWT token.

```http
POST /api/signin
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "rememberMe": false
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Verified successfully! Welcome back.",
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "newsletterSubscribed": true,
    "createdAt": "2024-12-30T10:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

**Error Response (503 Service Unavailable):**
```json
{
  "success": false,
  "message": "Service temporarily unavailable. Please try again later."
}
```

---

#### 3. Logout User
Clears the authentication cookie and logs out the user.

```http
POST /api/signin/logout
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 📝 Todo Endpoints (Protected)

> ⚠️ **Authentication Required**: All todo endpoints require a valid JWT token.

#### 1. Get All Todos
Retrieves all todo items for the authenticated user.

```http
GET /api/todos
Authorization: Bearer <token>
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "todos": [
    {
      "id": 1,
      "name": "Buy groceries",
      "description": "Milk, eggs, bread, butter",
      "createdAt": "2024-12-30T10:00:00.000Z",
      "updatedAt": "2024-12-30T10:00:00.000Z"
    },
    {
      "id": 2,
      "name": "Call dentist",
      "description": "Schedule annual checkup",
      "createdAt": "2024-12-30T09:30:00.000Z",
      "updatedAt": "2024-12-30T09:30:00.000Z"
    },
    {
      "id": 3,
      "name": "Pay bills",
      "description": null,
      "createdAt": "2024-12-30T09:00:00.000Z",
      "updatedAt": "2024-12-30T09:00:00.000Z"
    }
  ]
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Authentication required. Please sign in."
}
```

---

#### 2. Create Todo
Creates a new todo item for the authenticated user.

```http
POST /api/todos
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Buy groceries",
  "description": "Milk, eggs, bread, butter"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Todo item name (max 255 chars) |
| description | string | No | Optional description (max 2000 chars) |

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Todo item created successfully",
  "todo": {
    "id": 4,
    "name": "Buy groceries",
    "description": "Milk, eggs, bread, butter",
    "createdAt": "2024-12-30T11:00:00.000Z",
    "updatedAt": "2024-12-30T11:00:00.000Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "name": "Todo name is required"
  }
}
```

---

#### 3. Get Single Todo
Retrieves a specific todo item by ID.

```http
GET /api/todos/:todoId
Authorization: Bearer <token>
```

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| todoId | integer | The ID of the todo item |

**Success Response (200 OK):**
```json
{
  "success": true,
  "todo": {
    "id": 1,
    "name": "Buy groceries",
    "description": "Milk, eggs, bread, butter",
    "createdAt": "2024-12-30T10:00:00.000Z",
    "updatedAt": "2024-12-30T10:00:00.000Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Todo item not found"
}
```

---

#### 4. Update Todo
Updates an existing todo item.

```http
PUT /api/todos/:todoId
Authorization: Bearer <token>
Content-Type: application/json
```

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| todoId | integer | The ID of the todo item |

**Request Body:**
```json
{
  "name": "Buy groceries (updated)",
  "description": "Milk, eggs, bread, butter, cheese"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Todo item updated successfully",
  "todo": {
    "id": 1,
    "name": "Buy groceries (updated)",
    "description": "Milk, eggs, bread, butter, cheese",
    "createdAt": "2024-12-30T10:00:00.000Z",
    "updatedAt": "2024-12-30T12:00:00.000Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Todo item not found or access denied"
}
```

---

#### 5. Delete Single Todo
Deletes a specific todo item.

```http
DELETE /api/todos/:todoId
Authorization: Bearer <token>
```

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| todoId | integer | The ID of the todo item |

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Todo item deleted successfully"
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Todo item not found or access denied"
}
```

---

#### 6. Bulk Delete Todos
Deletes multiple todo items at once.

```http
POST /api/todos/bulk-delete
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "todoIds": [1, 2, 5, 8]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| todoIds | array | Yes | Array of todo IDs to delete |

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "4 todo item(s) deleted successfully",
  "deletedCount": 4
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Please provide an array of todo IDs to delete"
}
```

---

### 🏥 Health Check Endpoint

#### Server Health
Checks if the server is running.

```http
GET /health
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Server is healthy",
  "timestamp": "2024-12-30T10:00:00.000Z"
}
```

---

### ⚠️ Error Codes Summary

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created successfully |
| 400 | Bad Request - Validation error |
| 401 | Unauthorized - Invalid or missing token |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error |
| 503 | Service Unavailable - Database connection issue |

---

## 🔐 Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant DB as PostgreSQL

    U->>F: Enter credentials
    F->>B: POST /api/signin
    B->>DB: Verify user exists
    DB-->>B: User data
    B->>B: Compare password hash
    B->>B: Generate JWT token
    B-->>F: Token + User data (Set cookie)
    F->>F: Store in localStorage
    F->>U: Redirect to Dashboard
    
    Note over F,B: Subsequent requests include JWT
    
    F->>B: GET /api/todos (with Bearer token)
    B->>B: Verify JWT
    B->>DB: Fetch user todos
    DB-->>B: Todo list
    B-->>F: Todo data
```

---

## 🗄 Database Schema

### Users Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL | PRIMARY KEY |
| first_name | VARCHAR(50) | NOT NULL |
| last_name | VARCHAR(50) | NOT NULL |
| email | VARCHAR(100) | UNIQUE, NOT NULL |
| password_hash | VARCHAR(255) | NOT NULL |
| newsletter_subscribed | BOOLEAN | DEFAULT true |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### Todo Items Table
| Column | Type | Constraints |
|--------|------|-------------|
| todo_id | SERIAL | PRIMARY KEY |
| name | VARCHAR(255) | NOT NULL |
| description | TEXT | NULLABLE |
| user_id | INTEGER | FOREIGN KEY → users(id) |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

---

## 📈 Scaling for Production

### Frontend Scaling

1. **Build Optimization**
   - Enable production builds with `npm run build`
   - Use code splitting and lazy loading for routes
   - Implement image optimization and CDN delivery

2. **Caching Strategy**
   - Service Workers for offline functionality
   - Browser caching for static assets
   - React Query or SWR for API response caching

3. **Performance**
   - Implement virtualization for large lists
   - Use React.memo and useMemo for expensive computations
   - Enable gzip/brotli compression

### Backend Scaling

1. **Horizontal Scaling**
   - Deploy multiple instances behind a load balancer
   - Use PM2 cluster mode for multi-core utilization
   - Implement Redis for session storage across instances

2. **Database Optimization**
   - Connection pooling (already implemented)
   - Read replicas for heavy read operations
   - Database indexing on frequently queried columns
   - Query optimization and caching

3. **API Performance**
   - Implement rate limiting
   - Add request compression
   - Use Redis for caching frequent queries
   - Implement pagination for large datasets

### Infrastructure

```
                    ┌─────────────┐
                    │   CloudFlare│
                    │     CDN     │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │    Nginx    │
                    │ Load Balancer│
                    └──────┬──────┘
           ┌───────────────┼───────────────┐
           │               │               │
    ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
    │   Node.js   │ │   Node.js   │ │   Node.js   │
    │  Instance 1 │ │  Instance 2 │ │  Instance 3 │
    └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
           │               │               │
           └───────────────┼───────────────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
       ┌──────▼──────┐ ┌───▼───┐ ┌──────▼──────┐
       │ PostgreSQL  │ │ Redis │ │   MongoDB   │
       │   Primary   │ │ Cache │ │   Cluster   │
       └─────────────┘ └───────┘ └─────────────┘
```

---

## 🔮 Future Scope & Improvements

### Short-term Improvements

- [ ] **Email Verification** - Verify user emails during registration
- [ ] **Password Reset** - Forgot password functionality
- [ ] **Remember Me** - Extended session for trusted devices
- [ ] **Dark Mode** - Toggle between light and dark themes
- [ ] **Search & Filter** - Search todos by name or description

### Medium-term Features

- [ ] **Categories/Tags** - Organize todos into categories
- [ ] **Due Dates** - Add deadlines to todos
- [ ] **Priority Levels** - Mark items as high/medium/low priority
- [ ] **Sharing** - Share lists with family members
- [ ] **Push Notifications** - Reminder notifications
- [ ] **Drag & Drop** - Reorder todos with drag-and-drop

### Long-term Vision

- [ ] **Mobile App** - React Native iOS/Android apps
- [ ] **Voice Input** - Add items using voice commands
- [ ] **AI Suggestions** - Smart suggestions based on shopping history
- [ ] **Store Integration** - Price comparison across stores
- [ ] **Receipt Scanning** - Auto-add items from receipts
- [ ] **Offline Mode** - Full offline support with sync
- [ ] **Analytics Dashboard** - Shopping insights and spending trends

### Technical Improvements

- [ ] **Unit Tests** - Jest for frontend, Mocha for backend
- [ ] **E2E Tests** - Cypress or Playwright
- [ ] **CI/CD Pipeline** - GitHub Actions for automated deployment
- [ ] **Docker** - Containerization for consistent deployments
- [ ] **Kubernetes** - Orchestration for large-scale deployment
- [ ] **GraphQL** - Alternative API layer for flexible queries
- [ ] **WebSockets** - Real-time updates for shared lists

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is created as part of the Primetrade.ai assignment.

---

<div align="center">
  <p>Made with ❤️ for Primetrade.ai</p>
  <p><strong>TodoMART</strong> - Smart Shopping Made Simple</p>
</div>
