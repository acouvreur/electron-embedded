import React from 'react';
import Content from './Content'
import { Typography, Link, Container, Box } from '@material-ui/core';
import Heroes from './Heroes';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.alexiscouvreur.com/">
        Alexis Couvreur
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}  Version {process.env.REACT_APP_VERSION}
    </Typography>
  );
}

function App() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App v4-beta example
        </Typography>
        <Content />
        <Heroes />
        <Copyright />
      </Box>
    </Container>
  );
}

export default App;
