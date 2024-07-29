'use client';
import React from 'react';
import { Container } from '@mui/material';
import Footer from '../../Components/Footer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; 
import SessionAuthProvider from '../../../context/SessionAuthProvider'; 
import Navbar from './Components-iprovinay/Navbar';
import Contenido from './Components-iprovinay/Contenido';

const Page = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   React.useEffect(() => {
//     if (!session) {
//       router.push('/Pages/Login');
//     }
//   }, [session, router]);

//   if (status === 'loading') {
//     return <p>Cargando...</p>;
//   }

  return (
    <SessionAuthProvider>
      <div>
        <Navbar />
        <Container maxWidth="md">
          <Contenido 
            imageUrl="/IPROVINAY.png"
            altText="Descripción de la imagen"
            text="Padrón Único de Beneficiarios"
            text1="Instituto Promotor de la Vivienda de Nayarit"
            text2="Enlace Operativo"
          />
        </Container>
        <Footer />
      </div>
    </SessionAuthProvider>
  );
}

export default Page;
