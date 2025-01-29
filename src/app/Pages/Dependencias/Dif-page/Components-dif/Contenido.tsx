'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface CenteredImageTextProps {
  imageUrl: string;
  altText: string;
  text: string;
  text1:string
  text2:string
}

const CenteredImageText: React.FC<CenteredImageTextProps> = ({ imageUrl, altText, text, text1, text2 }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 4,
        backgroundColor:'none',
        padding:9.4,
      }}
    >
      <Image src={imageUrl} alt={altText} width={400} height={400} />
      <Typography variant="h3" fontFamily="gothamrnd_bold" sx={{ marginTop: 2 }}>
        {text}
      </Typography>
      <Typography variant="h4" fontFamily="gothamrnd_bold" sx={{ marginTop: 2 }}>
        {text1}
      </Typography>
      <Typography variant="h5" fontFamily="gothamrnd_bold" sx={{ marginTop: 1 }}>
        {text2}
      </Typography>
    </Box>
  );
};

export default CenteredImageText;
