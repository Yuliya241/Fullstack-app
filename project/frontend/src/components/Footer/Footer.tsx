import { Stack } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem',
          boxShadow:
            '0px 2px 4px -1px rgba(0, 0, 0, 0.3), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
        }}
      >
        <p>© 2024</p>
      </Stack>
    </footer>
  );
};

export default Footer;