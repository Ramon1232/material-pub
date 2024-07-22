'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false, callbackUrl: '/login' });
      router.push('/Pages/Login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#dacec0', height: '70px', borderRadius: '40px', marginTop: '30px', width: '90%', margin: 'auto' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Link href="/Pages/Home">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <img src="/pub.png" alt="Logo" style={{ height: '60px', marginLeft: '20px' }} />
            </IconButton>
          </Link>
        </Box>
        {isMobile ? (
          <div>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Inicio</MenuItem>
              <MenuItem onClick={handleClose}>Carga de Documentos</MenuItem>
              <MenuItem onClick={handleClose}>Vizualización de Documentos Cargados</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" width="100%" sx={{ display: 'flex', gap: 6 }}>
            <Link href="/Pages/Dependencias-pages/Sebien-page">
              <Button
                sx={{
                  textDecoration: 'none',
                  color: '#60595D',
                  transition: 'color 0.3s',
                  fontFamily: 'gothamrnd_bold',
                  fontSize: '18px',
                  '&:hover': { textDecoration: 'underline' }
                }}>
                <HomeOutlinedIcon sx={{ mr: 1 }} />
                Inicio
              </Button>
            </Link>
            <Link href="/Pages/Dependencias-pages/Sebien-page/Carga-sebien">
              <Button
                sx={{
                  textDecoration: 'none',
                  color: '#60595D',
                  transition: 'color 0.3s',
                  fontFamily: 'gothamrnd_bold',
                  fontSize: '18px',
                  '&:hover': { textDecoration: 'underline' }
                }}>
                Carga de Documentos
              </Button>
            </Link>
            <Link href="/Pages/Dependencias-pages/Sebien-page/View-sebien">
              <Button
                sx={{
                  textDecoration: 'none',
                  color: '#60595D',
                  transition: 'color 0.3s',
                  fontFamily: 'gothamrnd_bold',
                  fontSize: '18px',
                  '&:hover': { textDecoration: 'underline' }
                }}>
                Vizualización de Documentos Cargados
              </Button>
            </Link>
            <Button
              sx={{ textDecoration: 'none', color: '#60595D', transition: 'color 0.3s', fontFamily: 'gothamrnd_bold', fontSize: '18px', display: 'flex', alignItems: 'center' }}
              onClick={handleLogout}
            >
              <LogoutIcon sx={{ mr: 1 }} />
              Cerrar Sesión
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;