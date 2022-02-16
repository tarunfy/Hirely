import React, {useEffect, useState, createContext} from 'react'
import { auth, db } from '../services/firebase';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  auth.onAuthStateChanged(async (user)=>{
    if(!user){
      setCurrentUser(null);
    };
    const snapshot = await db.collection('users').where('userId', '==', user.uid).get();
    snapshot.docs.forEach(doc=>{
      setCurrentUser(doc.data());
    });
  });

  const signup = async (email, password, userInfo) => {
    setIsFetching(true);
    try{
      const response = await auth.createUserWithEmailAndPassword(email, password);
      if(userInfo.role === "Recruiter"){
        const user = await db.collection('users').add({
          userId: response.user.uid,
          role: userInfo.role,
          fullName: userInfo.fullName,
          company: userInfo.company,
          designation: userInfo.designation,
          phoneNumber: userInfo.phoneNumber,
        });
        setIsFetching(false);
      }else{
        const user = await db.collection('users').add({
          userId: response.user.uid,
          role: userInfo.role,
          fullName: userInfo.fullName,
          gender: userInfo.gender,
          experienceLevel: userInfo.experienceLevel,
          dob: userInfo.dob,
          phoneNumber: userInfo.phoneNumber,
        });
        setIsFetching(false);
      }   
    }catch(err){
      console.log(err.message);
      setIsFetching(false);
      return;
    };
  };

  const login = async (email, password) => {
      setIsFetching(true);
      try{
        const response = await auth.signInWithEmailAndPassword(email, password);
        console.log('logged in', response.user);
        setIsFetching(false);
      }catch(err){
        console.log(err.message)
        setIsFetching(false);
        return;
      };
  };

  return (
        <AuthContext.Provider value={{isFetching, currentUser, signup, login}}>
            {children}
        </AuthContext.Provider>
  )
}
