import styled from 'styled-components';
import Row from './Row';
import React from 'react';
import { Avatar } from '@mui/material';

interface UserAvatarProps {
  marginTop?: string;
}

const Content = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #000;
  line-height: 16.1px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Content1 = styled.div<UserAvatarProps>`
  font-size: 18px;
  font-weight: 400;
  color: #000;
  line-height: 30px;
  margin-top: ${(props) => props.marginTop || '0px'};
  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const UserAvatar: React.FC<UserAvatarProps> = ({ marginTop}) => {

  // console.log("1234567😂😂😂😂",data)
  return (
    <Row type="horizontal" $contentposition="center">
      <Avatar
        sx={{
          bgcolor: '#fff',
          color: 'black',
          border: '1px solid #D9D9D9',
          width: '52px',
          height: '52px',
        }}
      >
        J
      </Avatar>
      <Row type="vertical" $contentposition="spaceBetween" size="xsmall">
        <Row>
          <Content1 marginTop={marginTop}>name</Content1>
        </Row>
        <Row>
          <Content>+91 9999999999</Content>
        </Row>
      </Row>
    </Row>
  );
};

export default UserAvatar;
