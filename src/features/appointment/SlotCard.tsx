import { IoSaveOutline } from 'react-icons/io5';
import { AiOutlineDelete } from 'react-icons/ai';
import Row from '../../components/Row';
import Modal, { ModalContext } from '../../components/Modal';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import styled from 'styled-components';
import { useContext } from 'react';
import { IconButton } from '@mui/material';

interface Slot {
  id: number;
  time: string;
  isDirty: boolean;
  people: number;
  date: string;
}

interface SlotCardProps {
  slot: Slot;
  slots: Slot[];
  handleTimeChange: (id: number, value: string) => void;
  handlePeopleChange: (id: number, value: number) => void;
  saveSlot: (id: number) => void;
  handleDeleteSlot: (id: number) => void;
}

const SlotCard1 = styled.div`
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px rgba(0, 0, 0, 0.1);
`;

const SlotLabel = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  line-height: 30px;
`;

const SlotInput = styled.input`
  padding: 10px;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 100%;

  &:focus {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const SlotSelect = styled.select`
  padding: 10px;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 2px;
  font-size: large;
`;

export default function SlotCard({
  slot,
  slots,
  handleTimeChange,
  handlePeopleChange,
  saveSlot,
  handleDeleteSlot,
}: SlotCardProps) {
  const { closeModal } = useContext(ModalContext);

  return (
    <SlotCard1 key={slot.id}>
      <Row>
        <Row style={{ color: '#5a9eee' }}>Slot {slot.id}</Row>
        <IconContainer>
          {slot.isDirty && (
            <IconButton
              aria-label="edit"
              size="large"
              sx={{
                color: 'black',
                ':hover': {
                  background: 'none',
                },
              }}
              onClick={() => saveSlot(slot.id)}
            >
              <IoSaveOutline />
            </IconButton>
          )}
          {slots.length > 1 && (
            <Modal>
              <Modal.Open opens="Delete-slot">
                <IconButton
                  aria-label="edit"
                  size="large"
                  sx={{
                    color: 'black',
                    ':hover': {
                      background: 'none',
                    },
                  }}
                >
                  <AiOutlineDelete />
                </IconButton>
              </Modal.Open>
              <Modal.Window name="Delete-slot">
                <ConfirmationDialog
                  title="Confirm Delete"
                  cancelText="No"
                  confirmText="Yes"
                  onConfirm={() => handleDeleteSlot(slot.id)}
                  closeModal={closeModal}
                >
                  <p>Are you sure you want to delete the slot?</p>
                </ConfirmationDialog>
              </Modal.Window>
            </Modal>
          )}
        </IconContainer>
      </Row>

      <div>
        <SlotLabel htmlFor={`time-${slot.id}`}>Schedule:</SlotLabel>
        <SlotSelect
          id={`time-${slot.id}`}
          value={slot.time}
          onChange={(e) => handleTimeChange(slot.id, e.target.value)}
          disabled={!slot.isDirty}
        >
          <option value="">Select Time</option>
          {[
            '8:00 AM - 9:00 AM',
            '9:00 AM - 10:00 AM',
            '10:00 AM - 11:00 AM',
            '11:00 AM - 12:00 PM',
            '12:00 PM - 1:00 PM',
            '1:00 PM - 2:00 PM',
            '2:00 PM - 3:00 PM',
            '3:00 PM - 4:00 PM',
            '4:00 PM - 5:00 PM',
          ].map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </SlotSelect>
      </div>
      <div>
        <SlotLabel htmlFor={`people-${slot.id}`}>People per slot:</SlotLabel>
        <SlotInput
          type="number"
          id={`people-${slot.id}`}
          value={slot.people}
          onChange={(e) =>
            handlePeopleChange(slot.id, parseInt(e.target.value))
          }
        />
      </div>
    </SlotCard1>
  );
}
