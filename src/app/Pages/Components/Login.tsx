'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getSession, signIn } from 'next-auth/react';

const loginSchema = z.object({
  email: z.string().email('Dirección de correo electrónico inválida').nonempty('Campo requerido'),
  password: z.string().nonempty('Se requiere una contrseña'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    setApiError(null);
    try {
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      const session = await getSession();
      const dependencia = session?.user?.dependencia;
      const role = session?.user.role;

      console.log('este es el rol jaja --->', role)

      if (response?.error) {
        setApiError(response.error);
      } else {
        if (role === 'operativo') {
          switch (dependencia) {
            case 'sebien':
              router.push('/Pages/Dependencias-pages/Sebien-page');
              break;
            case 'injuve':
              router.push('/Pages/Dependencias-pages/Injuve-page');
              break;
            case 'dif':
              router.push('/Pages/Dependencias-pages/Dif-page');
              break;
            case 'iprovinay':
              router.push('/Pages/Dependencias-pages/Iprovinay-page');
              break;
            case 'stjl':
              router.push('/Pages/Dependencias-pages/Stjl-page');
              break;
            case 'cecan':
              router.push('/Pages/Dependencias-pages/Cecan-page');
              break;
            default:
              router.push('/Pages/Home');
              break;
          }
        } else {
          if(role !== 'operativo'){
            switch (dependencia) {
              case 'sebien':
                router.push('/Pages/Home');
                break;
              case 'injuve':
                router.push('/Pages/Home');
                break;
              case 'dif':
                router.push('/Pages/Home');
                break;
              case 'iprovinay':
                router.push('/Pages/Home');
                break;
              case 'stjl':
                router.push('/Pages/Home');
                break;
              case 'cecan':
                router.push('/Pages/Home');
                break;
              default:
                router.push('/Pages/Home');
                break;
            }
          }
        }
      }
    } catch (error: any) {
      setApiError(error.message);
    }
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
        mt={5}
        sx={{
          border: '1px solid #60595D',
          backgroundImage: 'url(/fondogral.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Typography variant="h3" component="h1" align="center" gutterBottom color="#60595D" sx={{ mt: 8, mb: 4, fontFamily: 'gothamrnd_bold' }}>
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
                mb: 2,
                bgcolor: 'white',
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#79142A',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#60595D',
                  },
                },
                '& .Mui-focused .MuiInputLabel-outlined': {
                  color: '#60595D',
                },
                '& .MuiInputLabel-outlined': {
                  color: '#60595D',
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
                mb: 5,
                bgcolor: 'white',
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#79142A',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#60595D',
                  },
                  '& .Mui-focused .MuiInputLabel-outlined': {
                    color: '#60595D',
                  },
                },
                '& .MuiInputLabel-outlined': {
                  color: '#60595D',
                },
                fontFamily: 'gothamrnd_bold',
              }}
              error={Boolean(errors.password)}
              helperText={errors.password ? errors.password.message : ''}
            />
          )}
        />
        {apiError && (
          <Typography variant="body1" color="error" align="center" mb={2}>
            {apiError}
          </Typography>
        )}
        <Button variant="contained" fullWidth type="submit" sx={{
          mt: 2,
          backgroundColor: '#C5B099',
          color: '#fff',
          fontFamily: 'gothamrnd_bold',
          fontSize: '18px',
          '&:hover': {
            backgroundColor: '#CDB19C',
            color: '#60595D',
            transform: 'scale(1.05)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
          },
        }}>
          Entrar
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;

