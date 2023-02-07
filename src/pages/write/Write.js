import "./write.css";
import { useContext, useState } from "react";

import { Context } from "../../context/Context";
import { axiosInstance } from "../../axiosInstance";

export default function Write() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      description,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (error) {}
    }

      try {
        const res = await axiosInstance.post("/posts", newPost);
        window.location.replace("/post/" + res.data._id);
      } catch (error) {}
  };
  return (
    <div className="write">
      {file && (
        <img className="writeimg" src={URL.createObjectURL(file)} alt="" />
      )}

      <form className="writeform" onSubmit={handleSubmit}>
        <div className="writeformgroup">
          <input style={{ display: "none" }} type="file" id="fileinput" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="fileinput">
            <i class="writeicon fa-solid fa-image"></i>
          </label>
          <input
            type="text"
            placeholder="Title"
            className="writeinput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeformgroup">
          <textarea
            placeholder="Share your story..."
            type="text"
            className="writeinput writetext"
            onChange={(e) => setDescription(e.target.value)}
            
          ></textarea>
        </div>
        <button className="writesubmit" type="submit">
          Post
        </button>
      </form>
    </div>
  );
}
