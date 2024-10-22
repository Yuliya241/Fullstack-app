import { Stack } from '@mui/material';
import SocialLinks from './Social-Links/SocialLinks';
import AccountBlock from './Account-block/AccountBlock';
import Contacts from './Contacts/Contacts';

const Footer = () => {
  return (
    <footer>
      <Stack
        direction="row"
        sx={{
          flexWrap: 'wrap',
          rowGap: '1rem',
          backgroundColor: '#f1f1f1',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '1.5rem 2.5rem',
          boxShadow:
            '0px 2px 4px -1px rgba(0, 0, 0, 0.3), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
        }}
      >
        <Contacts />
        <AccountBlock />
        <SocialLinks />
      </Stack>
    </footer>
  );
};

export default Footer;
