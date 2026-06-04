import { useEffect, useState } from "react";
import Navbar from "./layout/navbar";
import "../styles/workout.css";

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/get-all-workouts");
      const data = await res.json();
      console.log(res);
      setWorkouts(data.workouts);
    };

    fetchWorkouts();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
            <div className="container py-4">
      <div className ="row">
        {workouts.map((workout, index) => (
          <div key={index} className="col-md-4 workout-card">
            <img src={workout.image_url} alt={workout.workout_name} />
            <h3>{workout.workout_name}</h3>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
 