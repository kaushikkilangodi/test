import { Link, useNavigate } from '@tanstack/react-router';
import FixedAddButton from '../components/FixedAddButton';
import UserAvatar from '../components/UserAvatar';
import Row from '../components/Row';
import styled from 'styled-components';

const Content = styled.div`
  font-family: Helvetica;
  font-size: 11.5px;
  font-weight: 400;
  line-height: 13.22px;
  margin-top: -25px;
  margin-left: 67px;
`;

export default function Notes() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate({ to: '/newContacts' });
  };
  return (
    <>
      <Row style={{marginRight:20}}>
        <Link to={'/chatpage'}>
          <Row type="vertical" style={{ marginLeft: 15 }}>
            <Row>
              <UserAvatar marginTop="-15px" />
            </Row>
            <Row>
              <Content>hello edhbqhjb bjhdbqjhb</Content>
            </Row>
          </Row>
        </Link>
        <Row type="vertical" style={{ marginTop: -50, fontSize: 14 }}>
          10:00 AM
        </Row>
      </Row>
      <FixedAddButton onClick={handleClick} />
    </>
  );
}
