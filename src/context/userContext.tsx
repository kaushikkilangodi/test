// src/context/userContext.ts
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { User } from '../services/types'; // Import the User type
import { searchDoctors } from '../services/realmServices';
import { app } from '../utils/constants';
import * as Realm from 'realm-web';

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const apiKey = localStorage.getItem('userid') || '';
      if (apiKey.length > 0) {
        // const apiKey = userIds[0]; // Assuming the first element is the API key or user ID
        const credentials = Realm.Credentials.apiKey(apiKey);
        try {
          const realmUser = await app.logIn(credentials);
          const data = await searchDoctors(realmUser.id);
          if (data === null) return;
          const user: User = {
            ...data[0],
          };
          setUser(user);

          console.log('😍😍😍', user);
        } catch (error) {
          console.error('Failed to fetch user data', error);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
