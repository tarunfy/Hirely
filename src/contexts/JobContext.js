import React, { useState, createContext } from "react";
import { db } from "../services/firebase";

export const JobContext = createContext(null);

export const JobProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [isFetchingJobs, setIsFetchingJobs] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState(null);

  const addJobDetails = async (data) => {
    setIsLoading(true);
    try {
      await db.collection("jobs").add(data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const fetchJobs = async (userId) => {
    setIsFetchingJobs(true);
    try {
      const snapshot = await db
        .collection("jobs")
        .where("userId", "==", userId)
        .orderBy("createdAt")
        .get();
      if (snapshot.docs.length > 0) {
        setError("");
        let jobs = [];
        snapshot.docs.forEach((job) => {
          jobs.push({ ...job.data(), jobId: job.id });
        });
        setJobs(jobs);
      } else {
        setError("Please add a new job posting.");
        setJobs(null);
      }
    } catch (err) {
      console.log(err);
    }
    setIsFetchingJobs(false);
  };

  const removeJob = async (docId) => {
    setIsLoading(true);
    try {
      await db.collection("jobs").doc(docId).delete();
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const updateJob = async (docId, details) => {
    setIsLoading(true);
    try {
      await db.collection("jobs").doc(docId).update(details);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const fetchJob = async (docId) => {
    let data = null;
    try {
      const doc = await db.collection("jobs").doc(docId).get();
      data = doc.data();
    } catch (err) {
      console.log(err);
    }
    return data;
  };

  const addInterests = async (interests, currentUser) => {
    setIsLoading(true);
    try {
      await db.collection("users").doc(currentUser.userId).set(
        {
          interests,
        },
        { merge: true }
      );
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <JobContext.Provider
      value={{
        fetchJobs,
        addJobDetails,
        isFetchingJobs,
        addInterests,
        isLoading,
        jobs,
        removeJob,
        updateJob,
        fetchJob,
        setJobs,
        error,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
