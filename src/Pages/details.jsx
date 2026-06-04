import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/postStyle.css";
import Navbar from "./layout/navbar";

export default function Details() {
  const { id } = useParams();

  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      );
      const data = await res.json();
      setDetails(data);
    };

    fetchDetails();
  }, [id]);

  if (!details) {
    return <div className="PostCard">Loading...</div>;
  }

  return (
    <div>
      <Navbar></Navbar>
          <div className="container py-4">
      <div className="PostCard">
        <h1>details:</h1>
        {details && (
          <div className="innerCard">
            <strong>{details.title}</strong>
            <p>{details.body}</p>
            <Link to="/posts">
              <button>Back</button>
            </Link>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
