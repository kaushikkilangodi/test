import { useContext, useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
import Row from '../../components/Row';
import AppointmentAvatar from '../../components/AppointmentAvatar';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import SwipeElement from './SwipeElement';
import FixedAddButton from '../../components/FixedAddButton';
import { DateContext } from '../../context/DateContext';
import Modal from '../../components/Modal';
import Calendar from '../../components/Calendar';

interface Item {
  id: number;
  text: {
    Token: string;
    Slot: string;
    Time: string;
  };
}

const initialItems: Item[] = [
  {
    id: 1,
    text: {
      Token: 'Token No: 1',
      Slot: 'Slot No: 1',
      Time: '10:00 AM',
    },
  },
  {
    id: 2,
    text: {
      Token: 'Token No: 1',
      Slot: 'Slot No: 1',
      Time: '11:00 AM',
    },
  },
  {
    id: 3,
    text: {
      Token: 'Token No: 1',
      Slot: 'Slot No: 1',
      Time: '12:00 AM',
    },
  },
  {
    id: 4,
    text: {
      Token: 'Token No: 1',
      Slot: 'Slot No: 1',
      Time: '10:00 AM',
    },
  },
  {
    id: 6,
    text: {
      Token: 'Token No: 1',
      Slot: 'Slot No: 1',
      Time: '11:00 AM',
    },
  },
  {
    id: 7,
    text: {
      Token: 'Token No: 1',
      Slot: 'Slot No: 1',
      Time: '12:00 AM',
    },
  },
];

const StyledDate = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #000;
  margin-right: 10px;
`;

const Count = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  background-color: #5a9eee;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;



export default function AppointmentLayout() {
  const navigate = useNavigate();
  const { selectedDate, setSelectedDate } = useContext(DateContext);

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(new Date());
    }
  }, [selectedDate, setSelectedDate]);

  const formattedSelectedDate = selectedDate
    ? `${selectedDate.getDate()} ${selectedDate.toLocaleString('default', {
        month: 'short',
      })} ${selectedDate.getFullYear()}`
    : '';
  const [items, setItems] = useState(initialItems);
  const hasItems = !!items.length;

  const handleDelete = (index: number) => {
    const updatedItems = items.filter(({ id }) => id !== index);
    setItems(updatedItems);
  };

  const handleSave = (index: number) => {
    const updatedItems = items.filter(({ id }) => id !== index);
    setItems(updatedItems);
    console.log(`Item ${index} saved`);
  };
  const handleClick = () => {
    navigate({ to: '/contacts' });
  };
  // const handleSelectCalendar = () =>{
  //   navigate('/calendar');
  // }

  return (
    <>
      <Row type="vertical" style={{ marginLeft: 10 }}>
        <Row>
          <Row $contentposition="left">
            <Button
              variant="outlined"
              sx={{
                width: '97px',
                borderRadius: '23px',
                height: '40px',
                backgroundColor: '#5a9eee',
                color: 'white',
                ':hover': {
                  color: 'white',
                  backgroundColor: '#5a9eee',
                },
              }}
            >
              Upcoming
            </Button>
            <Button
              variant="outlined"
              sx={{
                width: '97px',
                borderRadius: '23px',
                height: '40px',
                backgroundColor: '#5a9eee',
                color: 'white',
                ':hover': {
                  color: 'white',
                  backgroundColor: '#5a9eee',
                },
              }}
            >
              Past
            </Button>
          </Row>
          <Modal>
            <Modal.Open opens="calendar">
              <Row $contentposition="right">
                <Button
                  variant="outlined"
                  sx={{
                    color: 'white',
                    backgroundColor: '#5a9eee',
                    borderRadius: '20%',
                    width: '45px',
                    height: '40px',
                    ':hover': {
                      color: 'white',
                      backgroundColor: '#5a9eee',
                    },
                  }}
                >
                  <EventAvailableOutlinedIcon />
                </Button>
              </Row>
            </Modal.Open>
            <Modal.Window name="calendar">
              <Calendar />
            </Modal.Window>
          </Modal>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <StyledDate>{formattedSelectedDate}</StyledDate>
          <Row $contentposition="right">
            <Count>2</Count>
          </Row>
        </Row>
        <Row type="vertical" style={{ background: '', marginRight: 10 }}>
          {hasItems && (
              <AnimatePresence>

                {items.map((item) => (
                  <SwipeElement
                    key={item.id}
                    additionalContent={<AppointmentAvatar data={item.text} />}
                    onDelete={() => handleDelete(item.id)}
                    onSave={() => handleSave(item.id)}
                  />
                ))}
              </AnimatePresence>
          )}
        </Row>
      </Row>
      <FixedAddButton onClick={handleClick} />
    </>
  );
}
