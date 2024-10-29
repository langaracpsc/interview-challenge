/* 

//v1 


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, CardActions, Button, TextField, Select, MenuItem } from '@mui/material';
import Pagination from './Pagination';

function MovieList({ movies }) {
    const [filter, setFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 4;

    const filteredMovies = movies
        .filter((movie) => movie.title.toLowerCase().includes(filter.toLowerCase()))
        .filter((movie) => (statusFilter ? movie.status === statusFilter : true));

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    return (
        <>
            <TextField
                label="Search by title"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setFilter(e.target.value)}
            />
            <Select
                value={statusFilter}
                displayEmpty
                fullWidth
                onChange={(e) => setStatusFilter(e.target.value)}
            >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="watched">Watched</MenuItem>
                <MenuItem value="unwatched">Unwatched</MenuItem>
            </Select>

            <Grid container spacing={3} marginTop={2}>
                {currentMovies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} key={movie.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{movie.title}</Typography>
                                <Typography>Year: {movie.year}</Typography>
                                <Typography>Status: {movie.status}</Typography>
                                <Typography>Rating: {movie.rating}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={Link} to={`/movie/${movie.id}`}>
                                    Details
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Pagination
                totalItems={filteredMovies.length}
                itemsPerPage={moviesPerPage}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </>
    );
}

export default MovieList;
*/


// v2 

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    TextField,
    Select,
    MenuItem,
    Chip,
    Stack,
} from '@mui/material';
import Pagination from './Pagination';

function MovieList({ movies }) {
    const [filter, setFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 4;

    const filteredMovies = movies
        .filter((movie) => movie.title.toLowerCase().includes(filter.toLowerCase()))
        .filter((movie) => (statusFilter ? movie.status === statusFilter : true));

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    return (
        <>
            <TextField
                label="Search by title"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setFilter(e.target.value)}
            />
            <Select
                value={statusFilter}
                displayEmpty
                fullWidth
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ marginBottom: 2 }}
            >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="watched">Watched</MenuItem>
                <MenuItem value="unwatched">Unwatched</MenuItem>
            </Select>

            <Grid container spacing={3} marginTop={2}>
                {currentMovies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} key={movie.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{movie.title}</Typography>
                                <Typography>Year: {movie.year}</Typography>
                                <Typography>Status: {movie.status}</Typography>
                                <Typography>Rating: {movie.rating}</Typography>

                                <Stack direction="row" spacing={1} marginTop={1} flexWrap="wrap">
                                    {movie.genres.map((genre, index) => (
                                        <Chip key={index} label={genre} color="secondary" />
                                    ))}
                                </Stack>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={Link} to={`/movie/${movie.id}`}>
                                    Details
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Pagination
                totalItems={filteredMovies.length}
                itemsPerPage={moviesPerPage}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </>
    );
}

export default MovieList;
