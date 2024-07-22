import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

const Page = () => {
    return (
        <div>
            <Navbar />
            <Container sx={{ maxWidth: '80%', paddingTop: '2rem', paddingBottom: '2rem' }}>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        <Typography variant="h2" align="center" gutterBottom fontFamily={'gothamrnd_bold'}>
                            Qué es la Normativa
                        </Typography>
                        <Typography variant="body1" align="justify" fontFamily={'gothamrnd_medium'}>
                            La normativa se refiere a un conjunto de reglas, leyes, disposiciones o regulaciones
                            establecidas por una autoridad competente para regular determinadas actividades,
                            comportamientos o prácticas dentro de una sociedad o institución. Su propósito principal
                            es asegurar el orden, la seguridad, la equidad y el cumplimiento de estándares
                            específicos en diversas áreas como el derecho, la administración pública, la economía,
                            entre otras.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    );
};

export default Page;
