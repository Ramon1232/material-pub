'use client';
import React from 'react';
import { Container } from '@mui/material';
import Footer from '../../Components/Footer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; 
import SessionAuthProvider from '../../../context/SessionAuthProvider'; 
import Navbar from './Components-dif/Navbar';
import Contenido from './Components-dif/Contenido';

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
            imageUrl="/DIF.png"
            altText="Descripción de la imagen"
            text="Padrón Único de Beneficiarios"
            text1="Sistema Para el Desarrollo Integral de la Familia"
            text2="Enlace Operativo"
          />
        </Container>
        <Footer />
      </div>
    </SessionAuthProvider>
  );
}

export default Page;
