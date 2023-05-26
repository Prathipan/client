import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../redux/apiCalls";
import CryptoJS from "crypto-js";
import Vector from "../../assets/login-vector.jpg";
import "./register.css";
import * as yup from "yup";
import { useFormik } from "formik";

const Login = () => {
  const loading = useSelector((state) => state.user.isFetching);
  const dispatch = useDispatch();
  const formValidationSchema = yup.object({
    email: yup.string().required("*Email field required").min(5),
    password: yup
      .string()
      .required("*Password field required")
      .min(6, "Password is too short - should be 6 chars minimum.")
  });

  const formik = useFormik({
    initialValues : {
      email : "",
      password : ""
    },
    validationSchema : formValidationSchema,
    onSubmit : (loginDetails) => {
      // console.log(loginDetails)
      const hashed_password = CryptoJS.AES.encrypt(
            JSON.stringify(loginDetails.password),
            "prathipan24p"
          ).toString();
          loginDetails.password = hashed_password;
          login(dispatch, loginDetails);
    }
  })
  
  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-right">
          <h2>Welcome to Money Manager</h2>
          <img src={Vector} className="vector-image" alt="" />
        </div>
        <div className="login-left">
          <h2 className="formTitle">Login</h2>
          <form className="login-form" onSubmit={formik.handleSubmit}>
            <div className="credentials">
              <span>Email : testUser@gmail.com</span>
              <span>Password : 123456</span>
            </div>
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              id="email"
              name="email"
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error = {formik.touched.email && formik.errors.email}
            />
            <span style={{color : "red"}}>{formik.touched.email && formik.errors.email ? formik.errors.email : ""}</span>
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error = {formik.touched.password && formik.errors.password}
            />
            <span style={{color : "red"}}>{formik.touched.password && formik.errors.password ? formik.errors.password : ""}</span>
            <Link to="/register" className="link">
              Don't have an account?
            </Link>
            <button className="btn btn-primary mt-3" type="submit">
              {loading ? (
                <div className="spinner-border" role="status">
                  <span class="sr-only"></span>
                </div>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
