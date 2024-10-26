import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import toast from 'react-hot-toast';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { API } from '../../enums/enums';

export default function BasicModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('userToken');

  const handleSignOut = async () => {
    try {
      const response = await fetch(API.LOGOUT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        toast.success('Вы успешно вышли из учетной записи.');
        cookies.remove('userToken', { path: '/' });
        cookies.remove('userId', { path: '/' });
        // window.location.reload()
        navigate('/');
      } else {
        toast.error('Ошибка выхода. Попробуйте снова.');
      }
    } catch (e) {
      console.error('Ошибка выхода:', e);
      toast.error('Ошибка во время попытки выхода. Попробуйте снова.');
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          textAlign={'center'}
        >
          Вы уверены, что хотите выйти?
        </Typography>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', marginTop: '25px' }}
        >
          <Button
            variant="outlined"
            sx={{
              transition: 'all 0.4s ease',
              borderColor: '#000000',
              color: '#000000',
              margin: '0 5px',
              '&:hover': {
                color: '#ffffff',
                backgroundColor: '#000000',
              },
            }}
            onClick={handleClose}
          >
            Отмена
          </Button>
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
            Выход
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
