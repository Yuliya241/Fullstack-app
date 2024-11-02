import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FormType } from '../../types/types';
import toast from 'react-hot-toast';
import { Cookies } from 'react-cookie';
import { API, COOKIES } from '../../enums/enums';
import { AuthFormData, AuthResponse } from '../../interfaces/interfaces';

export default function SignUp() {
  const { control, handleSubmit } = useForm<FormType>({
    mode: 'all',
  });

  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleSignUp = async (data: AuthFormData) => {
    const { username, email, password, confirm_password } = data;

    if (
      username !== '' ||
      password !== '' ||
      email !== '' ||
      confirm_password !== ''
    ) {
      try {
        const response = await fetch(API.REGISTER, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            confirm_password: confirm_password,
          }),
        });

        const user: AuthResponse = await response.json();

        if (response.ok) {
          toast.success('Учетная запись успешно создана.');
          cookies.set(COOKIES.TOKEN, user.token);
          cookies.set(COOKIES.ID, user.user.id);
          navigate('/');
        } else {
          toast.error('Ошибка регистрации. Попробуйте снова.');
        }
      } catch (e) {
        console.error('Ошибка во время регистрации:', e);
        toast.error(
          'Ошибка во время попытки зарегистрироваться. Попробуйте снова.'
        );
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
          РЕГИСТРАЦИЯ
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleSignUp)}
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
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Электронная почта"
                autoComplete="email"
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
          <Controller
            name="confirm_password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                label="Повторить пароль"
                type="password"
                id="confirmPassword"
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
            Зарегистрироваться
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
            Уже зарегистрированы?
            <Link to="/signin" style={{ color: 'black' }}>
              Войти
            </Link>
          </p>
        </Box>
      </Box>
    </Container>
  );
}
