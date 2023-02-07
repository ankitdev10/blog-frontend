import "./setting.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { axiosInstance } from "../../axiosInstance";


export default function Setting() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passowrd, setPassword] = useState("");
  const [updated, setUpdated] = useState(false);
  const PF = "https://blog-api-c8cy.onrender.com/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "UPDATE_START"})
    const updatedUser = {
      userId: user._id,
      username,
      email,
      passowrd,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePicture = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (error) {}
    }

    try {
     const res =  await axiosInstance.put("/users/" + user._id, updatedUser);
      setUpdated(true);
    dispatch({type: "UPDATE_SUCCESS", payload: res.data})

    } catch (error) {
    dispatch({type: "UPDATE_FAILURE"})

    }
  };

  return (
    <div className="settings">
      <div className="settingswrapper">
        <div className="settingstitle">
          <span className="settingsupdatetitle">Update your account</span>
          <span className="settingsdeletetitle">Delete your account</span>
        </div>
        <form className="settingsform" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img src={file ? URL.createObjectURL(file) : user.profilePicture ? PF+user.profilePicture : "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/profile-design-template-4c23db68ba79c4186fbd258aa06f48b3_screen.jpg?ts=1581063859"} alt="" />
            <input
              style={{ display: "none" }}
              type="file"
              id="fileinput"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="fileinput">
              <i className="settingsPPicon fa-regular fa-user"></i>
            </label>
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingssubmit">Update</button>
          {updated && <span style= {{color: "green", textAlign: "center"}}>Profile updated sucessfully</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
