import React, { useState, useEffect } from 'react';
import authSecureStorage from '../auth/authSecureStorage';

export const AuthContext = React.createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    console.log('useEffect called 111');
    const getUserFromCache = async () => {
      const user = await authSecureStorage.getUser();
      console.log(user, '222');
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    };
    getUserFromCache();
  }, []);

  console.log(user, '000');

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
