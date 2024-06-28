import { Link, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import FixedAddButton from '../components/FixedAddButton';
import UserAvatar from '../components/UserAvatar';
import Row from '../components/Row';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { displayContacts } from '../services/realmServices';
import { User } from '../services/types';
import Loader from '../components/Loader';

const Content = styled.div`
  font-family: Helvetica;
  font-size: 11.5px;
  font-weight: 400;
  line-height: 13.22px;
  margin-top: -25px;
  margin-left: 67px;
  text-transform: none;
  color: #000;
`;
const StyledParagraph = styled.p`
  font-family: Helvetica;
  font-size: 14px;
  font-weight: 400;
  line-height: 13.22px;
  text-transform: none;
  color: #8b9195;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

export default function Notes() {
  const navigate = useNavigate();
  const [result, setResult] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    navigate({ to: '/newContacts' });
  };

  useEffect(() => {
    async function fetchContacts() {
      setLoading(true); // Start loading
      const data = await displayContacts();
      setLoading(false);
      if (data == null) return;
      setResult(data);
      console.log(data);
    }
    fetchContacts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!result.length) {
    return <StyledParagraph>No Results Found</StyledParagraph>;
  }

  return (
    <>
      {result.map((item, index) => (
        <Row key={index} style={{ marginBottom: -30 }}>
          <Button sx={{ width: '100%' }}>
            <Row style={{ cursor: 'pointer', width: '100%' }}>
              <Link to={`/chatpage/${item.name}`}>
                <Row type="vertical">
                  <Row>
                    <UserAvatar name={item.name} mobile={item.phone} />
                  </Row>
                  <Content style={{ padding: '7px 2px ' }}>
                    hello edhbqhjb bjhdbqjhb
                  </Content>
                </Row>
              </Link>
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
      ))}
    </>
  );
}
