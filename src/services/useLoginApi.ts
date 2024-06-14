import * as Realm from 'realm-web';
import { useNavigate } from '@tanstack/react-router';
import { app } from '../constants';
import { searchDoctors } from './realmServices';
import { useEffect, useState } from 'react';

export const useLoginApi = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any[]>([]);
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  
  const login = async (apiKey: string) => {
    console.log('apiKey', apiKey);

    const credentials = Realm.Credentials.apiKey(apiKey);
    try {
      const users = await app.logIn(credentials);
      const data = await searchDoctors(users.id);
      console.log('data', data);
      // update userData with setUserData
      if (data === null) return;
      if (data.length > 0) {
        setUserData(data);
        localStorage.setItem('userid', 'true');
        navigate({ to: '/appointments' });
      }
    } catch (error) {
      console.error('Failed to log in', error);
    }
  };

  return { login, userData };
};
