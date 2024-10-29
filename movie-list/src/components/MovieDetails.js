/* 

//v1

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, TextField, Container } from '@mui/material';

function MovieDetails({ movies, updateMovie }) {
    const { id } = useParams();
    const movie = movies.find((m) => m.id === parseInt(id));
    const navigate = useNavigate();

    const handleStatusChange = () => {
        const updatedMovie = { ...movie, status: movie.status === 'watched' ? 'unwatched' : 'watched' };
        updateMovie(movie.id, updatedMovie);
    };

    const handleRatingChange = (e) => {
        const updatedMovie = { ...movie, rating: parseInt(e.target.value) };
        updateMovie(movie.id, updatedMovie);
    };

    if (!movie) return <Typography>Movie not found!</Typography>;

    return (
        <Container>
            <Typography variant="h4">{movie.title}</Typography>
            <Typography>Year: {movie.year}</Typography>
            <Typography>Status: {movie.status}</Typography>
            <Button onClick={handleStatusChange}>
                Mark as {movie.status === 'watched' ? 'Unwatched' : 'Watched'}
            </Button>
            <TextField
                type="number"
                label="Rating"
                value={movie.rating}
                onChange={handleRatingChange}
                inputProps={{ min: 1, max: 5 }}
            />
            <Button onClick={() => navigate('/')}>Back to List</Button>
        </Container>
    );
}

export default MovieDetails;
*/ 

//v2 

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Stack, Chip, Rating, Box, Card, CardContent } from '@mui/material';
import { ArrowBack, Star } from '@mui/icons-material';

function MovieDetails({ movies, updateMovie }) {
    const { id } = useParams();
    const movie = movies.find((m) => m.id === parseInt(id));
    const navigate = useNavigate();

    if (!movie) {
        return (
            <Container sx={{ marginTop: 4, textAlign: 'center' }}>
                <Typography variant="h5" color="error">Movie not found!</Typography>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    sx={{ marginTop: 2 }}
                    onClick={() => navigate('/')}
                >
                    Back to List
                </Button>
            </Container>
        );
    }

    const handleStatusChange = () => {
        const updatedMovie = { ...movie, status: movie.status === 'watched' ? 'unwatched' : 'watched' };
        updateMovie(movie.id, updatedMovie);
    };

    const handleRatingChange = (event, newRating) => {
        const updatedMovie = { ...movie, rating: newRating };
        updateMovie(movie.id, updatedMovie);
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: 4 }}>
            <Card sx={{ boxShadow: 3, padding: 3, borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {movie.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Release Year: {movie.year}
                    </Typography>

                    <Stack direction="row" spacing={1} marginTop={2} flexWrap="wrap">
                        {movie.genres.map((genre, index) => (
                            <Chip key={index} label={genre} color="secondary" />
                        ))}
                    </Stack>

                    <Box marginTop={3}>
                        <Typography variant="h6">Status: {movie.status}</Typography>
                        <Button
                            variant="contained"
                            color={movie.status === 'watched' ? 'error' : 'success'}
                            sx={{ marginTop: 1 }}
                            onClick={handleStatusChange}
                        >
                            Mark as {movie.status === 'watched' ? 'Unwatched' : 'Watched'}
                        </Button>
                    </Box>

                    <Box marginTop={3}>
                        <Typography variant="h6" gutterBottom>
                            Rating:
                        </Typography>
                        <Rating
                            name="movie-rating"
                            value={movie.rating}
                            onChange={handleRatingChange}
                            icon={<Star fontSize="inherit" />}
                            emptyIcon={<Star fontSize="inherit" />}
                        />
                    </Box>

                    <Button
                        variant="outlined"
                        startIcon={<ArrowBack />}
                        sx={{ marginTop: 4 }}
                        onClick={() => navigate('/')}
                    >
                        Back to List
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
}

export default MovieDetails;
