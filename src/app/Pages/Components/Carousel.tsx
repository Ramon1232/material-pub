import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Estilos del carrusel
import { Box } from '@mui/material';

interface CarouselProps {
  images: string[]; // Array de URLs de las imágenes
  maxWidth?: string | number; // Ancho máximo opcional para el contenedor del carrusel
}

const CarouselComponent: React.FC<CarouselProps> = ({ images, maxWidth = '100%' }) => {
  return (
    <Box maxWidth={maxWidth} mx="auto" mt={8}>
      <Carousel
        showArrows={true} // Mostrar flechas de navegación
        infiniteLoop={true} // Bucle infinito
        autoPlay={true} // Reproducción automática
        interval={5000} // Intervalo de cambio de imágenes (en milisegundos)
        stopOnHover={true} // Detener la reproducción automática al pasar el ratón
        showThumbs={false} // No mostrar miniaturas
        showStatus={false} // No mostrar el estado del carrusel (p. ej., "3 de 5")
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Image ${index + 1}`} style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        ))}
      </Carousel>
    </Box>
  );
};

export default CarouselComponent;
