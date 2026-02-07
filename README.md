# MERN Stack Movie Application

This is a full-stack movie management web application developed using the MERN stack.  
The project allows users to browse movies and administrators to manage movie records through a secure login system.

This project has been developed as part of a MERN Stack academic assignment.

---

## Project Description

The main objective of this project is to design and implement a complete web application using modern web technologies.

The system provides two main roles:

1. Users, who can view and explore movie information.
2. Administrators, who can manage the movie database.

The application follows a client-server architecture where the frontend communicates with the backend using REST APIs.

---

## Features

### User Features

- View movies with pagination
- Search movies by name and description
- Sort movies by rating, name, release date, and duration
- Responsive user interface
- View detailed information for each movie

### Admin Features

- Secure login using JWT authentication
- Add new movies
- Update existing movie information
- Delete movies
- Automatic poster fetching from OMDB API
- View complete movie statistics on dashboard

---

## Technologies Used

### Frontend
- React.js
- Material-UI
- React Router
- Axios
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- OMDB API

### Tools
- Visual Studio Code
- Postman
- Git
- GitHub

---

## Project Structure
mern-movie-app/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ ├── src/
│ ├── components/
│ └── pages/
│
└── README.md



## Installation and Setup

Follow the steps below to run the project locally.

### Step 1: Clone Repository

```bash
git clone https://github.com/your-username/mern-movie-app.git
cd mern-movie-app
