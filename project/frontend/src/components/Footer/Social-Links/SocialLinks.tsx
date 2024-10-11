import { Box } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const SocialLinks = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '12rem',
        justifyContent: 'space-between',
      }}
    >
      <Box
        component="a"
        title="facebook"
        target="_blank"
        href="https://facebook.com/pages/biblioby/160393073996827"
        sx={{
          width: '2.5rem',
          height: '2.5rem',
          padding: '5px',
          backgroundColor: '#de5648',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <FacebookIcon />
      </Box>
      <Box
        component="a"
        title="twitter"
        target="_blank"
        href="https://twitter.com/biblio_by"
        sx={{
          width: '2.5rem',
          height: '2.5rem',
          padding: '5px',
          backgroundColor: '#de5648',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <TwitterIcon />
      </Box>
      <Box
        component="a"
        title="instagram"
        target="_blank"
        href="https://www.instagram.com/biblioby/?utm_source=main_site&utm_medium=icon"
        sx={{
          width: '2.5rem',
          height: '2.5rem',
          padding: '5px',
          backgroundColor: '#de5648',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <InstagramIcon />
      </Box>
      <Box
        component="a"
        title="vk"
        target="_blank"
        href="https://vk.com/biblio_by"
        sx={{
          textDecoration: 'none',
          width: '2.5rem',
          height: '2.5rem',
          padding: '5px',
          backgroundColor: '#de5648',
          color: '#ffffff',
          display: 'flex',
          fontSize: '1.6rem',
          fontWeight: '500',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        B
      </Box>
    </Box>
  );
};

export default SocialLinks;
