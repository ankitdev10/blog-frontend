import PostIttem from "../postitem/PostIttem"
import "./post.css"
export default function Post({posts}) {
  return (
    <div className="posts">
      {posts.map(p => (<PostIttem key={p._id} post={p}/>))}
    </div>
  )
}
