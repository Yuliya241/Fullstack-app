import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Cookies } from 'react-cookie';

const SignOutButton = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const cookieValue = cookies.get('user');

  const handleSignOut = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/logout/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${cookieValue}`,
        },
      });

      if (response.ok) {
        toast.success('You have successfully sign out.');
        cookies.remove('user', { path: '/' });
        navigate('/');
      } else {
        toast.error('Failed to sign out. Please try again.');
      }
    } catch (e) {
      console.error('Error during sign out:', e);
      toast.error('An error occurred during sign in. Please try again.');
    }
  };

  return (
    <Button
      variant="contained"
      sx={{
        transition: 'all 0.4s ease',
        backgroundColor: '#000000',
        color: '#ffffff',
        margin: '0 5px',
        '&:hover': {
          color: '#000000',
          backgroundColor: '#ffffff',
        },
      }}
      onClick={handleSignOut}
    >
      Sign Out
      <LogoutIcon sx={{ marginLeft: '5px' }} />
    </Button>
  );
};

export default SignOutButton;
