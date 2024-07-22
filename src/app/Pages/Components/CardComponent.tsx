import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

interface ActionAreaCardProps {
  imageUrl: string;
  title: string;
  description: string;
  href: string;
}

const ActionAreaCard: React.FC<ActionAreaCardProps> = ({ imageUrl, title, description, href }) => {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <Link href={href} passHref>
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt={title}
          style={{ objectFit: 'cover', maxWidth: '100%', maxHeight: '100%' }}
        />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h5" fontFamily="gothamrnd_bold" component="div">
          {title}
        </Typography>
        <Typography variant="body2" fontFamily="gothamrnd_bold" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ActionAreaCard;

