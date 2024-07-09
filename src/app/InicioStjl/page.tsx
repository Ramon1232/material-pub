
import React from 'react'
import Navbar from './components/Navbar'
import Contenido from './components/Contenido'
import Footer from './components/Footer'



const page = () => {
  return (
    <div>
      <Navbar/>
   
      <Contenido
        imageUrl="/STJL.png"
        altText="Description of the image"
        text="Padrón Único de Beneficiarios"
        text1="Secretaría del trabajo y Justicia Laboral"
        text2="Enlace Operativo"
        />
     
        <Footer/>
    </div>
  )
}

export default page

