import {
  useScrollTrigger,
  AppBar,
  Toolbar,
  Box,
  Typography,
  Link,
} from '@mui/material';
import BaseButton from '../ui/Button';
import SignOutButton from '../ui/SignOutButton';
import { CookiesProvider, useCookies } from 'react-cookie';

const Header = () => {
  const [cookies] = useCookies(['user']);
  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true,
  });

  const opacify = (hex: string) => hex + 25;
  const gradient = () =>
    `linear-gradient(to right, ${opacify('#42a5f5')}, ${opacify('#c04cea')})`;

  return (
    <CookiesProvider>
      <AppBar
        position="sticky"
        sx={(theme) => ({
          color: theme.palette.text.primary,
          backgroundColor: opacify('#ffffff'),
          backdropFilter: 'blur(5px)',
          '.MuiToolbar-root': {
            paddingBlock: 1,
            paddingInline: { sm: 2, xs: 1 },
            boxSizing: 'border-box',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            zIndex: -1,
            inset: 0,
            pointerEvents: 'none',
            backgroundImage: gradient(),
            opacity: trigger ? 1 : 0,
            transition: 'opacity 0.2s ease-in-out',
          },
        })}
      >
        <Toolbar
          sx={() => ({
            justifyContent: 'space-between',
          })}
        >
          <Typography>LOGO</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Link href="/basket" sx={{ margin: '0 15px' }}>
              <img src="assets/basket.svg" alt="basket" />
            </Link>
            {cookies.user ? (
              <>
                <BaseButton href="/profile">Profile</BaseButton>
                <SignOutButton />
              </>
            ) : (
              <>
                <BaseButton href="/signin">Sign In</BaseButton>
                <BaseButton href="/signup">Sign up</BaseButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </CookiesProvider>
  );
};

export default Header;
