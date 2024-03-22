import React from "react";
import { useNavigate } from "react-router-dom";
import "@/assets/styles/register.css";

const Terms = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="main-wrapper">
        <div className="wrapper">
          <h1>Terms and Condition</h1>
          <div className="text-justify">
            User cannot use hate or defamation against any another user or
            organization. The user shall bear full responsibility for any
            misconduct, violation of terms, or wrongful actions undertaken
            during their utilization of the service or platform. It is incumbent
            upon the user to adhere strictly to the prescribed terms of service,
            guidelines, and regulations governing their usage. Failure to comply
            with these standards may result in disciplinary measures.
            Furthermore, users may be subject to legal repercussions in
            accordance with applicable laws and regulations. The service
            provider reserves the right to enforce these measures and pursue
            appropriate action to maintain the integrity and safety of the
            platform and its community.
          </div>
          <button onClick={() => navigate("/register")}> Go Back</button>
        </div>
      </div>
    </>
  );
};

export default Terms;
