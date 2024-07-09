
import React from 'react'
import Navbar from './components/Navbar'
import Contenido from './components/Contenido'
import Footer from './components/Footer'
import { Container } from '@mui/material'


const page = () => {
  return (
    <div>
      <Navbar/>
   
      <Contenido
        imageUrl="/bienestar.png"
        altText="Description of the image"
        text="Padrón Único de Beneficiarios"
        text1="Secretaría de Bienestar e Igualdad Sustantiva"
        text2="Enlace Operativo"
        />
     
        <Footer/>
    </div>
  )
}

export default page

