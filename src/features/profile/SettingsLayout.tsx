// src/components/SettingsLayout.tsx
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from '@tanstack/react-router';
import Modal from '../../components/Modal';
import Logout from './Logout';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { Button } from '@mui/material';
import Row from '../../components/Row';
import { useUser } from '../../context/userContext';

const Profile = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
  overflow: visible; /* Changed overflow to visible to show the image icon */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  @media (max-width: 350px) {
    width: 100px;
    height: 80px;
    border-radius: 50%;
  }

  @media (max-width: 320px) {
    width: 100px;
    height: 84px;
    border-radius: 50%; 
  }
`;

const CameraIcon = styled.label`
  position: absolute;
  bottom: -2px;
  right: 8px;
  width: 28px;
  height: 28px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #eee;
  cursor: pointer;
  color: black;
  font-size: 16px;

  input {
    display: none;
  }
`;

const Logo = styled.div`
  background-color: aliceblue;
  width: 100%;
  cursor: pointer;
  display: flex;
  font-size: 24px;
  font-weight: bold;
  align-items: center;
`;

const CompanyName = styled.div`
  font-size: 15px;
  font-weight: bold;
  padding: 49px;
  text-align: left;
`;

const MenuItem = styled.div`
  padding: 2px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
`;


function SettingsLayout() {
  const companyname = 'Company name'; 
  const profileLetter = companyname.charAt(0);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useUser();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          setProfileImage(e.target.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Logo>
        <Profile>
          {profileImage ? (
            <img src={profileImage} alt="Profile" />
          ) : (
            profileLetter
          )}
          <CameraIcon>
            <CameraAltOutlinedIcon />
          </CameraIcon>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{
              opacity: 0,
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: 0,
              cursor: 'pointer',
            }}
          />
        </Profile>
        <Button
          sx={{ color: '#000' }}
          onClick={() => navigate({ to: '/companyinfo' })}
        >
          <CompanyName>{user ? user?.companyName : companyname}</CompanyName>
        </Button>
      </Logo>
      <Row type="vertical" style={{ marginLeft: 15,gap:'30px', cursor: 'pointer',width:'390px' }}>
        <Row onClick={() => navigate({ to: '/appointmentinfo' })}>
          <Button sx={{ color: '#000', textTransform: 'none' }}>
            <MenuItem>
              <ViewAgendaOutlinedIcon sx={{ fontSize: 20,lineHeight:'23px' }} />
              Appointments
            </MenuItem>
          </Button>
        </Row>
        <Row onClick={() => navigate({ to: '/payment' })}>
          <Button sx={{ color: '#000', textTransform: 'none' }}>
            <MenuItem>
              <AccountBalanceWalletOutlinedIcon sx={{ fontSize: 20 }} />
              Payment Info
            </MenuItem>
          </Button>
        </Row>

        <Modal>
          <Modal.Open opens="logout">
            <Row>
              <Button sx={{ color: '#000', textTransform: 'none'}}>
                <MenuItem>
                  <LogoutRoundedIcon sx={{ fontSize: 20 }} />
                  Logout
                </MenuItem>
              </Button>
            </Row>
          </Modal.Open>

          <Modal.Window name="logout">
            <Logout />
          </Modal.Window>
        </Modal>
      </Row>
    </>
  );
}

export default SettingsLayout;
