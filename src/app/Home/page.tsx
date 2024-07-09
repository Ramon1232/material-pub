import Image from "next/image";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Navbar from "../components/Navbar";
import CarouselComponent from "../components/Carousel";
import ResponsiveCards from "../components/ResponsiveCards";
import Footer from "../components/Footer";


export default function Home() {
    return (
        <div>
            <Container maxWidth="xl" sx={{backgroundColor: 'none'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                backgroundColor: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '30%',
                                marginLeft: '200px',
                            }}
                        >
                            <Image src="/logo1.png" alt="Logo" width={180} height={180} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                backgroundColor: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'left',
                                fontSize: '25px',
                                fontFamily: 'gotham rounded bold',
                                width: '110%',
                                marginTop: '40px',
                                marginLeft: '-300px',
                                color:'#60595D'

                            }}
                        >
                            <h1>Padrón Único de Beneficiarios</h1>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Navbar/>
            <CarouselComponent />
            <ResponsiveCards />
            <Footer />
        </div>

    );
}

