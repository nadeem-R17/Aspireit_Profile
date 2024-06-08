# User Management API

This project is a user management API built using Node.js, Express, MongoDB, and JWT for authentication. It allows users to sign up, log in, update their profiles, and retrieve profile details. The project includes file upload functionality for user profile photos.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [File Structure](#file-structure)
- [License](#license)

## Features

- User authentication with JWT
- User registration and login
- Profile photo upload and retrieval
- Profile update
- Secure password hashing with bcrypt

## Installation

1. Clone the repository:

```bash
   git clone https://github.com/yourusername/user-management-api.git
   cd user-management-api
```
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (see Environment Variables).

4. Start the server:
```bash
npm start
```

## Usage
Once the server is running, you can interact with the API using tools like Postman or curl. Make sure to include the required headers and JSON body for each request.

## Environment Variables
Create a .env file in the root directory of the project and add the following environment variables:
```bash
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

# API Endpoints

## User Registration

- **URL:** `/signup`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Body Parameters:**
    - `firstname`: User's first name (string, required)
    - `lastname`: User's last name (string, required)
    - `username`: User's username (string, required)
    - `password`: User's password (string, required)
    - `profilePhoto`: User's profile photo (file, required)

## User Login

- **URL:** `/login`
- **Method:** `POST`
- **Description:** Logs in a user.
- **Body Parameters:**
    - `username`: User's username (string, required)
    - `password`: User's password (string, required)

## Get Profile

- **URL:** `/profile`
- **Method:** `GET`
- **Description:** Retrieves the logged-in user's profile details.
- **Headers:**
    - `Authorization`: Bearer token (required)

## Update Profile

- **URL:** `/profile`
- **Method:** `PUT`
- **Description:** Updates the logged-in user's profile details.
- **Headers:**
    - `Authorization`: Bearer token (required)
- **Body Parameters:**
    - `firstname`: User's first name (string, optional)
    - `lastname`: User's last name (string, optional)
    - `profilePhoto`: User's profile photo (file, optional)

# File Structure

```
user-management-api/
│
├── .env                 # Environment variables
├── index.js             # Entry point of the application
├── auth.js              # JWT authentication middleware
├── multerConfig.js      # Multer configuration for file uploads
├── userModel.js         # Mongoose user model
├── userRoute.js         # User routes
└── package.json         # Project dependencies and scripts

```

