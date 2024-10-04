import { Card, CardContent, Typography } from "@mui/material";
import { Book } from "../../interfaces/interfaces";

const BookItem = (props: Book) => {
  const { image, title, author } = props;
  // const { image, title, author, oldprice, specialprice, regularprice } = props;

  return (
    <Card
      sx={{
        width: '18rem',
        cursor: 'pointer',
        // backgroundColor: '#f3f8f3',
        // transform: 'scale(1)',
        // transition: 'all 0.2s linear',
        marginTop: 3,
        // '&:hover': {
        //   transform: 'scale(1.1)',
        //   boxShadow: '0 10px 20px #26323814',
        // },
      }}
    >
      <CardContent sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <img src={image} alt={title} />
        <Typography
          variant="h5"
          component="p"
          sx={{
            color: '#197ccb',
            opacity: 0.8,
            padding: '0.5rem 0 1rem 0',
            textAlign: 'center',
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
        <Typography>{author}</Typography>
      </CardContent>
    </Card>
  );
};

export default BookItem;