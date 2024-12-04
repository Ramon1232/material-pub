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
                            Formato del padrón unico de beneficiarios
                        </Typography>
                        <Typography variant="h6" align="center" fontFamily={'gothamrnd_medium'} color={'GrayText'} >
                        De acuerdo con la Ley de Transparencia, el Padrón Único de Beneficiarios se presenta en el siguiente formato.
                            <br />
                            <br />
                            - Primer Apellido 
                            <br />
                            - Segundo Apellido
                            <br />
                            - Nombre
                            <br />
                            - Sexo
                            <br />
                            - CVE dependencia
                            <br />
                            - Institución
                            <br />
                            - Programa 
                            <br />
                            - Intra programa 
                            <br />
                            - Entidad federativa 
                            <br />
                            - Municipio 
                            <br />
                            - Localidad 
                            <br />
                            - Fecha de beneficio 
                            <br />
                            - Tipo de beneficiario 
                            <br />
                            - Tipo de beneficio 
                            <br />
                            - Cantidad de apoyo
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    )
}

export default Page;