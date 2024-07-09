
import React from 'react';
import { Carousel } from 'antd';

const App: React.FC = () => {
  const contentStyle: React.CSSProperties = {
    height: '400px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <Carousel autoplay>
        <div>
          <img src="findo.jpeg" style={imageStyle} alt="Imagen 1" />
        </div>
        <div>
          <img src="findo2.jpeg" style={imageStyle} alt="Imagen 2" />
        </div>
        <div>
          <img src="findo3.jpeg" style={imageStyle} alt="Imagen 3" />
        </div>
      </Carousel>
    </div>
  );
};

export default App;
