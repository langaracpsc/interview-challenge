import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <MuiPagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => onPageChange(page)}
            color="primary"
        />
    );
}

export default Pagination;
