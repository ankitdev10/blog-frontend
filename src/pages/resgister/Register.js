import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../axiosInstance";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr]= useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErr(false)
    try {
      const res = await axiosInstance.post("/auth/register", {
        username,
        email,
        password
      })
      res.data && window.location.replace("/login")
    e.target.reset()
    } catch (error) {
      console.log("Error while registering user "+ error)
      setErr(true)
    }
  } 
  return (
    <div className="register">
      <span className="registertitle">Register</span>
      <form className="registerform" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerinput"
          type="text"
          placeholder="Your name"
          onChange = {e=> setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          className="registerinput"
          type="email"
          placeholder="your@mail.com"
          onChange = {e=> setEmail(e.target.value)}

        />
        <label>Password</label>
        <input
          className="registerinput"
          type="password"
          placeholder="Password"
          onChange = {e=> setPassword(e.target.value)}

        />
        <button className="registerbtn" type="submit">Register</button>
        <button className="registerloginbtn"><Link className="link" to ="/login">Login</Link></button>
      </form>
      <span style = {{marginTop: 16 + "px", color: "red"}}>{err && "Can not register. Please try again with unique username"}</span>

    </div>
  );
}
