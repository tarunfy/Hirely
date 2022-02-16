import React, {useEffect, useState, createContext} from 'react'
import { auth } from '../services/firebase';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    console.log(email, password);
  };

  const signup = async (email, password) => {
    setIsFetching(true);
    const response = await auth.createUserWithEmailAndPassword(email, password);
    console.log(response);
    setIsFetching(false);
  };

  return (
        <AuthContext.Provider value={{isFetching, currentUser, signup, login}}>
            {children}
        </AuthContext.Provider>
  )
}
