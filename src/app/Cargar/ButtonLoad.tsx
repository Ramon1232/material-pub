'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload() {
  return (
    
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<UploadFileRoundedIcon />}
      sx={{ backgroundColor: 'red', color: 'black', fontFamily:'gotham rounded medium','&:hover': {
          backgroundColor: 'white',
          color: 'blue' },
        }}
    >
      Cargar Archivo
      <VisuallyHiddenInput type="file" />
    </Button>
  );
}