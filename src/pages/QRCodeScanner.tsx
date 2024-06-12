import { useEffect, useState } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode';
import Input from '../components/Input';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const QRCodeContainer = styled.div`
  width: 100%;
  height: 27vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
`;

const VideoWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 70%;
  height: 27.8vh;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    border: 3px solid black;
  }
  &::before {
    top: 0;
    left: 0;
    border-width: 2px 0 0 2px;
  }
  &::after {
    bottom: 0;
    right: 0;
    border-width: 0 2px 2px 0;
  }
  @media (max-width: 360px) {
    width: 70%;
    height: 26.2vh;
  }
  @media (max-width: 340px) {
    width: 70%;
    height: 24.5vh;
  }
`;

const Placeholder = styled.h4`
  position: absolute;
  color: black;
  background: rgba(255, 255, 255, 0.7);
  padding: 10px;
  border-radius: 5px;
`;

const QRCodeScanner = () => {
  const [showPlaceholder] = useState(true);
  const [selectedUPI, setSelectedUPI] = useState('');
  const [amount, setAmount] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const generateQRCode = () => {
      const upiString = `upi://pay?pa=${selectedUPI}&am=${amount}`;
      QRCode.toDataURL(upiString, (err, url) => {
        if (err) {
          console.error('Error generating QR code', err);
        } else {
          setQrCodeUrl(url);
        }
      });
    };

    const timeout = setTimeout(() => {
      if (selectedUPI && amount) {
        generateQRCode();
      } else {
        setQrCodeUrl('');
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [selectedUPI, amount]);

  
  return (
    <Container>
      <label>
        <Input
          type="text"
          label=""
          list="upi-ids"
          value={selectedUPI}
          onChange={(e) => setSelectedUPI(e.target.value)}
          placeholder="Select UPI Id"
        />
        <datalist id="upi-ids">
          <option value="upi-id-1" />
          <option value="upi-id-2" />
          <option value="upi-id-3" />
          {/* Add more options as needed */}
        </datalist>
      </label>

      <QRCodeContainer>
        {qrCodeUrl ? (
          <img src={qrCodeUrl} alt="UPI QR Code" style={{ width: '60%' }} />
        ) : (
          <VideoWrapper>
            {showPlaceholder && <Placeholder>QR Code</Placeholder>}
          </VideoWrapper>
        )}
      </QRCodeContainer>
      <Input
        type="number"
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount here"
      />
    </Container>
  );
};

export default QRCodeScanner;
