import React, { useState, createContext } from "react";
import { db } from "../services/firebase";

export const JobContext = createContext(null);

export const JobProvider = ({ children }) => {
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
    let jobExists;
    try {
      const snapshot = await db
        .collection("jobs")
        .where("userId", "==", userId)
        .orderBy("createdAt")
        .get();
      if (snapshot.docs.length > 0) {
        jobExists = true;
        let jobs = [];
        snapshot.docs.forEach((job) => {
          jobs.push({ ...job.data(), jobId: job.id });
        });
        setJobs(jobs);
      } else {
        jobExists = false;
        setJobs(null);
      }
    } catch (err) {
      console.log(err);
    }
    setIsFetchingJobs(false);
    return jobExists;
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

  return (
    <JobContext.Provider
      value={{
        fetchJobs,
        addJobDetails,
        isFetchingJobs,
        isLoading,
        jobs,
        removeJob,
        updateJob,
        setJobs,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
