'use client';
import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Esquema de validación utilizando Zod
const loginSchema = z.object({
    email: z.string().email('Invalid email address').nonempty('Required'),
    password: z.string().min(6, 'Password must be at least 6 characters').nonempty('Required'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormInputs) => {
        console.log(data);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bgcolor="none"
            height="600px"
            sx={{
                padding: 2,
            }}
            

        >
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                display="flex"
                flexDirection="column"
                alignItems="center"
                p={4}
                bgcolor="none"
                boxShadow={4}
                borderRadius={3}
                width="100%"
                maxWidth={500}
                height={500}
                sx={{
                    border: '1px solid #60595D', // Color del borde del Box
                    backgroundImage: 'url(findo1.jpeg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}

            >
                <Typography variant="h3" component="h1" align="center" gutterBottom fontFamily="gotham rounded bold" color="#60595D" sx={{mt: 8,mb:4,}}>
                    Inicio de sesión
                </Typography>

                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            id="email"
                            label="Correo electrónico"
                            variant="outlined"
                            margin="normal"
                            sx={{
                                mb:2,
                                bgcolor: 'white', '& .MuiOutlinedInput-root': {

                                    '&:hover fieldset': {
                                        borderColor: '#79142A', // Color del borde al pasar el cursor
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#60595D', // Color del borde cuando está enfocado
                                    },
                                },
                                '& .Mui-focused .MuiInputLabel-outlined': {
                                    color: '60595D', // Color del texto del borde cuando está enfocado
                                },
                                '& .MuiInputLabel-outlined': {
                                    color: '#60595D', // Color del texto del borde cuando no está enfocado
                                },

                            }}
                            error={Boolean(errors.email)}
                            helperText={errors.email ? errors.email.message : ''}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            id="password"
                            label="Contraseña"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            sx={{
                                mb:5,
                                bgcolor: 'white', '& .MuiOutlinedInput-root': {

                                    '&:hover fieldset': {
                                        borderColor: '#79142A', // Color del borde al pasar el cursor
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#60595D', // Color del borde cuando está enfocado
                                    },
                                    '& .Mui-focused .MuiInputLabel-outlined': {
                                        color: '60595D', // Color del texto del borde cuando está enfocado
                                    },
                                },
                                '& .MuiInputLabel-outlined': {
                                    color: '#60595D', // Color del texto del borde cuando no está enfocado
                                },

                            }}
                            error={Boolean(errors.password)}
                            helperText={errors.password ? errors.password.message : ''}
                        />
                    )}
                />
                <Button variant="contained" fullWidth type="submit" sx={{
                    mt: 2,
                    backgroundColor: '#C5B099',
                    color: '#fff',
                    fontFamily: 'gotham rounded bold',
                    fontSize: '18px',
                    '&:hover': {
                        backgroundColor: '#CDB19C', // Cambia el color de fondo al pasar el cursor
                        color: '#60595D', // Cambia el color del texto al pasar el cursor
                        transform: 'scale(1.05)', // Aumenta el tamaño del botón
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // Añade una sombra al botón
                        cursor: 'pointer', // Cambia el cursor
                    },
                }}>
                    entrar
                </Button>

            </Box>
        </Box>
    );
};

export default LoginForm;
