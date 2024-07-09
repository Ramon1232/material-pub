
import React from 'react'
import Navbar from './components/Navbar'
import Contenido from './components/Contenido'
import Footer from './components/Footer'



const page = () => {
  return (
    <div>
      <Navbar/>
   
      <Contenido
        imageUrl="/DIF.png"
        altText="Description of the image"
        text="Padrón Único de Beneficiarios"
        text1="Sistema para Desarrollo Integral de la Familia"
        text2="Enlace Operativo"
        />
     
        <Footer/>
    </div>
  )
}

export default page

