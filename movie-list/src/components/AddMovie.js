/*
v1


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddMovie({ addMovie }) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [genres, setGenres] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && year) {
            addMovie({ title, year, genres: genres.split(', ') });
            navigate('/');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Genres (comma separated)"
                value={genres}
                onChange={(e) => setGenres(e.target.value)}
            />
            <button type="submit">Add Movie</button>
        </form>
    );
}

export default AddMovie;

*/



//v2
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Chip,
    InputAdornment,
    Alert,
    Fade,
    Stack,
} from '@mui/material';
import { Movie, CalendarToday, Category } from '@mui/icons-material';

function AddMovie({ addMovie }) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [genres, setGenres] = useState('');
    const [error, setError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !year) {
            setError(true);
            return;
        }
        const genreArray = genres.split(',').map((g) => g.trim()).filter((g) => g);
        addMovie({ title, year, genres: genreArray, status: 'unwatched', rating: 0 });

        setShowSuccess(true);
        setTimeout(() => {
            navigate('/');
        }, 1000);
    };

    return (
        <Fade in={true} timeout={800}>
            <Container maxWidth="sm" sx={{ marginTop: 4 }}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        backgroundColor: 'white',
                    }}
                >
                    <Typography variant="h4" textAlign="center" gutterBottom>
                        Add New Movie
                    </Typography>

                    {error && (
                        <Alert severity="error" onClose={() => setError(false)}>
                            Title and Year are required!
                        </Alert>
                    )}

                    <TextField
                        label="Movie Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Movie />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        type="number"
                        label="Release Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                        inputProps={{ min: 1900, max: new Date().getFullYear() }}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarToday />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="Genres (comma separated)"
                        value={genres}
                        onChange={(e) => setGenres(e.target.value)}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Category />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {genres &&
                            genres.split(',').map((genre, index) => (
                                <Chip key={index} label={genre.trim()} color="primary" />
                            ))}
                    </Stack>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        Add Movie
                    </Button>

                    {showSuccess && (
                        <Fade in={showSuccess} timeout={500}>
                            <Alert severity="success" sx={{ marginTop: 2 }}>
                                Movie added successfully! Redirecting...
                            </Alert>
                        </Fade>
                    )}
                </Box>
            </Container>
        </Fade>
    );
}

export default AddMovie;
