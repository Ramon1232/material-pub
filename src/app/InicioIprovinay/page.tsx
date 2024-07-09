
import React from 'react'
import Navbar from './components/Navbar'
import Contenido from './components/Contenido'
import Footer from './components/Footer'



const page = () => {
  return (
    <div>
      <Navbar/>
   
      <Contenido
        imageUrl="/IPROVINAY.png"
        altText="Description of the image"
        text="Padrón Único de Beneficiarios"
        text1="Instituto Promotor de la Vivienda de Nayarit"
        text2="Enlace Operativo"
        />
     
        <Footer/>
    </div>
  )
}

export default page

