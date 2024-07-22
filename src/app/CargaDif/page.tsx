// pages/index.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import FileUpload from './components/FileUpload';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home: React.FC = () => {
  return (
    <><><Navbar />
          <Container>
              <FileUpload />
          </Container></><Footer /></>
  );
};

export default Home;
