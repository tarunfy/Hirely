import { useDeprecatedInvertedScale } from "framer-motion";
import React, { useEffect, useState, createContext } from "react";
import { auth, db } from "../services/firebase";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setCurrentUser(null);
      }
      const snapshot = await db.collection("users").doc(user.uid).get();
      setCurrentUser(snapshot.data());
    });
    setIsLoading(false);
  }, []);

  const signup = async (email, password, userInfo) => {
    setIsFetching(true);
    try {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (userInfo.role === "Recruiter") {
        const user = await db.collection("users").doc(response.user.uid).set({
          userId: response.user.uid,
          role: userInfo.role,
          fullName: userInfo.fullName,
          company: userInfo.company,
          designation: userInfo.designation,
          phoneNumber: userInfo.phoneNumber,
        });
        setIsFetching(false);
      } else {
        const user = await db.collection("users").doc(response.user.uid).set({
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
    } catch (err) {
      setError(err.message);
      setIsFetching(false);
      return;
    }
  };

  const login = async (email, password) => {
    setIsFetching(true);
    try {
      const response = await auth.signInWithEmailAndPassword(email, password);
      setIsFetching(false);
      return;
    } catch (err) {
      setError(err.message);
      setIsFetching(false);
      return;
    }
  };

  const addDetails = async (docId, data) => {
    setIsFetching(true);
    try {
      await db
        .collection("users")
        .doc(docId)
        .set(
          {
            workDetails: {
              ...data,
              skills: data.skills.split(","),
            },
          },
          { merge: true }
        );
    } catch (err) {
      console.log(err);
    }
    setIsFetching(false);
  };

  const getCurrentUser = async () => {
    setIsFetching(true);
    try {
      const userRef = await db
        .collection("users")
        .doc(currentUser.userId)
        .get();
      setCurrentUser(userRef.data());
    } catch (err) {
      console.log(err);
    }
    setIsFetching(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isFetching,
        currentUser,
        signup,
        login,
        error,
        setError,
        isLoading,
        setIsLoading,
        addDetails,
        getCurrentUser,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
