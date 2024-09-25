// import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthFormData, FormType, AuthResponse } from '../../types/types';
// import { schema } from '../../utils/validation';
import toast from 'react-hot-toast';
import { useCookies } from 'react-cookie';

const SignIn = () => {
  const {
    control,
    handleSubmit,
    // formState: { errors, isValid },
  } = useForm<FormType>({
    // resolver: yupResolver<FormType>(schema),
    mode: 'all',
  });

  const navigate = useNavigate();
  const [, setCookie] = useCookies(['user']);

  const handleSignIn = async (data: AuthFormData) => {
    const { username, password } = data;

    if (username !== '' || password !== '') {
      try {
        const response = await fetch('http://127.0.0.1:8000/login/', {
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
        const token = user.token;
        if (response.ok) {
          toast.success('You have successfully logged in.');
          setCookie('user', token);
          navigate('/');
        } else {
          toast.error('Failed to sign in. Please try again.');
        }
      } catch (e) {
        console.error('Error during sign in:', e);
        toast.error('An error occurred during sign in. Please try again.');
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
          SIGN IN
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
                label="Username"
                autoComplete="username"
                // error={!!errors.username}
                // helperText={errors.username?.message}
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
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                // error={!!errors.password}
                // helperText={errors.password?.message}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            // disabled={!isValid}
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
            Sign In
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
            Don&apos;t have an account?{' '}
            <Link to="/signup" style={{ color: 'black' }}>
              Sign Up
            </Link>
          </p>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
