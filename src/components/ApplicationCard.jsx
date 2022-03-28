import React, { useState, useContext, useEffect } from "react";
import { JobContext } from "../contexts/JobContext";
import Spinner from "./Spinner";

const ApplicationCard = ({ applicantId }) => {
  const [applicantDetails, setApplicantDetails] = useState(null);

  const { fetchApplicant, isLoading } = useContext(JobContext);

  useEffect(() => {
    async function getApplicant() {
      const details = await fetchApplicant(applicantId);
      setApplicantDetails(details);
    }
    getApplicant();
  }, []);

  if (isLoading) return <Spinner />;

  return <div></div>;
};

export default ApplicationCard;
