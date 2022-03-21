import React, { useState, createContext, useContext } from "react";
import { db, FieldValue } from "../services/firebase";
import { AuthContext } from "./AuthContext";

export const JobContext = createContext(null);

export const JobProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [isFetchingJobs, setIsFetchingJobs] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState(null);

  const { currentUser } = useContext(AuthContext);

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

  const addInterests = async (interests) => {
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

  const fetchAllJobs = async () => {
    setIsFetchingJobs(true);
    let allJobs = [];
    try {
      const snapshot = await db.collection("jobs").get();
      if (snapshot.docs.length > 0) {
        allJobs = snapshot.docs
          .map((doc) => ({ ...doc.data(), jobId: doc.id }))
          .filter((doc) => {
            for (let i = 0; i < doc.applications.length; i++) {
              if (doc.applications[i].userId === currentUser.userId) {
                return false;
              }
            }
            return true;
          });
      }
    } catch (err) {
      console.log(err);
    }
    setIsFetchingJobs(false);
    return allJobs;
  };

  const fetchInterestedJobs = async (interest) => {
    setIsFetchingJobs(true);
    let jobs = [];
    try {
      const snapshot = await db
        .collection("jobs")
        .where("jobTags", "array-contains", interest)
        .get();
      if (snapshot.docs.length > 0) {
        jobs = snapshot.docs
          .map((doc) => ({ ...doc.data(), jobId: doc.id }))
          .filter((doc) => {
            for (let i = 0; i < doc.applications.length; i++) {
              if (doc.applications[i].userId === currentUser.userId) {
                return false;
              }
            }
            return true;
          });
      }
    } catch (err) {
      console.log(err);
    }
    setIsFetchingJobs(false);
    return jobs;
  };

  const applyJob = async (jobId) => {
    setIsLoading(true);
    try {
      await db
        .collection("jobs")
        .doc(jobId)
        .update({
          applications: new FieldValue.arrayUnion({
            userId: currentUser.userId,
            appliedOn: Date.now(),
          }),
        });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const fetchAppliedJobs = async () => {
    setIsFetchingJobs(true);
    let appliedJobs = [];
    try {
      const snapshot = await db.collection("jobs").get();
      if (snapshot.docs.length > 0) {
        appliedJobs = snapshot.docs
          .map((doc) => ({ ...doc.data(), jobId: doc.id }))
          .filter((doc) => {
            for (let i = 0; i < doc.applications.length; i++) {
              if (doc.applications[i].userId === currentUser.userId) {
                return true;
              }
            }
            return false;
          });
      }
    } catch (err) {
      console.log(err);
    }
    setIsFetchingJobs(false);
    return appliedJobs;
  };

  return (
    <JobContext.Provider
      value={{
        fetchJobs,
        fetchAppliedJobs,
        applyJob,
        addJobDetails,
        isFetchingJobs,
        addInterests,
        fetchInterestedJobs,
        isLoading,
        jobs,
        removeJob,
        updateJob,
        fetchJob,
        setJobs,
        fetchAllJobs,
        error,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
