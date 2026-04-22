import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import NotesTable from './components/NotesTable';
import PaginationPlaceholder from './components/PaginationPlaceholder';
import { fetchNotes } from './api';

function App() {
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchNotes(page, limit)
      .then(({ data, total }) => {
        setNotes(data);
        setTotal(total);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [page, limit]);

  const totalPages = Math.max(Math.ceil(total / limit), 1);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        QuickNotes Pro
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="subtitle1">
              Page {page} of {totalPages} · {total} note{total === 1 ? '' : 's'} total
            </Typography>
          </Box>

          <NotesTable notes={notes} />

          <Box sx={{ mt: 3 }}>
            <PaginationPlaceholder
              page={page}
              totalPages={totalPages}
              limit={limit}
              onPageChange={handlePageChange}
              onLimitChange={handleLimitChange}
            />
          </Box>
        </>
      )}

      <Divider sx={{ my: 4 }} />
    </Container>
  );
}

export default App;
