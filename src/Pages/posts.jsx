import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/postStyle.css";
import Navbar from "./layout/navbar";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  //   const fetchPosts = async () => {
  //     const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  //     const data = await res.json();
  //     setPosts(data);
  //   };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {/* <h1>Posts</h1>
      <Link to="/">Dashboard</Link>
      <hr /> */}
      <Navbar></Navbar>
            <div className="container py-4">
        {posts.map((post) => (
          <div className="innerCard" key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <button>View</button>
            </Link>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
