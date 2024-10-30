

## Movie Watchlist Application - README

### Table of Contents

1. [Project Overview](#project-overview)
2. [Core Features](#core-features)
3. [Technology Stack](#technology-stack)
4. [Setup Instructions](#setup-instructions)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
   - [Seeding the Database](#seeding-the-database)
5. [Working Demo](#working-demo)
6. [Sample Dataset](#sample-dataset)

---

### Project Overview

This is a full-stack web application that allows users to manage a movie watchlist. Users can add, update, search, and filter movies, mark movies as watched or unwatched, and rate them.

### Core Features

- **Movie List View**: Displays a list of movies with filters, search, and pagination.
- **Movie Details View**: Shows detailed information about each movie, allowing users to mark them as watched/unwatched and rate them.
- **Add Movie Form**: Users can add movies with a title, release year, and multiple genres.
- **Filters and Search**: Users can filter movies by genre, watch status, and rating, and perform a text search on movie titles.

---

### Technology Stack

#### Backend

- **Node.js** with **Express**: RESTful API for managing movies and genres.
- **MongoDB**: Flexible NoSQL database for scalability.
- **Mongoose**: MongoDB ODM for database interactions.
- **Express-Async-Handler**: For managing asynchronous routes.

#### Frontend

- **React**: Component-based architecture for UI.
- **TailwindCSS**: Utility-first CSS framework.
- **Axios**: For making HTTP requests.
- **React Router**: For handling routes.

#### Rationale for Technology Choices

- **Node.js + Express** is used for a lightweight, scalable backend.
- **MongoDB** is ideal for handling unstructured data like movie details and genres.
- **React** offers flexibility with a component-based structure for the frontend.

---

### Setup Instructions

#### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/movie-watchlist-backend.git
   cd movie-watchlist-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following values:

   ```
   MONGO_URI=<your-mongodb-connection-string>
   PORT=8000
   ```

4. **Run the MongoDB server:**
   If you're using MongoDB locally, make sure the MongoDB server is running:

   ```bash
   mongod
   ```

5. **Run the backend server:**

   ```bash
   npm run dev - development
   npm start - production
   ```

#### Frontend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/movie-watchlist-frontend.git
   cd movie-watchlist-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add:

   ```
   REACT_APP_API_URL=http://localhost:8000/api/v1
   ```

4. **Run the frontend app:**

   ```bash
   npm start
   ```

5. **Access the app:**
   Navigate to `http://localhost:3000` in your browser to view the app.

---

### Seeding the Database

Before starting the application for the first time, you need to populate the database with some sample genres and movies. You can do this using the seed script.

1. **Run the seed script:**

   After setting up the backend, run the following command in the `movie-watchlist-backend` directory:

   ```bash
   npm run seed
   ```

   This will populate the MongoDB database with a set of predefined genres and sample movies. You only need to run this command **once** unless you wish to reset the data.

---

### Working Demo

#### Local Setup Instructions

1. Ensure that **MongoDB** is running locally or provide a connection string to a hosted MongoDB instance (e.g., MongoDB Atlas).
2. Start the backend server first (`npm run dev` in `movie-watchlist-backend` directory).
3. Start the frontend server (`npm start` in `movie-watchlist-frontend` directory).
4. Open the frontend in your browser at `http://localhost:3000`.

#### API Endpoints

- `GET /api/v1/movies`: List movies with filters (e.g., genre, rating, watched status, search).
- `GET /api/v1/movies/:id`: Get details for a specific movie.
- `POST /api/v1/movies`: Add a new movie.
- `PATCH /api/v1/movies/:id`: Update movie details (mark as watched/unwatched, rate).
- `DELETE /api/v1/movies/:id`: Remove a movie.
- `GET /api/v1/genres`: List all available genres.

---

### Sample Dataset

The following data will be inserted into MongoDB when you run the seed script:

```json
[
  {
    "title": "Inception",
    "releaseYear": 2010,
    "genres": ["Action", "Sci-Fi"],
    "watched": true,
    "rating": 5
  },
  {
    "title": "The Godfather",
    "releaseYear": 1972,
    "genres": ["Drama", "Crime"],
    "watched": true,
    "rating": 5
  },
  {
    "title": "The Dark Knight",
    "releaseYear": 2008,
    "genres": ["Action", "Drama"],
    "watched": true,
    "rating": 4
  },
  {
    "title": "Pulp Fiction",
    "releaseYear": 1994,
    "genres": ["Crime", "Drama"],
    "watched": false,
    "rating": null
  },
  {
    "title": "Interstellar",
    "releaseYear": 2014,
    "genres": ["Adventure", "Drama", "Sci-Fi"],
    "watched": true,
    "rating": 5
  }
]
```

You can import this sample data into MongoDB manually or allow the seed script to handle it.

---

### Conclusion

This README provides a complete guide to setting up both the backend and frontend, running the seed script, and understanding the core features and technology stack used in this movie watchlist application.

---
