import { Box, Link, Stack, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contacts = () => {
  return (
    <Stack sx={{ maxWidth: '18.25rem' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          borderRight: '1px solid #23b4ca',
          borderBottom: '2px solid #23b4ca',
        }}
      >
        <Box
          sx={{
            width: '2.5rem',
            height: '2.5rem',
            padding: '5px',
            backgroundColor: '#23b4ca',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LocationOnIcon />
        </Box>
        <Typography
          sx={{
            fontSize: '1.5rem',
            fontWeight: 'lighter',
            padding: '0 0 0 10px',
            lineHeight: '2.5rem',
          }}
        >
          Контакты
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            paddingTop: '15px',
            color: '#555',
            fontSize: '0.98rem',
          }}
        >
          Телефоны:
        </Typography>
        <ul style={{ padding: '4px 0' }}>
          <li style={{ lineHeight: 1.4, color: '#555' }}>
            <Link
              href="tel:+375296156588"
              sx={{
                textDecoration: 'none',
                color: '#555',
                fontWeight: 900,
              }}
            >
              +375 29 615 65 88
            </Link>
            &nbsp;A1
          </li>
          <li style={{ lineHeight: 1.4, color: '#555' }}>
            <Link
              href="tel:+375296156588"
              sx={{
                textDecoration: 'none',
                color: '#555',
                fontWeight: 900,
              }}
            >
              +375 29 851 65 88
            </Link>
            &nbsp;MTC
          </li>
          <li style={{ lineHeight: 1.4, color: '#555' }}>
            <Link
              href="tel:+375296156588"
              sx={{
                textDecoration: 'none',
                color: '#555',
                fontWeight: 900,
              }}
            >
              +375 25 692 65 88
            </Link>
            &nbsp;Life
          </li>
        </ul>
      </Box>
      <Box>
        <Typography sx={{ color: '#555', fontSize: '0.98rem' }}>
          Email:&nbsp;
          <Link
            href="mailto:biblio@biblio.by"
            sx={{
              textDecoration: 'none',
              color: '#23b4ca;',
            }}
          >
            biblio@biblio.by
          </Link>
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ color: '#555', fontSize: '0.98rem' }}>
          Skype:&nbsp;
          <Link
            href="skype:biblio.by?chat"
            sx={{
              textDecoration: 'none',
              color: '#23b4ca;',
            }}
          >
            biblio.by
          </Link>
        </Typography>
      </Box>
      <Typography
        sx={{ color: '#555', fontSize: '0.98rem', textAlign: 'justify' }}
      >
        Адрес:&nbsp;
        <Typography component="span" style={{ textAlign: 'justify' }}>
          Интернет магазин. Для
          <br />
        </Typography>
        <Typography
          component="span"
          style={{ textIndent: '3em', textAlign: 'justify', display: 'block' }}
        >
          передачи заказа в выбранный
          <br />
          вами пункт самовывоза необходимо
          <br />
          предварительно оформить заказ на
          <br />
          сайте или по телефону.
        </Typography>
      </Typography>
    </Stack>
  );
};

export default Contacts;
