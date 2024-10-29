import { API, COOKIES } from '../../enums/enums';
import { CartItem } from '../../interfaces/interfaces';
import { Cookies } from 'react-cookie';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box, tableCellClasses, Card, CardContent, Typography } from '@mui/material';
import { getCartItems, removeBookFromCart, setQuantity, setSelectedBook } from '../../store/slices/CartSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect } from 'react';
import { useGetUserCartQuery } from '../../store/api/BooksApi';
import Loader from '../../components/Loader/Loader';
import { selectCart, selectTotalPrice } from '../../store/selectors/Selectors';

const Basket = () => {
  const cookies = new Cookies();
  const userId = cookies.get(COOKIES.ID);
  const token = cookies.get(COOKIES.TOKEN);

  const dispatch = useAppDispatch();
  const { data, isFetching } = useGetUserCartQuery(userId || '');
  const cartItems = useAppSelector(selectCart());
  const totalPrice = useAppSelector(selectTotalPrice());
  
  useEffect(() => {
    if (data) {
      dispatch(getCartItems(data));
    }
  }, [data]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const updateQuantity = async (id: number, num: number) => {
    try {
      const response = await fetch(`${API.CART_UPDATE}${id}/`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({quantity: num}),
      });

      if (response.ok) {
        dispatch(setQuantity(num));
        dispatch(setSelectedBook(id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteFromCart = async (id: number) => {
    try {
      await fetch(`${API.CART_DELETE}${id}/`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box sx={{ padding: '4rem 2.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    }}>
      {isFetching ? (
        <Loader />
      ) : (
        cartItems?.length ? (
          <>
                              <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>№</StyledTableCell>
                            <StyledTableCell align="right">Изображение</StyledTableCell>
                            <StyledTableCell align="right">Название</StyledTableCell>
                            <StyledTableCell align="right">Автор</StyledTableCell>
                            <StyledTableCell align="right">Цена, руб</StyledTableCell>
                            <StyledTableCell align="right">Цена со скидкой, руб</StyledTableCell>
                            <StyledTableCell align="right">Обычная цена, руб</StyledTableCell>
                            <StyledTableCell align="right">Количество, шт</StyledTableCell>
                            <StyledTableCell align="right">Итого за товар, руб</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {cartItems && cartItems.map((row: CartItem, index: number) => (
                            <StyledTableRow
                              key={index}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <StyledTableCell component="th" scope="row">
                                {row.book_id}
                              </StyledTableCell>
                              <StyledTableCell align="right"><img src={row.image} alt={row.title} width="50" /></StyledTableCell>
                              <StyledTableCell align="right">{row.title}</StyledTableCell>
                              <StyledTableCell align="right">{row.author}</StyledTableCell>
                              <StyledTableCell align="right">{row.oldprice}</StyledTableCell>
                              <StyledTableCell align="right">{row.specialprice}</StyledTableCell>
                              <StyledTableCell align="right">{row.regularprice}</StyledTableCell>
                                <StyledTableCell align="right">
                                <select
                                              className="form-class"
                                              defaultValue={row.quantity}
                                              onChange={e => {
                                                updateQuantity(row.book_id, Number(e.target.value))
                                              }}
                                          >
                                              {[...Array(100)].map((row, i) =>
                                                  <option key={i}>
                                                      {i + 1}
                                                  </option>
                                              )}
                                          </select>
                              </StyledTableCell>
                              <StyledTableCell align="right" sx={{fontWeight: 900}} style={{fontSize: '1.1rem' }}>{row?.quantity && (
                                row.regularprice ? (row.regularprice * row?.quantity).toFixed(2) : (
                                  (row.specialprice * row?.quantity).toFixed(2)
                                )
                              )}</StyledTableCell>
                              <StyledTableCell align="right">
                                <DeleteIcon onClick={() => {
                                  deleteFromCart(row.book_id);
                                  dispatch(removeBookFromCart(row))
                                }} color="error" sx={{ cursor: 'pointer' }} />
                              </StyledTableCell>
                              </StyledTableRow>
                          ))
                          }
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Card sx={{ width: '100%'}}>
                      <CardContent sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                  fontSize: '1.1rem',
                       
                      }}>
                        <Typography component="p" sx={{fontWeight: '900'}}>
                          Total Amount:{' '}
                          <Typography component="span" sx={{
                            color: '#03A9F4',
                            fontWeight: '600',
                            fontSize: '1.1rem'
                          }}>{totalPrice.toFixed(2)} руб</Typography>
                        </Typography>
                      </CardContent>
                    </Card>
          </>
        ) : (
          <Typography variant="h6">Ваша корзина пуста</Typography>
        )
      )}
      
    </Box>
    );
};

export default Basket;
