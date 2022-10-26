/**
 * @file search area
 * @author Mingze Ma
 */
import React, {useCallback, useState} from "react";
import {alpha, Button, InputBase, styled} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import _ from "lodash";
import qs from 'query-string';

const Search = styled('div')(({theme}) => ({
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.35),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: theme.palette.primary.contrastText,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchBar: React.FC = () => {

  const [value, setValue] = useState('');
  const [focus, setFocus] = useState(false);

  const handleRedirect = useCallback(() => {
    window.location.href = '/search?' + qs.stringify({keyword: value});
  }, [value]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, []);

  const handleKeyPress = useCallback<React.KeyboardEventHandler<HTMLInputElement>>((e) => {
    if (e.key === 'Enter') {
      handleRedirect();
    }
  }, [handleRedirect]);

  return (
    <Search
      onMouseLeave={() => setFocus(false)}
      onMouseOver={() => setFocus(true)}
    >
      <SearchIconWrapper>
        <SearchIcon/>
      </SearchIconWrapper>
      <StyledInputBase
        onKeyUp={handleKeyPress}
        onChange={handleInputChange}
        placeholder="Search…"
      />
      <Button
        size="small"
        variant="text"
        sx={(theme) => ({color: '#fff', width: focus ? '100%' : '0px', transition: theme.transitions.create('width')})}
        onClick={handleRedirect}
      >
        {focus && 'SEARCH'}
      </Button>
    </Search>
  );
};

export default SearchBar;
