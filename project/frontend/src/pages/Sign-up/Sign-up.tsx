// import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthFormData, FormType, AuthResponse } from '../../types/types';
// import { schema } from '../../utils/validation';
import toast from 'react-hot-toast';

export default function SignUp() {
  const {
    control,
    handleSubmit,
    // formState: { isValid },
  } = useForm<FormType>({
    // resolver: yupResolver<FormType>(schema),
    mode: 'all',
  });

  const navigate = useNavigate();

  const handleSignIn = async (data: AuthFormData) => {
    const { username, email, password, confirm_password } = data;

    if (
      username !== '' ||
      password !== '' ||
      email !== '' ||
      confirm_password !== ''
    ) {
      try {
        const response = await fetch('http://127.0.0.1:8000/register/', {
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
        const token = user.token;
        if (response.ok) {
          toast.success('User is created successfully.');
          localStorage.setItem('user', token);
          navigate('/');
        } else {
          toast.error('Failed to sign up. Please try again.');
        }
      } catch (e) {
        console.error('Error during sign up:', e);
        toast.error('An error occurred during sign up. Please try again.');
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
          SIGN UP
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
                label="Email"
                autoComplete="email"
                // error={!!errors.email}
                // helperText={errors.email ? <>{t(errors.email.message)}</> : null}
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
                label="Confirm password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                // error={!!errors.confirmPassword}
                // helperText={errors.confirmPassword ? <>{t(errors.confirmPassword.message)}</> : null}
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
            Sign Up
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
            Already have an account?
            <Link to="/signin" style={{ color: 'black' }}>
              Sign In
            </Link>
          </p>
        </Box>
      </Box>
    </Container>
  );
}
