import { useState } from 'react';
import styled from 'styled-components';
import { Link } from '@tanstack/react-router';
import Modal from '../../components/Modal';
import Logout from './Logout';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

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
    border-radius: 50%; /* Adjusted for a perfect circle */
  }

  @media (max-width: 320px) {
    width: 100px;
    height: 84px;
    border-radius: 50%; /* Adjusted for a perfect circle */
  }`;

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
  text-align:left;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 20px;
  line-height: 4;
 
`;

const MenuItem = styled.li`
  padding: 2px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
`;

function SettingsLayout() {
  const companyName = 'Company name';
  const profileLetter = companyName.charAt(0);
  const [profileImage, setProfileImage] = useState<string | null>(null);

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
          <Link to="/companyinfo">

          <CompanyName>{companyName}</CompanyName>
          </Link>
        </Logo>
      <Menu>
        <MenuItem>
          <ViewAgendaOutlinedIcon sx={{ fontSize: 20 }} />
          <Link to={'/appointmentinfo'}>
          <span>Appointments</span>
          </Link>
        </MenuItem>
        <MenuItem>
          <AccountBalanceWalletOutlinedIcon sx={{ fontSize: 20 }}/>
          <Link to="/payment">
            <span>Payment Info</span>
          </Link>
        </MenuItem>

        <MenuItem>
          <LogoutRoundedIcon sx={{ fontSize: 20 }}/>
          <Modal>
            <div>
              <Modal.Open opens="logout">
                <span>Logout</span>
              </Modal.Open>
            </div>
            <Modal.Window name="logout">
              <Logout />
            </Modal.Window>
          </Modal>
        </MenuItem>
      </Menu>
    </>
  );
}

export default SettingsLayout;
