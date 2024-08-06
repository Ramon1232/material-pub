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
                        <Typography variant="h6" align="justify" fontFamily={'gothamrnd_medium'} color={'GrayText'}>

                        </Typography>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    )
}

export default Page;