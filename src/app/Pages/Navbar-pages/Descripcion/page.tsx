import React from 'react'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import { Container, Grid, Typography } from '@mui/material'

const Page = () => {
    return (
        <div>
            <Navbar />
            <Container sx={{ maxWidth: '80%', paddingTop: '2rem', paddingBottom: '2rem' }}>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        <Typography variant="h3" align="center" gutterBottom fontFamily={'gothamrnd_bold'} color={'#DACEC0'}>
                            Descripción
                        </Typography>
                        <Typography variant="h6" align="justify" fontFamily={'gothamrnd_medium'} color={'GrayText'}>
                            De acuerdo al artículo 23 del reglamento de la ley para el desarrollo social del estado de Nayarit
                            El Padrón Único de Personas Beneficiarias de programas sociales es un instrumento de naturaleza pública
                            de política social, en el que, de manera oficial, se constituirán listados de cada uno de los programas
                            de desarrollo social que se ejecuten en  la entidad, en los que se registrarán las personas beneficiarias
                            de los programas de desarrollo social, los apoyos que reciben y su información sociodemográfica que
                            se requiera para la correcta operación de los programas, las evaluaciones de impacto de los mismos
                            y la planeación para el desarrollo social.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    )
}

export default Page;