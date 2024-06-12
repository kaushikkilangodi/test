import styled from 'styled-components';
import Row from './Row';
import { Avatar } from '@mui/material';
// import { blue } from '@mui/material/colors';

const Content = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #000;
  line-height: 16.1px;

  @media (max-width: 380px) {
    font-size: 12px;
  }
`;

const Content1 = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #000;
  line-height: 30px;

  @media (max-width: 380px) {
    font-size: 16px;
  }
`;

interface UserAvatarProps {
  data: {
    Token: string;
    Slot: string;
    Time: string;
  };
}

export default function AppointmentAvatar({ data }: UserAvatarProps) {
  return (
    <Row
      type="horizontal"
      $contentposition="spaceBetween"
      style={{ background: '', width: '100%' }}
    >
      <Avatar
        sx={{
          bgcolor: '#fff',
          color: 'black',
          border: '1px solid #D9D9D9',
          width: '52px',
          height: '52px',
          padding: '10px',
        }}
      >
        J
      </Avatar>
      <Row type="vertical" $contentposition="spaceBetween" size="xsmall">
        <Row>
          <Content1>Jane Cooper</Content1>
        </Row>
        <Row>
          <Content>+91 9999999999</Content>
        </Row>
      </Row>
      <Row $contentposition="center">
        <Row type="vertical" size="small" style={{ fontSize: 12 }}>
          <Row>{data.Token}</Row>
          <Row>{data.Slot}</Row>
        </Row>
      </Row>
      <Row type="vertical" style={{ marginTop: -50, fontSize: 14 }}>
        {data.Time}
      </Row>
    </Row>
  );
}
