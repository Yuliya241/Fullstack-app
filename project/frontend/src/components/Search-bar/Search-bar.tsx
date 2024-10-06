import { Button, TextField } from '@mui/material';
import { SearchProps } from '../../types/types';
import styles from './Search-bar.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { selectSearch } from '../../store/selectors/Selectors';
import { useAppSelector } from '../../store/store';

const SearchBar = ({ onSearch }: SearchProps) => {
  const [, setSearchParams] = useSearchParams();
  const search = useAppSelector(selectSearch());
  const [searchTerm, setSearchTerm] = useState(search);

  const onChangeSearchTerm = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setSearchParams((params) => {
      params.set('search', e.target.value.trim());
      return params;
    });
  };

  const onSubmit = (): void => {
    setSearchTerm(searchTerm?.trim() || '');
    onSearch(searchTerm?.trim() || '');
    if (!searchTerm) {
      setSearchParams((params) => {
        params.delete('search');
        return params;
      });
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.form__wrapper}>
        <label htmlFor="title"></label>
        <TextField
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#000000',
                  borderWidth: '1px',
                },
              },
            },
          }}
          type="text"
          id="title"
          placeholder="Поиск по названию..."
          value={searchTerm || ''}
          onChange={onChangeSearchTerm}
        />
        <Button
          onClick={onSubmit}
          variant="contained"
          sx={{
            transition: 'all 0.4s ease',
            backgroundColor: '#000000',
            color: '#ffffff',
            margin: '0 5px',
            '&:hover': {
              opacity: 0.6,
            },
          }}
        >
          <SearchIcon
            sx={{
              color: '#ffffff',
              transform: 'scale(1)',
              transition: 'all 0.2s linear',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
