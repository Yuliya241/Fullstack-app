import {
  useScrollTrigger,
  AppBar,
  Toolbar,
  Box,
  Typography,
  Link
} from '@mui/material';
import BaseButton from '../ui/Button';
import SignOutButton from '../ui/SignOutButton';
import { useCookies, CookiesProvider } from 'react-cookie';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import PersonIcon from '@mui/icons-material/Person';
import { COOKIES } from '../../enums/enums';
import { selectCart } from '../../store/selectors/Selectors';
import { useAppSelector } from '../../store/store';

const Header = () => {
  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true,
  });
  const [cookies] = useCookies([COOKIES.TOKEN]);
  const cartItems = useAppSelector(selectCart());

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
          <Link
            href="/"
            sx={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: 'scale(1)',
              transition: 'all 0.2s linear',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <Box sx={{ display: 'flex', height: '3.19rem' }}>
              <Typography sx={{ color: '#03A9F4', fontSize: '2.5rem' }}>
                b
              </Typography>
              <Typography sx={{ color: '#03A9F4', fontSize: '2.25rem' }}>
                i
              </Typography>
              <Typography sx={{ color: '#4CAF50', fontSize: '2.5rem' }}>
                bl
              </Typography>
              <Typography sx={{ color: '#03A9F4', fontSize: '2.25rem' }}>
                i
              </Typography>
              <Typography sx={{ color: '#f2f209', fontSize: '2.57rem' }}>
                о.
              </Typography>
              <Typography sx={{ color: '#f20808', fontSize: '2.5rem' }}>
                by
              </Typography>
            </Box>
            <Typography
              sx={{
                color: '#000000',
                fontSize: '0.68rem',
                fontStyle: 'italic',
              }}
            >
              КНИГИ НА ВСЕ СЛУЧАИ ЖИЗНИ
            </Typography>
          </Link>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Link href="/basket" sx={{
              margin: '0 0.94rem',
              textDecoration: 'none',
              position: 'relative'
            }}>
              <LocalGroceryStoreIcon
                sx={{
                  color: '#000000',
                  '&:hover': {
                    color: 'rgba(0, 0, 0, 0.5)',
                  },
                }}
              />
              {cartItems.length ? <Box component="span" sx={{
                backgroundColor: '#03A9F4',
                color: '#ffffff',
                borderRadius: '10px',
                padding: '0 0.4rem',
                position: 'absolute',
                bottom: '1.55rem',
                left: '1rem'
              }}>{cartItems.length}</Box> : null}
            </Link>
            {cookies.userToken ? (
              <>
                <BaseButton href="/profile">
                  Профиль
                  <PersonIcon sx={{ marginLeft: '5px' }} />
                </BaseButton>
                <SignOutButton />
              </>
            ) : (
              <>
                <BaseButton href="/signin">Войти</BaseButton>
                <BaseButton href="/signup">Зарегистрироваться</BaseButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </CookiesProvider>
  );
};

export default Header;
