// SearchResults.tsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from '@tanstack/react-router';
import styled from 'styled-components';
// import UserAvatar from './UserAvatar';
import Row from './Row';
import { Button } from '@mui/material';
import { searchUser } from '../services/realmServices';

const Container = styled.div`
  padding: 20px;
`;

const NoResults = styled.div`
  text-align: center;
  color: #555;
  margin-top: 20px;
  font-size: 15px;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 600px) {
    & > button {
      width: 110%;
    }
  }
  @media (max-width: 360px) {
    & > button {
      width: 110%;
    }
  }
`;

export interface Item {
  id: number;
  text: {
    Token: string;
    Slot: string | JSX.Element;
  };
}

// const initialItems: Item[] = [
//   {
//     id: 1,
//     text: {
//       Token: 'Token No: 1',
//       Slot: <UserAvatar />,
//     },
//   },
// ];


const SearchResults: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';
  const [results, setResults] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleNewContact = () => {
    navigate({ to: '/newContacts' });
  };

  useEffect(() => {
   
   
    // Simulate an API call
    const fetchData = async () => {
      setIsLoading(true);
      const data = await searchUser(query);
      if(data === null) return; 
      console.log('❤️❤️', data);
      // Replace this with actual API call

      const response = data[0];
      setResults(response);
      console.log('🚀🚀🚀🚀',data[0].name);
      
      setIsLoading(false);
    };

    fetchData();
  }, [query]);

  return (
    <Container>
      {isLoading ? (
        <p>Loading...</p>
      ) : 
      results.length > 0 ? (
        results.map((result) => (
          <Row $contentposition="left" key={result.id}>
            <p>{result.text.Slot}</p>
          </Row>
        ))
      ) : (
        <Row type="vertical">
          <Row $contentposition="center">
            <NoResults>No search results found {query} </NoResults>
          </Row>
          <Row type="vertical" $contentposition="center">
            <Row onClick={handleNewContact}>
              <ButtonContainer>
                <Button
                  variant="outlined"
                  sx={{
                    color: 'black',
                    maxWidth: '308px',
                    width: '100%',
                    height: '44px',
                    padding: '14px, 8px, 14px, 8px',
                    gap: '10px',
                    borderRadius: '12px',
                    border: '1px solid rgba(90, 158, 238, 1)',
                  }}
                  onClick={handleNewContact}
                >
                  New Contact name as "{query}"
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: 'black',
                    maxWidth: '308px',
                    width: '100%',
                    height: '44px',
                    padding: '14px, 8px, 14px, 8px',
                    gap: '10px',
                    borderRadius: '12px',
                    border: '1px solid rgba(90, 158, 238, 1)',
                  }}
                  onClick={handleNewContact}
                >
                  New Contact phone as "+91 9736372721"
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: 'rgba(90, 158, 238, 1)',
                    color: 'white',
                    maxWidth: '308px',
                    width: '100%',
                    height: '45px',
                    borderRadius: '12px',
                    font: 'Helvetica',
                    fontWeight: '700',
                    textAlign: 'center',
                    lineHeight: '16.1px',
                    ':hover': {
                      color: 'rgba(90, 158, 238, 1)',
                    },
                  }}
                  onClick={handleNewContact}
                >
                  New Contact
                </Button>
              </ButtonContainer>
            </Row>
          </Row>
        </Row>
      )}
    </Container>
  );
};

export default SearchResults;
