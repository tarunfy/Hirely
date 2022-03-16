import React, { useEffect, useState, createContext, useContext } from "react";
import { auth, db } from "../services/firebase";
import { JobContext } from "./JobContext";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // const [isFetching, setIsFetching] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setJobs } = useContext(JobContext);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const snapshot = await db.collection("users").doc(user.uid).get();
        setCurrentUser(snapshot.data());
      } else {
        setCurrentUser(null);
      }
      setFetchingUser(false);
    });
  }, []);

  const signup = async (email, password, userInfo) => {
    setIsLoading(true);
    try {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (userInfo.role === "Recruiter") {
        await db.collection("users").doc(response.user.uid).set({
          userId: response.user.uid,
          role: userInfo.role,
          fullName: userInfo.fullName,
          company: userInfo.company,
          designation: userInfo.designation,
          phoneNumber: userInfo.phoneNumber,
        });
      } else {
        await db.collection("users").doc(response.user.uid).set({
          userId: response.user.uid,
          role: userInfo.role,
          fullName: userInfo.fullName,
          gender: userInfo.gender,
          experienceLevel: userInfo.experienceLevel,
          dob: userInfo.dob,
          phoneNumber: userInfo.phoneNumber,
        });
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const addWorkDetails = async (docId, data) => {
    setIsLoading(true);
    try {
      await db
        .collection("users")
        .doc(docId)
        .set(
          {
            details: {
              ...data,
              skills: data.skills.split(","),
            },
          },
          { merge: true }
        );
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const updateCurrentUser = async () => {
    setIsLoading(true);
    try {
      const res = await db.collection("users").doc(currentUser.userId).get();
      if (res.exists) {
        setCurrentUser(res.data());
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const logout = () => {
    auth.signOut();
    setJobs(null);
  };

  return (
    <AuthContext.Provider
      value={{
        // isFetching,
        currentUser,
        setCurrentUser,
        signup,
        login,
        error,
        setError,
        isLoading,
        setIsLoading,
        addWorkDetails,
        updateCurrentUser,
        logout,
      }}
    >
      {!fetchingUser && children}
    </AuthContext.Provider>
  );
};
