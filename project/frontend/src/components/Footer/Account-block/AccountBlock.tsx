import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';

const AccountBlock = () => {
  return (
    <Stack sx={{ maxWidth: '18.25rem' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          minWidth: '15.06rem',
          borderRight: '1px solid #40af64',
          borderBottom: '2px solid #40af64',
        }}
      >
        <Box
          sx={{
            width: '2.5rem',
            height: '2.5rem',
            padding: '5px',
            backgroundColor: '#40af64',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <GroupIcon />
        </Box>
        <Typography
          sx={{
            fontSize: '1.5rem',
            fontWeight: 'lighter',
            padding: '0 0 0 10px',
            lineHeight: '2.5rem',
          }}
        >
          Мой аккаунт
        </Typography>
      </Box>
      <List sx={{ paddingBottom: 0 }}>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/profile">
            <ListItemText
              primary="Личный кабинет"
              sx={{ color: '#555', fontSize: '0.55rem' }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/basket">
            <ListItemText
              primary="Корзина"
              sx={{ color: '#555', fontSize: '0.875rem' }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/favorites">
            <ListItemText
              primary="Избранное"
              sx={{ color: '#555', fontSize: '0.875rem' }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  );
};

export default AccountBlock;
