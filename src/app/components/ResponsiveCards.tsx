'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface CardProps {
  title: string;
  description: string;
  image: string;
}

const HorizontalCard: React.FC<CardProps> = ({ title, description, image }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const ResponsiveCards: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 2 }}>
      <HorizontalCard
        title="Búsqueda por personas beneficiarias"
        description="agregar descripcion por parte de chuyito"
        image="busqueda.jpg"
      />
      <HorizontalCard
        title="Búsqueda por dependencias"
        description="agregar descripcion por parte de chuyito"
        image="busqueda2.jpg"
      />
      <HorizontalCard
        title="Búsqueda por programas"
        description="agregar descripcion por parte de chuyito"
        image="busqueda3.jpg"
      />
    </Box>
  );
};

export default ResponsiveCards;
