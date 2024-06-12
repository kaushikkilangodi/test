import React, { useState } from 'react';
import {  IoArrowUp, IoArrowDown } from 'react-icons/io5';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
// import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Modal from './Modal';
import Calendar from './Calendar';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { CiSearch } from 'react-icons/ci';



const Search = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  height: '40px',

  backgroundColor: '#D9D9D9',
  display: 'flex',

  // '&:hover': {
  //   backgroundColor: '#D9D9D9',
  // },

  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(0),
    width: '100%',
  },
}));

// Remove the declaration and assignment of StyledIconButton

const SearchIconWrapper = styled('div')`
  color: black;
  height: 100%;
  display:flex;
  cursor: pointer;
  gap:0.5px;  
 
`;

const StyledInputBase = styled(InputBase)`
  color: '#000';
  width: 80%;
  height: 100%;
  padding:10px 0px 10px 10px;
`



const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollTop, setScrollTop] = useState(0);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const handleScrollUp = () => {
    setScrollTop(scrollTop - 100);
console.log('scrollingdown')  
};

  const handleScrollDown = () => {
    setScrollTop(scrollTop + 100);
    console.log('scrollingup')
  };

  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    console.log("clicked")
    setIsVisible(!isVisible);
  };

  return (
    <AppBar position="static" color="transparent" style={{ boxShadow: 'none' }}>
      <CiSearch
        onClick={() => {
          handleClick();
        }}
      />
      <Toolbar sx={isVisible ? { display: 'none' } : { display: 'block' }}>
        <Search>
          <KeyboardBackspaceOutlinedIcon style={{marginTop:'11px'}}/>
          <StyledInputBase
            placeholder="Search chat..."
            value={searchQuery}
            onChange={handleSearchChange}
            inputProps={{ 'aria-label': 'search' }}
          />
          <SearchIconWrapper>
            <Modal>
              <Modal.Open opens="calendar">
                <IconButton aria-label="calendar">
                  <CalendarTodayIcon fontSize="inherit" />
                </IconButton>
              </Modal.Open>
              <Modal.Window name="calendar">
                <Calendar />
              </Modal.Window>
            </Modal>
            <IconButton aria-label="up" onClick={handleScrollUp}>
              <IoArrowUp />
            </IconButton>
            <IconButton aria-label="down" onClick={handleScrollDown}>
              <IoArrowDown />
            </IconButton>
          </SearchIconWrapper>
        </Search>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
