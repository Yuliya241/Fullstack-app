import { Container, Typography, Paper, Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { AuthResponse } from '../../interfaces/interfaces';

const Profile = () => {
  const [user, setUser] = useState<AuthResponse | undefined>();
  const [userName, setUserName] = useState(user?.user.username || '');
  const [email, setEmail] = useState(user?.user.email || '');

  useEffect(() => {
    const getProfile = async () => {
      const cookies = new Cookies();
      const cookieValue = cookies.get('user');
      try {
        const response = await fetch('http://127.0.0.1:8000/api/profile/', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Token ${cookieValue}`,
          },
        });

        const user: AuthResponse = await response.json();
        if (response.ok) {
          setUser(user);
          setUserName(user?.user.username);
          setEmail(user?.user.email);
          return user;
        } else {
          return null;
        }
      } catch (e) {
        console.error('Error during getting user:', e);
      }
    };
    getProfile();
  }, []);

  return (
    <Container maxWidth="xs">
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
          padding: 5,
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ marginBottom: 2, color: '#70d270' }}
        >
          PROFILE
        </Typography>
        <Box
          component="form"
          sx={{ width: '300px' }}
          noValidate
          autoComplete="off"
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <Typography>Username</Typography>
            <TextField
              id="userName"
              value={userName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUserName(event.target.value);
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <Typography>Email</Typography>
            <TextField
              id="email"
              value={email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value);
              }}
            />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
