import "./postitem.css";
import { Link } from "react-router-dom";

export default function PostIttem({ post }) {
  const PF = "https://blog-api-c8cy.onrender.com/images/"
  return (
    <div className="post">
      {post.photo && <img className="postimg" src={PF + post.photo} alt="" />}

      <div className="postinfo">
        <Link className="link" to={`/post/${post._id}`}>
          <span className="posttitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postdate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postdesc">{post.description}</p>
    </div>
  );
}
