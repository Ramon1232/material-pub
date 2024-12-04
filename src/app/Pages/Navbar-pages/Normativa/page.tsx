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
                        <Typography variant="h3" align="center" gutterBottom fontFamily={'gothamrnd_bold'} color={'#DACEC0'}>
                            ¿Qué es la Normativa?
                        </Typography>
                        <Typography variant="h6" align="justify" fontFamily={'gothamrnd_medium'} color={'GrayText'}>
                            
                            El padrón único de personas beneficiarias (PUB) tiene su fundamento legal en los artículos 60, 61,62,63 y 64 de la ley para el desarrollo social del estado de Nayarit, además en los artículos 23,24,25,26,27,28 y 29 del REGLAMENTO DE LA LEY PARA EL DESARROLLO SOCIAL DEL ESTADO DE NAYARIT. 
                            <br />
                            <br />
                            Creado con el propósito de asegurar la transparencia, la equidad y la eficacia de los programas sociales, en el cual se llevará a cabo la integración y actualización del Padrón Único de Personas Beneficiarias de los Programas Sociales estando a disposición de la ciudadanía en los términos de la Ley de Transparencia y Acceso a la Información Pública del Estado de Nayarit. 
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    );
};

export default Page;
