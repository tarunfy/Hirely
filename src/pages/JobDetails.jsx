import React from "react";

const JobDetails = ({ match }) => {
  console.log(match.params.jobId);
  return <div>JobDetails</div>;
};

export default JobDetails;
