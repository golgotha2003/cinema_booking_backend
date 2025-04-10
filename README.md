# 🎬 Cinema Booking Backend API

This is a RESTful backend API for a cinema booking system. It allows users to register, browse movies and showtimes, select seats, and book tickets. Admins can manage movies, showtimes, and theaters.

---

## 🔧 Features

- User registration & login with JWT authentication
- Role-based access control (User, Admin)
- Browse available movies and showtimes
- Select seats and book tickets
- Payment simulation (optional)
- Admin panel: CRUD for movies, showtimes, theaters, users
- Upload poster images to Cloudinary
- Robust error handling & input validation

---

## 🚀 Tech Stack

- Language: TypeScript (Node.js)
- Framework: Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Token)
- File upload: Cloudinary
- Tools: Postman for API testing

---

## 📁 Folder Structure

- config/ # Application configurations (Cloudinary, JWT) 
- controllers/ # Handles incoming requests and calls corresponding services 
- db/ # Database connection and setup 
- dto/ # Data Transfer Objects - define structure for request/response data 
- interfaces/ # Interface/type definitions (for TypeScript projects) 
- middlewares/ # Middleware for authentication, authorization, error handling 
- models/ # Database schema definitions (e.g., User, Movie, Booking) 
- routes/ # Defines API endpoints and connects them to controllers 
- services/ # Business logic layer, interacts with models 
- utils/ # Utility functions (e.g., data formatting, token generation) 
- app.js # Entry point to initialize and run the server 
- .env # Environment variables (not committed to version control)

---

### 🧾 Folder Description

- **config/** – Stores all application-level configuration files such as Cloudinary, JWT, and environment setup.
- **controllers/** – Handle route logic by receiving requests and sending responses, calling the appropriate services.
- **services/** – Contains business logic for different features like booking, movie management, authentication, etc.
- **models/** – Define database models or schemas for collections/tables like Users, Movies, Showtimes, Bookings.
- **routes/** – Register and organize all API endpoints by resource (e.g., `/api/movies`, `/api/bookings`).
- **middlewares/** – Includes JWT verification, role-based access control, error handling, and validation middlewares.
- **dto/** – Define the structure and validation rules for incoming/outgoing request bodies.
- **interfaces/** – Type definitions used throughout the project (particularly useful for TypeScript).
- **utils/** – Helper functions used in different parts of the application (e.g., token generation, time formatting).
- **db/** – Handles database configuration and connection logic (e.g., connect to MongoDB or MySQL).
- **app.js** – Main server file that initializes Express, middleware, and routes.
- **.env** – Stores sensitive environment variables like database URLs, API keys, etc. (excluded from Git).

---

## 🔐 Environment Variables

Create a `.env` file in the root directory based on the `.env.example` file provided.

Example:

#connect mongodb
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/your-db

#port
PORT=your_port

#jwt
JWT_KEY=your_jwt_key

#email
EMAIL_USERNAME=your_email
EMAIL_PASSWORD=your_app_password

SECRET_KEY=your_secret_key

#Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

#MOMO
MOMO_PARTNER_CODE=MOMO
MOMO_ACCESS_KEY=F8BBA842ECF85
MOMO_SECRET_KEY=K951B6PE1waDMi640xX08PD3vg6EkVlz
MOMO_RETURN_URL=https://momo.vn/return
MOMO_NOTIFY_URL=https://callback.url/notify
MOMO_ENVIRONMENT=sandbox