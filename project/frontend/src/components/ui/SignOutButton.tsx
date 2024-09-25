import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import BasicModal from '../Modal-dialog/Modal-dialog';

const SignOutButton = () => {
  const [open, setOpen] = useState(false);

  const handleCloseModal = () => setOpen(false);

  const handleSignOut = async () => {
    setOpen(true);
  };

  return (
    <>
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
      <BasicModal open={open} handleClose={handleCloseModal} />
    </>
  );
};

export default SignOutButton;
