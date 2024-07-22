'use client';
import React from 'react';
import { Container } from '@mui/material';
import Navbar from './Components/Navbar';
import Contenido from './Components/Contenido';
import Footer from '../../Components/Footer';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'; 
import SessionAuthProvider from '../../../context/SessionAuthProvider'; 

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (!session) {
      router.push('/Pages/Login');
    }
  }, [session, router]);

  if (status === 'loading') {
    return <p>Cargando...</p>;
  }

  return (
    <SessionAuthProvider>
      <div>
        <Navbar />
        <Container maxWidth="md">
          <Contenido 
            imageUrl="/bienestar.png"
            altText="Descripción de la imagen"
            text="Padrón Único de Beneficiarios"
            text1="Secretaría de Bienestar e Igualdad Sustantiva"
            text2="Enlace Operativo"
          />
        </Container>
        <Footer />
      </div>
    </SessionAuthProvider>
  );
}

export default Page;


