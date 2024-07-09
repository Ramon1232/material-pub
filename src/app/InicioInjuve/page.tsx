
import React from 'react'
import Navbar from './components/Navbar'
import Contenido from './components/Contenido'
import Footer from './components/Footer'



const page = () => {
  return (
    <div>
      <Navbar/>
   
      <Contenido
        imageUrl="/INJUVE.png"
        altText="Description of the image"
        text="Padrón Único de Beneficiarios"
        text1="Instituto Nayarita de la Juventud"
        text2="Enlace Operativo"
        />
     
        <Footer/>
    </div>
  )
}

export default page

