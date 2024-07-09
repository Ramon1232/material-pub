import React from 'react';
import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';

const Header: React.FC = () => {
    return (
        <AppBar position="static" sx={{ height: '170px', backgroundColor: '#DACEC0' }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: '100%' }}>
                <Box display="flex" alignItems="center" >
                        <img
                            src="logo1.png"
                            alt="Logo"
                            style={{ maxWidth: 150, marginTop: 8 }}
                        />
                    </Box>
                    <Box display="flex" alignItems="center" sx={{ flexGrow: 1, justifyContent: 'center'}}>
                        <Typography variant="h2" component="div" sx={{ fontFamily: 'gotham rounded bold', color: '#60595D' }}>
                            Padrón Único de Beneficiarios
                        </Typography>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
