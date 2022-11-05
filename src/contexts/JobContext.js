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
    let error = "";
    try {
      await db.collection("jobs").add(data);
    } catch (err) {
      error = err.message;
    }
    setIsLoading(false);
    return {
      error,
    };
  };

  const fetchJobs = async (userId) => {
    setIsFetchingJobs(true);
    let error = "";
    try {
      const snapshot = await db
        .collection("jobs")
        .where("userId", "==", userId)
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
      error = err.message;
    }
    setIsFetchingJobs(false);
    return {
      error,
    };
  };

  const removeJob = async (docId) => {
    setIsLoading(true);
    let error = "";
    try {
      await db.collection("jobs").doc(docId).delete();
    } catch (err) {
      error = err.message;
    }
    setIsLoading(false);
    return {
      error,
    };
  };

  const updateJob = async (docId, details) => {
    setIsLoading(true);
    let error = "";
    try {
      await db
        .collection("jobs")
        .doc(docId)
        .update({ ...details, jobId: docId });
    } catch (err) {
      error = err.message;
    }
    setIsLoading(false);
    return {
      error,
    };
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
            status: "Pending",
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

  const fetchApplicant = async (applicantId) => {
    setIsLoading(true);
    let data = null;
    try {
      const res = await db.collection("users").doc(applicantId).get();
      data = res.data();
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
    return data;
  };

  const updateApplicationStatus = async (details, jobId) => {
    setIsLoading(true);
    try {
      await db.collection("jobs").doc(jobId).update(details);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const fetchJobDetails = async (docId) => {
    setIsFetchingJobs(true);
    let data = null;
    try {
      const doc = await db.collection("jobs").doc(docId).get();
      data = doc.data();
    } catch (err) {
      console.log(err);
    }
    setIsFetchingJobs(false);
    return data;
  };

  return (
    <JobContext.Provider
      value={{
        fetchJobs,
        fetchAppliedJobs,
        fetchApplicant,
        updateApplicationStatus,
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
        fetchJobDetails,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
