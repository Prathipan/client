import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import "./emailVerif.css";

const EmailVerify = () => {
  const params = useParams();
  useEffect(() => {
    console.log("called")
    verifyEmail();
  },[]);
  const verifyEmail = async () => {
    try {
      const data = publicRequest.get(`/user/${params.id}/verify/${params.token}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="success-container">
      <div className="success-card">
        <div
          style={{
            bordeRadius: "200px",
            height: "200px",
            width: "200px",
            background: " #F8FAF5",
            margin: "0 auto",
          }}
        >
          <i className="checkmark">✓</i>
        </div>
        <h1 className="success">Success</h1>
        <p className="success-text">
          Email Successfully Verified
          <br /> Please Login!
        </p>
      </div>
    </div>
  )
};

export default EmailVerify;
