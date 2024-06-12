import { useState } from 'react';
import styled from 'styled-components';
import Input from '../../components/Input';
import { Button } from '@mui/material';
import Row from '../../components/Row';
import DeleteAppointment from '../../components/DeleteAppointment';

interface Slot {
  id: number;
  time: string;
  bookings: number;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  margin: 0 auto;
`;

const FlexContainer = styled.div`
  width: 100%;
`;

const SlotContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const SlotItem = styled.div<{ isSelected: boolean }>`
  width: 100%;
  height: 90%;
  border: 1px solid #d9d9d9;
  border-radius: 10%;
  background-color: ${({ isSelected }) => (isSelected ? '#5A9EEE' : 'white')};
  cursor: pointer;
  padding: 7px 10px 10px 10px;
  position: relative;
  color: ${({ isSelected }) => (isSelected ? 'black' : '#5A9EEE')};
`;

const Circle = styled.div`
  width: 9px;
  height: 9px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 5px; /* Adjust as needed */
  right: 5px; /* Adjust as needed */
`;

const TextArea = styled.textarea`
  width: 95%;
  height: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
`;

const CreateAppointment = () => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    '2024-04-12'
  ); // Default date
  const [comments, setComments] = useState<string>('');

  const slots: Slot[] = [
    { id: 1, time: '8:00 - 9:00 AM', bookings: 5 },
    { id: 2, time: '9:00 - 10:00 AM', bookings: 5 },
    { id: 3, time: '10:00 - 11:00 AM', bookings: 5 },
    { id: 4, time: '11:00 - 12:00 AM', bookings: 5 },
    { id: 5, time: '2:00 - 3:00 AM', bookings: 5 },
    { id: 6, time: '3:00 - 4:00 AM', bookings: 5 },
  ];

  const handleSave = () => {
    if (selectedSlot !== null && selectedDate) {
      console.log('Selected Slot:', selectedSlot);
      console.log('Selected Date:', selectedDate);
      console.log('Comments:', comments);
      alert('Appointment saved successfully!');
      setSelectedSlot(null);
      setComments('');
    }
  };

  const isSaveEnabled = selectedSlot !== null && selectedDate !== null;

  return (
    <Container>
      <FlexContainer>
        <DeleteAppointment />
        <Input
          label=""
          type="date"
          id="appointmentDate"
          defaultValue={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ width: '100%' }}
        />
      </FlexContainer>
      <SlotContainer>
        {slots.map((slot) => (
          <SlotItem
            key={slot.id}
            isSelected={selectedSlot === slot.id}
            onClick={() => setSelectedSlot(slot.id)}
          >
            <Circle /> {/* Add the circle component */}
            <div style={{ fontSize: '18.5px', fontWeight: 'bold' }}>
              <p>Slot {slot.id}</p>
            </div>
            <div style={{ fontSize: '16px', color: 'black' }}>
              <p>({slot.bookings}/10)</p>
            </div>
            <div style={{ fontSize: '16px', color: 'black' }}>
              <p>{slot.time}</p>
            </div>
          </SlotItem>
        ))}
      </SlotContainer>
      <div style={{ marginBottom: '20px', width: '100%', height: '15vh' }}>
        <TextArea
          placeholder="Comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>

      <Row $contentposition="center">
        <Button
          variant="outlined"
          sx={{
            color: 'white',
            backgroundColor: '#5A9EEE',
            fontWeight: '700',
            font: 'Helvetica',
            fontSize: '15px',
            borderRadius: '12px',
            width: '125px',
            height: '45px',
            ':hover': { backgroundColor: '#5A9EEE', color: 'white' },
          }}
          onClick={handleSave}
          disabled={!isSaveEnabled}
        >
          Save
        </Button>
      </Row>
    </Container>
  );
};

export default CreateAppointment;
