import { useEffect, useState } from "react"
import Header from "../../components/header/Header"
import Post from "../../components/posts/Post"
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.css"

import { useLocation } from "react-router-dom"
import { axiosInstance } from "../../axiosInstance"

export default function Home() {
  const [posts, setPosts] = useState([])
  const {search} = useLocation()

  useEffect(()=>{
    const fetchPosts = async () =>{
      const res = await axiosInstance.get("/posts" + search)
     setPosts(res.data)
    }
    fetchPosts()
    
  }, [search])
  return (
    <>
     <Header />
    <div className="home">
     <Post posts = {posts} />
     <Sidebar />
    </div>
    </>
  )
}
