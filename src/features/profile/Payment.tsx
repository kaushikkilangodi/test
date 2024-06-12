
import { useContext, useState } from 'react';
import styled from 'styled-components';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Input from '../../components/Input';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Button from '@mui/material/Button';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Row from '../../components/Row';
import Modal, { ModalContext } from '../../components/Modal';
import ConfirmationDialog from '../../components/ConfirmationDialog';


const PaymentInfoContainer = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 4px;
`;

const UpiIdContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  justify-content: start;
  margin-left: 0rem;
`;

const NewUpiIdContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content:start;
  margin-top: 0.05;
  margin-left: 2rem;
`;

const SaveDeleteContainer = styled.div`
  padding: 10px;
  font-size: 25px;
  display: flex;
`;

const IconContainer = styled.span`
  padding: 5px;
  font-size: 35px;
  cursor: pointer;
`;

const InputContainer = styled.div`
  flex-grow: 0;
  display: flex;
  justify-content: center;
`;


const PaymentInfo = () => {
  const [upiIds, setUpiIds] = useState(['Example@okicici']);
  const [newUpiId, setNewUpiId] = useState('');
  const [showInput, setShowInput] = useState(false);
  const {closeModal} = useContext(ModalContext);

  const handleAddClick = () => {
    setShowInput(true);
  };

  const handleSaveUpiId = () => {
    if (newUpiId.trim() !== '') {
      setUpiIds([...upiIds, newUpiId]);
      setNewUpiId('');
      setShowInput(false);
    }
  };

  const handleDeleteUpiId = (index: number) => {
    const updatedUpiIds = [...upiIds];
    updatedUpiIds.splice(index, 1);
    setUpiIds(updatedUpiIds);
      closeModal();
  };

  const handleCancel = () => {
    setNewUpiId('');
    setShowInput(false);
  };

  return (
    <PaymentInfoContainer>
      {upiIds.map((upiId, index) => (
        <Row $contentposition="center">
          <UpiIdContainer key={upiId}>
            <InputContainer>
              <Input
                width="240px"
                type="text"
                label={`UPI ID ${index + 1}`}
                value={upiId}
                readOnly
              />
            </InputContainer>
            <Modal>
              <Modal.Open opens="Delete-UPI">
                <IconContainer>
                  <DeleteOutlineOutlinedIcon fontSize="large" />
                </IconContainer>
              </Modal.Open>
              <Modal.Window name="Delete-UPI">
                <ConfirmationDialog
                  title="Confirm Delete"
                  confirmText="Yes"
                  cancelText="No"
                  onConfirm={() => handleDeleteUpiId(index)}
                  closeModal={closeModal}
                >
                  <p>Are you sure you want to delete the UPI ID?</p>
                </ConfirmationDialog>
              </Modal.Window>
            </Modal>
          </UpiIdContainer>
        </Row>
      ))}
      {showInput ? (
        <Row $contentposition="center">
          <NewUpiIdContainer>
            <InputContainer>
              <Input
                type="text"
                label={`UPI ID ${upiIds.length + 1}`}
                width="210px"
                value={newUpiId}
                onChange={(e) => setNewUpiId(e.target.value)}
                placeholder="Enter your UPI id"
              />
            </InputContainer>
            <SaveDeleteContainer>
              <IconContainer onClick={handleSaveUpiId}>
                <SaveOutlinedIcon fontSize="large" />
              </IconContainer>
              <IconContainer onClick={handleCancel}>
                <DeleteOutlineOutlinedIcon fontSize="large" />
              </IconContainer>
            </SaveDeleteContainer>
          </NewUpiIdContainer>
        </Row>
      ) : (
        <Row $contentposition="center">
          <Button
            variant="outlined"
            sx={{
              color: 'white',
              backgroundColor: '#5A9EEE',

              fontSize: '15px',
              borderRadius: '11px',
              ':hover': { backgroundColor: '#5A9EEE', color: 'white' },
            }}
            onClick={handleAddClick}
          >
            <AddOutlinedIcon />
            Add Id
          </Button>
        </Row>
      )}
    </PaymentInfoContainer>
  );
};

export default PaymentInfo;
