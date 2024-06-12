import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { format } from 'date-fns';
import styled from 'styled-components';
import Row from '../../components/Row';
import CopySlots from './CopySlots';
import SlotCard from './SlotCard';
import CustomizedSwitch from './CustomHolidaySwitch';

const NavigationContainer = styled.div`
  background: #5a9eee3d;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Slots() {
  const [isHoliday, setIsHoliday] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  const [slots, setSlots] = useState([
    {
      id: 1,
      time: '',
      people: 1,
      isDirty: true,
      date: '',
    },
  ]);

  useEffect(() => {
    const selectedDate = localStorage.getItem('selectedDate');
    const currentYear = new Date().getFullYear();
    const dateWithYear = `${selectedDate} ${currentYear}`;

    const newFormattedDate = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(dateWithYear));
    setFormattedDate(newFormattedDate);
  }, []);

  const handleHolidayChange = () => {
    setIsHoliday(!isHoliday);
  };

  const handleTimeChange = (id: number, newTime: string) => {
    setSlots(
      slots.map((slot) =>
        slot.id === id ? { ...slot, time: newTime, isDirty: true } : slot
      )
    );
  };

  const handlePeopleChange = (id: number, newPeople: number) => {
    setSlots(
      slots.map((slot) =>
        slot.id === id ? { ...slot, people: newPeople, isDirty: true } : slot
      )
    );
  };

  const saveSlot = (id: number) => {
    setSlots(
      slots.map((slot) =>
        slot.id === id
          ? {
              ...slot,
              isDirty: false,
              date: format(new Date(formattedDate), 'd MMM'),
            }
          : slot
      )
    );
  };

  const handleDeleteSlot = (id: number) => {
    if (slots.length > 1) {
      setSlots(slots.filter((slot) => slot.id !== id));
    } else {
      setSlots([
        {
          id: 1,
          time: '',
          people: 1,
          isDirty: true,
          date: '',
        },
      ]);
    }
  };
  function addSlot() {
    const lastSlot = slots[slots.length - 1];
    if (lastSlot.time && lastSlot.people && !lastSlot.isDirty) {
      const newSlot = {
        id: slots.length + 1,
        time: '',
        people: 1,
        isDirty: true,
        date: format(new Date(formattedDate), 'd MMM'),
      };
      const newSlots = [...slots, newSlot];
      setSlots(newSlots);
      localStorage.setItem('slots', JSON.stringify(newSlots));
    }
  }

  const handleNextDay = () => {
    const currentDate = new Date(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
    const newFormattedDate = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(currentDate);
    setFormattedDate(newFormattedDate);
  };

  const handlePreviousDay = () => {
    const currentDate = new Date(formattedDate);
    currentDate.setDate(currentDate.getDate() - 1);
    const newFormattedDate = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(currentDate);
    setFormattedDate(newFormattedDate);
  };

  return (
    <>
      <NavigationContainer>
        <IoIosArrowBack
          onClick={handlePreviousDay}
          style={{ cursor: 'pointer' }}
        />
        <h4
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {formattedDate}
        </h4>
        <IoIosArrowForward
          onClick={handleNextDay}
          style={{ cursor: 'pointer' }}
        />
      </NavigationContainer>
      <Row type="vertical">
        <Row $contentposition="left" style={{ marginLeft: 10 }}>
          <Row style={{fontWeight:600,fontSize:'18px',marginLeft:25}}>
           Holiday  <CustomizedSwitch onChange={handleHolidayChange} />
          </Row>
        </Row>
        <CopySlots />

        {!isHoliday && (
          <>
            {slots.map((slot) => (
              <SlotCard
                slot={slot}
                slots={slots}
                handleTimeChange={handleTimeChange}
                handlePeopleChange={handlePeopleChange}
                saveSlot={saveSlot}
                handleDeleteSlot={handleDeleteSlot}
              />
            ))}
          </>
        )}
        <Row $contentposition="center">
          {!isHoliday && slots.length < 9 && (
            <Button
              variant="outlined"
              sx={{
                color: 'white',
                backgroundColor: '#5A9EEE',
                fontWeight: '400',
                font: 'Helvetica',
                fontSize: '15px',
                borderRadius: '12px',
                width: '125px',
                height: '45px',
                ':hover': { backgroundColor: '#5A9EEE', color: 'white' },
              }}
              onClick={addSlot}
            >
              Add
            </Button>
          )}
        </Row>
      </Row>
    </>
  );
}
