'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Grid, Typography } from '@mui/material';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import Link from 'next/link';

const Navbar: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    function HomeIcon(props: SvgIconProps) {
        return (
            <SvgIcon {...props}>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>
        );
    }

    return (
        <div>
            <Grid container spacing={2} alignItems="center" mt={2} mb={2} justifyContent="center"  >
                <Grid item xs={12} sm={3} textAlign={isMobile ? 'center' : 'end'}>
                    <Box sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'end' }}>
                        <img src="/logo1.png" alt="Logo" style={{ height: '150px' }} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', height: '100%' }}>
                        <Typography variant="h3" sx={{ fontFamily: 'gothamrnd_bold', color: '#79142A', textAlign: 'center' }}>
                            Padrón Único de Personas Beneficiarias
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <AppBar position="static" sx={{ bgcolor: '#dacec0', height: '70px', borderRadius: '40px', width: '90%', margin: 'auto' }}>
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <Link href={'/Pages/Home'}>
                            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                <img src="/logoPub.png" alt="Logo" style={{ height: '60px', marginLeft: '20px' }} />
                            </IconButton>
                        </Link>
                    </Box>
                    {isMobile ? (
                        <>
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor="right"
                                open={drawerOpen}
                                onClose={handleDrawerClose}
                                sx={{ '& .MuiDrawer-paper': { width: '250px' } }}
                            >
                                <Box
                                    sx={{ width: '250px', bgcolor: '#dacec0', height: '100%' }}
                                    role="presentation"
                                    onClick={handleDrawerClose}
                                    onKeyDown={handleDrawerClose}
                                >
                                    <Typography color="#60595D" sx={{ mt: 8, mb: 4, fontFamily: 'gothamrnd_medium' }}>
                                        <Link href={'/Pages/Home'}>
                                            <MenuItem onClick={handleDrawerClose}>Inicio</MenuItem>
                                        </Link>
                                        <MenuItem onClick={handleDrawerClose}>Normativa</MenuItem>
                                        <MenuItem onClick={handleDrawerClose}>Descripción del padrón</MenuItem>
                                        <MenuItem onClick={handleDrawerClose}>¿Quiénes participan?</MenuItem>
                                        <MenuItem onClick={handleDrawerClose}>Formato del padrón único</MenuItem>
                                    </Typography>
                                </Box>
                            </Drawer>
                        </>
                    ) : (
                        <Box display="flex" justifyContent="center" alignItems="center" width="100%">
                            <Link href={'/Pages/Home'}>
                                <Button sx={buttonStyles}>
                                    <HomeIcon fontSize="large" />
                                </Button>
                            </Link>
                            <Link href={'/Pages/Navbar-pages/Normativa'}>
                                <Button sx={buttonStyles}>Normativa</Button>
                            </Link>
                            <Link href={'/Pages/Navbar-pages/Descripcion'}>
                                <Button sx={buttonStyles}>Descripción del padrón</Button>
                            </Link>
                            <Link href={'/Pages/Navbar-pages/Participantes'}>
                                <Button sx={buttonStyles}>¿Quiénes participan?</Button>
                            </Link>
                            <Link href={'/Pages/Navbar-pages/Formato'}>
                                <Button sx={buttonStyles}>Formato del padrón único</Button>
                            </Link>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

const buttonStyles = {
    textDecoration: 'none',
    color: '#60595D',
    transition: 'color 0.3s',
    fontFamily: 'gothamrnd_bold',
    fontSize: '15px',
    '&:hover': { textDecoration: 'underline' },
};

export default Navbar;
