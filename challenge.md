# Movie Watchlist Application
**Time Frame:** 48 hours
**Tech Stack:** Choose your preferred:
- Frontend: React/Vue/Angular
- Backend: Node.js/Python/Java
- Database: Any database of your choice

## Project Overview
Create a web application that allows users to manage their movie watchlist.

## Core Requirements

### Frontend Requirements
1. **Movie List View**
   - Grid/list view of movies with pagination
   - Each movie displays:
     - Title
     - Release year
     - Status (watched/unwatched)
     - Rating (if watched)
     - Genre(s)
   - Basic filtering:
     - By genre
     - By watch status
     - By rating
   - Simple search by title

2. **Movie Details View**
   - Display movie information
   - Mark as watched/unwatched
   - Rate movie (1-5 stars)

3. **Add Movie Form**
   - Title (required)
   - Release Year (required)
   - Genre(s) (multiple selection)

4. **UI Requirements**
   - Responsive design
   - Loading states
   - Basic error handling
   - Form validation

### Backend Requirements
1. **API Endpoints**
   ```
   /api/v1/
   ├── /movies
   │   ├── GET / (list, pagination, filters)
   │   ├── GET /:id (details)
   │   ├── POST / (create)
   │   ├── PUT /:id (update)
   │   └── DELETE /:id (remove)
   └── /genres
       └── GET / (list all genres)
   ```

2. **Data Models**
   ```
   Movie {
     id: uuid
     title: string
     releaseYear: number
     genres: string[]
     watched: boolean
     rating: number (1-5)?
     createdAt: timestamp
     updatedAt: timestamp
   }

   Genre {
     id: uuid
     name: string
   }
   ```

## Optional Challenge: Movie Recommendations
Implement a recommendation system with the following features:

1. **Algorithm Requirements**
   - When viewing a movie, recommend similar movies based on:
     - Genre overlap
     - Rating patterns
     - Release year proximity
   - Add a new endpoint: `GET /api/v1/recommendations/:movieId`

2. **Performance Requirements**
   - Recommendations should return in under 200ms
   - Support for large datasets (10,000+ movies)
   - Implement appropriate caching

3. **Implementation Considerations**
   - Document your algorithm design
   - Explain performance optimizations
   - Consider memory vs. computation trade-offs

## Additional Optional Features
1. **Technical Enhancements**
   - Unit tests
   - Docker setup
   - API documentation
   - Performance monitoring
   - Advanced filtering and sorting
   - Infinite scroll
   - Authentication

2. **UI Enhancements**
   - Dark/light mode
   - Analytics dashboard
   - Bulk actions
   - Advanced search

## Evaluation Criteria
1. **Code Quality (40%)**
   - Clean, maintainable code
   - Modern best practices
   - Error handling
   - Code organization

2. **Functionality (30%)**
   - Feature completeness
   - Performance
   - Edge case handling

3. **Technical Decisions (20%)**
   - Architecture choices
   - Technology stack decisions
   - Code patterns
   - Data persistence strategy

4. **Documentation (10%)**
   - Clear README
   - Setup instructions

## Submission Requirements
1. **GitHub Repository**
   - Source code
   - Documentation (optional)
   - Tests (optional)
   - Sample data seed script

2. **README.md including:**
   - Setup instructions (different from the docs)
   - Technology choices and rationale (including database choice)

3. **Working Demo:**
   - Local setup instructions
   - Sample dataset

## Notes
- Focus on completing core requirements with high quality
- Choose technologies and persistence solutions that you're comfortable with
- Optional features and challenges should only be attempted after core features are solid
- Document your technical decisions and their rationale
- Handle errors gracefully
