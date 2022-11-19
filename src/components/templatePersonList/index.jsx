import React from 'react';
import Header from '../headerMovieList';
import Grid from '@mui/material/Grid';
import PersonCard from '../personCard';

function PeopleListPage({ people, title }) {
  return (
    <>
      <Grid container sx={{ padding: '20px' }}>
        <Grid item xs={12}>
          <Header title={title} />
        </Grid>
        <Grid item container spacing={2}>
          {people.map((p) => (
            <Grid key={p.id} item xs={6} sm={6} md={4} lg={3} xl={2}>
              <PersonCard key={p.id} person={p} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
export default PeopleListPage;
