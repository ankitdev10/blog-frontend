import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./singlepost.css";

import { Context } from "../../context/Context";
import { axiosInstance } from "../../axiosInstance";

export default function SinglePost() {
  const PF = "https://blog-api-c8cy.onrender.com/images/"

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);
  const { user } = useContext(Context);
  //for updating
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
    };
    getPost();
  }, [path]);

  //delete post
  const handleDelete = async (e) => {
    try {
      await axiosInstance.delete("/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {}
  };

  // update post
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put("/posts/" + path, {
        username: user.username,
        title: title,
        description: description,
      });
      // window.location.reload();
      setUpdateMode(false)
    } catch (error) {}
  };

  return (
    <div className="singlepost">
      <div className="singlepostwrapper">
        {post.photo && (
          <img className="singlepostimg" src={PF + post.photo} alt="" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="singleposttitleinput"
            autoFocus
          />
        ) : (
          <h1 className="singleposttitle">
            {title}
            {post.username === user?.username && (
              <div className="singlepostedit">
                <i
                  className="singleposticon fa-solid fa-file-pen"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singleposticon fa-sharp fa-solid fa-trash"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlepostinfo">
          <span className="singlepostauthor">
            Author:
            <Link className="link" to={`/?user=${post.username}`}>
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlepostdate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlepostdescinput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <p className="singlepostdesc">{description}</p>
        )}
        {updateMode && (
          <button
            className="singlepostbtn"
            type="submit"
            onClick={handleUpdate}
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
}
