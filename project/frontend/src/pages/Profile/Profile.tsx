import { Container, Typography, Paper, Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { AuthResponse } from '../../interfaces/interfaces';
import { useGetProfileQuery } from '../../store/api/BooksApi';

const Profile = () => {
  const [user, setUser] = useState<AuthResponse | undefined>();
  const [userName, setUserName] = useState(user?.user.username || '');
  const [email, setEmail] = useState(user?.user.email || '');

  const { data } = useGetProfileQuery();

  useEffect(() => {
    if (data) {
      setUser(data);
      setUserName(data?.user.username);
      setEmail(data?.user.email);
    }
  }, [data]);

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
