import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import CryptoJS from "crypto-js";
import Vector from "../../assets/login-vector.jpg";
import "./register.css";
import * as yup from "yup";
import { useFormik } from "formik";

const Register = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const formValidation = yup.object({
    name: yup
      .string()
      .required("*Name field is required")
      .min(5, "Name should be 6 chars minimum."),
    email: yup
      .string()
      .required("*Email field is required")
      .min(5, "Email should be 6 chars minimum."),
    password: yup
      .string()
      .required("*Password field required")
      .min(6, "Password is too short - should be 6 chars minimum."),
    cPassword: yup
      .string()
      .required("*confirm Password field required")
      .min(6, "Password is too short - should be 6 chars minimum."),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cPassword: "",
    },
    validationSchema: formValidation,
    onSubmit: async (userDetails) => {
      // console.log(userDetails);
      const hashed_password = CryptoJS.AES.encrypt(
        JSON.stringify(userDetails.password),
        "prathipan24p"
      ).toString();
      userDetails.password = hashed_password;
      userDetails.cPassword = hashed_password;
      try {
        const res = await publicRequest.post("/user/register", userDetails);
        //  console.log(res)
        setMsg("Email sent for verification");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-left">
          <h2 className="formTitle">Register</h2>
          <form className="login-form" onSubmit={formik.handleSubmit}>
            <label htmlFor="UserName">Name</label>
            <input
              className="form-control"
              name="name"
              type="text"
              id="UserName"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && formik.errors.name}
            />
            <span style={{ color: "red" }}>
              {formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""}
            </span>
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              name="email"
              type="text"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
            />
            <span style={{ color: "red" }}>
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""}
            </span>
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              name="password"
              type="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password}
            />
            <span style={{ color: "red" }}>
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""}
            </span>
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <input
              className="form-control"
              name="cPassword"
              type="password"
              id="ConfirmPassword"
              value={formik.values.cPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.cPassword && formik.errors.cPassword}
            />
            <span style={{ color: "red" }}>
              {formik.touched.cPassword && formik.errors.cPassword
                ? formik.errors.cPassword
                : ""}
            </span>
            <Link to="/" className="link">
              Already having account ?
            </Link>
            {msg ? <span className="email-success">{msg}</span> : <></>}
            <button className="btn btn-primary mt-3" type="submit">
              Signup
            </button>
          </form>
        </div>
        <div className="login-right">
          <h2>Register here</h2>
          <img src={Vector} className="vector-image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Register;
