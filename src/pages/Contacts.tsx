import { Button, IconButton, Stack } from '@mui/material';
import { Link, useNavigate } from '@tanstack/react-router';
import Row from '../components/Row';
import { useMediaQuery } from '@mui/material';
import UserAvatar from '../components/UserAvatar';
import { BiEditAlt } from 'react-icons/bi';
import styled from 'styled-components';

const Icon = styled.div`
  cursor: pointer;
  margin-right: 10px;
  width: 37px;
  height: 32px;
  border-radius: 10px;
  background-color: #d9d9d9;
  display: flex; /* Center the icon vertically and horizontally */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  transition: background-color 0.3s; /* Smooth transition for hover effect */
  user-select: none; /* Prevent text selection */

  &:hover {
    background-color: #5a9eee; /* Change background color on hover */
  }
`;

function Contacts() {
  const isSmallScreen = useMediaQuery('(max-width: 350px)');
  const navigate = useNavigate();
  const handleEditContact = () => {
    navigate({ to: '/editcontact' });
    // Redirect to the editcontact page
    // history.push('/editcontact');
  };
  return (
    <>
      <Stack
        direction={isSmallScreen ? 'column' : 'row'}
        justifyContent={'center'}
      >
        <Row $contentposition="center">
          <Link to={'/newContacts'}>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                marginLeft: '-10px',
                width: isSmallScreen ? '240px' : '300px',
                height: '54px',
                backgroundColor: '#5a9eee',
                color: 'white',
                borderRadius: '11px',
                ':hover': {
                  color: 'white',
                  backgroundColor: '#5a9eee',
                },
              }}
            >
              New Contact
            </Button>
          </Link>
        </Row>
      </Stack>
      <Row style={{ marginLeft: 15 }}>
        <UserAvatar />
        <Row $contentposition="right">
          <IconButton
            aria-label="edit"
            size="large"
            sx={{
              ':hover': {
                background: 'none',
              },
            }}
            onClick={handleEditContact}
          >
            <Icon>
              <BiEditAlt />
            </Icon>
          </IconButton>
        </Row>
      </Row>
    </>
  );
}

export default Contacts;
