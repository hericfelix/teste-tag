import { createContext, ReactNode, useContext, useState } from 'react';

import { toast } from 'react-toastify';
import { UserData } from '../../ts/interfaces';
import api from '../../services';
import { useNavigate } from 'react-router';

interface LoginProps {
  children: ReactNode;
}

interface LoginContextData {
  token: string;
  signIn: (userData: UserData) => void;
  logout: () => void;
}

const LoginContext = createContext<LoginContextData>({} as LoginContextData);

export const LoginProvider = ({ children }: LoginProps) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(
    () => localStorage.getItem('@Tag:token') || ''
  );

  const signIn = (userData: UserData) => {
    api
      .post('/login', userData)
      .then((response) => {
        toast.success(`Welcome!`);
        localStorage.setItem('@Tag:token', response.data.token);

        setToken(response.data.token);

        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Invalid credentials');
      });
  };

  const logout = () => {
    localStorage.clear();
    setToken('');
    navigate('/login');
  };

  return (
    <LoginContext.Provider value={{ token, signIn, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
