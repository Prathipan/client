import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { publicRequest } from "../../requestMethods"
import "./register.css"

const Register = () => {
    const navigate = useNavigate();
    const [userDetails,setUserDetails] = useState({
        name: "",
        email :"",
        password : "",
        cPassword : ""
    })
    const handleChange = (e) => {
         const {name,value} = e.target;
         setUserDetails((prev) => {
            return {...prev , [name]:value}
         })
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
         const res =  await publicRequest.post("/user/register",userDetails);
        //  console.log(res)
         navigate("/");
        } catch (error) {
            console.log(error)
        }
        
    }
  return (
    <div className="form-container">
        <form className="form-wrapper">
        <h2 className="formTitle">Register</h2>
            <label htmlFor="UserName">Name</label>
            <input className="form-control" name="name" type="text" id="UserName" onChange={handleChange} />
            <label htmlFor="email">Email</label>
            <input className="form-control"  name="email" type="text" id="email" onChange={handleChange} />
            <label htmlFor="password">Password</label>
            <input className="form-control" name="password"  type="password" id="password" onChange={handleChange} />
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <input className="form-control" name="cPassword" type="password" id="ConfirmPassword" onChange={handleChange} />
            <Link to="/login">Already having account ?</Link>
            <button className="btn btn-primary mt-3" onClick={handleSubmit}>Signup</button>
        </form>
    </div>
  )
}

export default Register