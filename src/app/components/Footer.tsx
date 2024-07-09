'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

const FooterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  backgroundColor:'#60595D',
  color:'white',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Box display="flex" alignItems="center">
        <Image src="/logo1.png" alt="Logo" width={60} height={60} />
        <Typography variant="h6" component="div" sx={{ ml: 2 }}>
          
        </Typography>
      </Box>
      <Typography variant="body2" component="div" sx={{ mt: { xs: 2, sm: 0 } }}>
      © Gobierno del Estado de Nayarit 2024
      </Typography>
    </FooterContainer>
  );
};

export default Footer;
