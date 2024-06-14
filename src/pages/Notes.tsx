import { useNavigate } from '@tanstack/react-router';
import FixedAddButton from '../components/FixedAddButton';
import UserAvatar from '../components/UserAvatar';
import Row from '../components/Row';
import styled from 'styled-components';
import { Button } from '@mui/material';

const Content = styled.div`
  font-family: Helvetica;
  font-size: 11.5px;
  font-weight: 400;
  line-height: 13.22px;
  margin-top: -25px;
  margin-left: 67px;
  text-transform:none;
  color: #000;
  /* @media (max-width: 380px) {
    font-size: 10px;
    display: flex;
    justify-content: ;
    align-items: left;
  } */
`;

export default function Notes() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate({ to: '/newContacts' });
  };
  return (
    <Row >
      <Button sx={{width:'100%'}} onClick={() => navigate({ to: '/chatpage' })}>
        <Row style={{ cursor: 'pointer',width:'100%' }}>
          <Row  type="vertical" style={{  marginLeft: 0 }}>
            <Row>
              <UserAvatar $marginTop="-10px" />
            </Row>
           
            <Content style={{padding:'7px 2px '}}>hello edhbqhjb bjhdbqjhb</Content>
          
          </Row>
          <Row
            type="vertical"
            style={{
              marginTop: -50,
              fontSize: 12,
              color: 'black',
            
            }}
          >
            10:00 AM
          </Row>
        </Row>
      </Button>
      <FixedAddButton onClick={handleClick} />
    </Row>
  );
}
