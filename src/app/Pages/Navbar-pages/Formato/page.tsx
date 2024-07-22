import React from 'react'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import { Container, Grid, Typography } from '@mui/material'

const page = () => {
    return (
        <div>
            <Navbar />
            <Container sx={{ maxWidth: '80%', paddingTop: '2rem', paddingBottom: '2rem' }}>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        <Typography variant="h2" align="center" gutterBottom fontFamily={'gothamrnd_bold'}>
                            Formato del padrón unico de beneficiarios
                        </Typography>
                        <Typography variant="body1" align="justify" fontFamily={'gothamrnd_medium'}>
                            Descripcion por parte de chuyito
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    )
}

export default page