import AuthContext from '../auth/context';
import jwt_decode from 'jwt-decode';
import { useContext } from 'react';
import authSecureStorage from './authSecureStorage';
import firebase from '../Api/FirebaseDatabase';
const auth = firebase.auth;

function useAuth() {
  const { user, setUser } = useContext(AuthContext);
  const login = async (userToken) => {
    var user = jwt_decode(userToken);
    setUser({ ...user, isReady: true });
    await authSecureStorage.storeToken(userToken);
  };

  const logout = async () => {
    setUser({ isReady: true });
    authSecureStorage.removeToken();
  };

  return {
    login,
    logout,
    user,
  };
}

export default useAuth;
