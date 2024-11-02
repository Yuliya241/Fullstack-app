import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FormType } from '../../types/types';
import toast from 'react-hot-toast';
import { Cookies } from 'react-cookie';
import { AuthFormData, AuthResponse } from '../../interfaces/interfaces';
import { API, COOKIES } from '../../enums/enums';

const SignIn = () => {
  const {
    control,
    handleSubmit,
  } = useForm<FormType>({
    mode: 'all',
  });

  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleSignIn = async (data: AuthFormData) => {
    const { username, password } = data;

    if (username !== '' || password !== '') {
      try {
        const response = await fetch(API.LOGIN, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });

        const user: AuthResponse = await response.json();

        if (response.ok) {
          toast.success('Вы успешно вошли в учетную запись.');
          cookies.set(COOKIES.TOKEN, user.token);
          cookies.set(COOKIES.ID, user.user.id);
          navigate('/');
        } else {
          toast.error('Ошибка входа. Попробуйте снова.');
        }
      } catch (e) {
        console.error('Ошибка во время попытки входа:', e);
        toast.error('Ошибка во время попытки входа. Попробуйте снова.');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          ЛОГИН
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleSignIn)}
          sx={{ mt: 1 }}
        >
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Имя"
                autoComplete="username"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                label="Пароль"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              transition: 'all 0.4s ease',
              mb: 2,
              backgroundColor: 'black',
              color: 'white',
              '&:hover': {
                color: 'black',
                backgroundColor: 'white',
              },
            }}
          >
            Войти
          </Button>
          <p
            style={{
              fontSize: '15px',
              fontWeight: 400,
              textAlign: 'center',
              marginTop: '10px',
              color: 'rgba(0, 0, 0, 0.54)',
            }}
          >
            Нет учетной записи?{' '}
            <Link to="/signup" style={{ color: 'black' }}>
              Зарегистрироваться
            </Link>
          </p>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
