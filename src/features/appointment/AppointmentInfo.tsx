import { useContext, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import styled from 'styled-components';
import Row from '../../components/Row';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { DateContext } from '../../context/DateContext';
import { Button, IconButton } from '@mui/material';
import { IoClose, IoSaveOutline } from 'react-icons/io5';

const Week = styled.div`
  width: 60px;
  height: 56px;
  border-radius: 4px;
  background-color: #5a9eee;
  color: white;
  font-size: 12px;
  font-weight: 400;
`;

const WeekDays = styled.div`
  width: 220px;
  height: 56px;
  border-radius: 4px;
  border: 2px solid #4e8ad1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 380px) {
    width: 150px;
  }
`;

const SlotRemaining = styled.div`
  display: flex;
  justify-content: center;
  width: 57px;
  height: 25px;
  border-radius: 4px;
  border: 2px solid #4e8ad1;
  font-size: 12px;
  align-items: center;
`;

const PendingSlot = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 400;
  line-height: 13.8px;
  font-style: Helvetica;
  align-items: center;
  width: 57px;
  height: 25px;
  border-radius: 4px;
  border: 2px solid #4e8ad1;
  margin-top: 2px;
  font-size: 12px;
`;

const Day = styled.div<{ slotExists: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.slotExists ? '#4e8ad1' : 'none')};
  width: 5px;
  height: 54px;
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;

  @media (max-width: 330px) {
    margin-left: 2px;
    margin-right: 2px;
  }
`;

const NavigationContainer = styled.div`
  background: #5a9eee3d;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;
const responsiveButtonStyle = {
  fontSize: '12px',
  marginLeft: '2px',
  fontWeight: 600,
  minWidth: '120px',
  width: 'auto',
  maxWidth: '100%',
  borderRadius: '23px',
  height: '27px',
  backgroundColor: '#5a9eee',
  color: 'white',
  textTransform: 'none',
  ':hover': {
    color: 'white',
    backgroundColor: '#5a9eee',
  },
  '@media (max-width: 420px)': {
    fontSize: '10px',
    minWidth: '100px',
  },
};
export default function AppointmentInfo() {
  const navigate = useNavigate();
  const { selectedDate, setSelectedDate } = useContext(DateContext);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [showButtons, setShowButtons] = useState(false); // State to manage the visibility of save and cancel buttons

  const handlePreviousWeek = () => {
    if (selectedDate) {
      const prevWeek = new Date(selectedDate);
      prevWeek.setDate(prevWeek.getDate() - 7);
      setSelectedDate(prevWeek);
    }
  };

  const handleNextWeek = () => {
    if (selectedDate) {
      const nextWeek = new Date(selectedDate);
      nextWeek.setDate(nextWeek.getDate() + 7);
      setSelectedDate(nextWeek);
    }
  };

  const handleClick = (day: string, date: string, timeSlot: string) => {
    localStorage.setItem('selectedDay', day);
    localStorage.setItem('selectedDate', date);
    localStorage.setItem('selectedTime', timeSlot);
    setSelectedTimes([...selectedTimes, timeSlot]);
    navigate({ to: '/slots' });
  };

  // Function to handle the "Copy from last week" button click
  const handleCopyFromLastWeek = () => {
    // Your logic here to copy from last week
    // For demonstration purposes, we'll just toggle the visibility of the buttons
    setShowButtons(true);
  };

  const timeSlots = [
    '8:00 AM - 9:00 AM',
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
  ];
  const slots = JSON.parse(localStorage.getItem('slots') || '[]');

  // Calculate the date range for the header
  const startOfWeek = new Date(selectedDate || new Date());
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Get the first day of the week
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Get the last day of the week

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return {
      day: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
      date: new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
      }).format(date),
    };
  });

  const dateRange = `${new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(startOfWeek)} - ${new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(endOfWeek)}`;
  const buttonStyle = showButtons
    ? {
        ...responsiveButtonStyle,
        backgroundColor: '#FFFFFF',
        color: '#000000',
        fontWeight: 600,
        border: '1px solid #D9D9D9',
        fontSize: '12px',
        lineHeight: '14.52px',
        fontStyle: 'Inter',
      }
    : responsiveButtonStyle;
  return (
    <>
      <NavigationContainer>
        <IoIosArrowBack
          onClick={handlePreviousWeek}
          style={{ cursor: 'pointer' }}
        />
        <h4
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {dateRange}
        </h4>
        <IoIosArrowForward
          onClick={handleNextWeek}
          style={{ cursor: 'pointer' }}
        />
      </NavigationContainer>
      <Row type="vertical">
        <Row $contentposition={showButtons ? 'spaceBetween' : 'center'}>
          <Row
            $contentposition={showButtons ? 'left' : 'center'}
            style={{ marginLeft: 10 }}
          >
            <Button
              variant="outlined"
              sx={buttonStyle}
              onClick={handleCopyFromLastWeek}
            >
              Copy from last week
            </Button>
          </Row>
          {showButtons && (
            <ButtonContainer>
              <IconButton
                aria-label="edit"
                size="large"
                sx={{
                  color: 'black',
                  ':hover': {
                    background: 'none',
                  },
                }}
                onClick={() => console.log('Save clicked')}
              >
                <IoSaveOutline />
              </IconButton>
              <IconButton
                aria-label="edit"
                size="large"
                sx={{
                  color: 'black',
                  ':hover': {
                    background: 'none',
                  },
                }}
                onClick={() => setShowButtons(false)}
              >
                <IoClose />
              </IconButton>
            </ButtonContainer>
          )}
        </Row>
        {daysOfWeek.map((day, dayIndex) => {
          return (
            <Row type="vertical" $contentposition="center">
              <Row key={dayIndex} $contentposition="left">
                <Row $contentposition="center">
                  <Week>
                    <Row $contentposition="center" style={{ marginTop: 10 }}>
                      {day.day}
                    </Row>
                    <Row $contentposition="center">{day.date}</Row>
                  </Week>
                  <WeekDays>
                    {timeSlots.map((timeSlot, index) => {
                      const slotExists = slots.some(
                        (slot: {
                          id: number;
                          time: string;
                          people: number;
                          isDirty: boolean;
                          date: string;
                        }) => slot.date === day.date && slot.time === timeSlot
                      );

                      return (
                        !selectedTimes.includes(timeSlot) && (
                          <Day
                            key={index}
                            slotExists={slotExists}
                            onClick={() =>
                              handleClick(day.day, day.date, timeSlot)
                            }
                          />
                        )
                      );
                    })}
                  </WeekDays>
                </Row>

                <Row type="vertical" size="small">
                  <Row>
                    <SlotRemaining>S 0</SlotRemaining>
                  </Row>
                  <Row>
                    <PendingSlot>P 0</PendingSlot>
                  </Row>
                </Row>
              </Row>
            </Row>
          );
        })}
      </Row>
    </>
  );
}
