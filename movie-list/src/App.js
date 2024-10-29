/*


// this is default 

import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

*/


/*

// v1


import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);

  const addMovie = (movie) => {
    setMovies([...movies, { ...movie, id: movies.length + 1, status: 'unwatched', rating: 0 }]);
  };

  const updateMovie = (id, updatedMovie) => {
    setMovies(movies.map((movie) => (movie.id === id ? updatedMovie : movie)));
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Movie App By Yug 
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Movies
          </Button>
          <Button color="inherit" component={Link} to="/add">
            Add Movie
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<MovieList movies={movies} />} />
          <Route path="/movie/:id" element={<MovieDetails movies={movies} updateMovie={updateMovie} />} />
          <Route path="/add" element={<AddMovie addMovie={addMovie} />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;


*/


// v2
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([

    // this two are just for the test 
    {
      id: 1,
      title: 'Inception',
      year: 2010,
      genres: ['Action', 'Sci-Fi'],
      status: 'watched',
      rating: 5,
    },
    {
      id: 2,
      title: 'The Matrix',
      year: 1999,
      genres: ['Action', 'Sci-Fi'],
      status: 'unwatched',
      rating: 4,
    },
  ]);

  const addMovie = (newMovie) => {
    setMovies((prevMovies) => [
      ...prevMovies,
      { ...newMovie, id: prevMovies.length + 1 },
    ]);
  };

  const updateMovie = (id, updatedMovie) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) => (movie.id === id ? updatedMovie : movie))
    );
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Movie Tracker 
          </Typography>
          {/* <Typography variant="h6" sx={{ flexGrow: 1 }}>
            By Yug
          </Typography> */}
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/add" color="inherit">
            Add Movie
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<MovieList movies={movies} />} />
          <Route
            path="/movie/:id"
            element={<MovieDetails movies={movies} updateMovie={updateMovie} />}
          />
          <Route path="/add" element={<AddMovie addMovie={addMovie} />} />
        </Routes>
      </Container>

      <Box
        component="footer"
        sx={{
          padding: 2,
          textAlign: 'center',
          marginTop: 'auto',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="body2" color="textSecondary">
          © 2024 Movie Tracker App. All rights and trademarks held by Yug Patel.
        </Typography>
      </Box>
    </>
  );
}

export default App;
