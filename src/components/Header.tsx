import React from 'react';
import styled from 'styled-components';
import { IoArrowBack } from 'react-icons/io5';
import { useLocation, useNavigate } from '@tanstack/react-router';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled as muiStyled } from '@mui/material/styles';
import RouteTitle from './RouteTitle';
import { useMoveBack } from '../hooks/useMoveBack';
import QrCodeRoundedIcon from '@mui/icons-material/QrCodeRounded';
import { useState } from 'react';
import { IconButton } from '@mui/material';
// import { searchUser } from '../services/realmServices';
// import UserAvatar from './UserAvatar';

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  margin: 0;
  line-height: 23px;
  font-size: 20px;
  font-weight: 400;
  font-style: Helvetica;
  color: #5a9eee;
`;

const QrButton = styled.button`
  border: none;
  background: none;
  color: black;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;

  &:hover {
    color: #555;
  }
`;

const formatRouteTitle = (pathname: string): string => {
  const title = pathname.substring(1); // remove the leading slash
  return title.charAt(0).toUpperCase() + title.slice(1);
};

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const CustomAppBar = muiStyled(AppBar)({
  boxShadow: 'none',
});
const Search = muiStyled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  height: '40px',
  backgroundColor: '#D9D9D9',
  '&:hover': {
    backgroundColor: '#D9D9D9',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(0),
    width: '100%',
  },
}));
const SearchIconWrapper = muiStyled('div')(({ theme }) => ({
  color: 'black',
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 1,
}));

const StyledInputBase = muiStyled(InputBase)(({ theme }) => ({
  color: '#000',
  height: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100ch',
    },
  },
}));

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const routeName = formatRouteTitle(location.pathname);
  const moveBack = useMoveBack();
  const [searchQuery, setSearchQuery] = useState('');

  const shouldShowBackButton = ![
    '/appointments',
    '/notes',
    '/settings',
    '/',
  ].includes(location.pathname);

  const handleQrButton = () => {
    navigate({ to: '/qrscanner' });
  };
  const moveBackAndClearSearch = () => {
    moveBack();
    setSearchQuery('');
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    console.log(event.target.value);
  };

  //  let data1;
  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate({ to: `/search?query=${searchQuery}` });

  //  data1 = await searchUser(searchQuery);
  // console.log("data1.....",data1)

  };

  const isSearchPage = location.pathname === '/search';

  return (
    <CustomAppBar position="static" color="transparent">
      <Toolbar>
        <HeaderContainer>
          {!isSearchPage && (
            <TopRow>
              <TitleContainer>
                {shouldShowBackButton && (
                  <IconButton
                    aria-label="edit"
                    size="small"
                    sx={{
                      fontSize: '20px',
                      color: 'black',
                      ':hover': {
                        background: 'none',
                      },
                    }}
                    onClick={moveBack}
                  >
                    <IoArrowBack />
                  </IconButton>
                )}
                <Title>{routeName || 'Appointments'}</Title>
              </TitleContainer>
              <IconButton
                aria-label="edit"
                size="small"
                sx={{
                  color: 'black',
                  ':hover': {
                    background: 'none',
                  },
                }}
                onClick={handleQrButton}
              >
                <QrButton>
                  <QrCodeRoundedIcon fontSize="inherit" />
                </QrButton>
              </IconButton>
            </TopRow>
          )}
          <BottomRow>
            <Form onSubmit={handleSearchSubmit}>
              <Search>
                <SearchIconWrapper
                  onClick={isSearchPage ? moveBackAndClearSearch : undefined}
                >
                  {isSearchPage ? <IoArrowBack /> : <SearchIcon />}
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Form>
          </BottomRow>
        </HeaderContainer>
        <RouteTitle />
      </Toolbar>
      {/* <UserAvatar data={data1}/> */}
    </CustomAppBar>
  );
};

export default Header;
