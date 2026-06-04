import { useEffect, useState } from "react";
import Navbar from "./layout/navbar";
import "../styles/workout.css";

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [selectedPart, setSelectedPart] = useState("All");

  const bodyParts = [
    "All",
    ...new Set(workouts.map((workout) => workout.body_part)),
  ];

  const filteredWorkouts =
    selectedPart === "All"
      ? workouts
      : workouts.filter((workout) => workout.body_part === selectedPart);

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
        <div className="filter-container mb-4">
          {bodyParts.map((part) => (
            <button
              key={part}
              className={`filter-btn ${selectedPart === part ? "active" : ""}`}
              onClick={() => setSelectedPart(part)}
            >
              {part}
            </button>
          ))}
        </div>
        <div className="row">
          {filteredWorkouts.map((workout) => (
            <div key={workout.id} className="col-md-4 workout-card">
              <img src={workout.image_url} alt={workout.workout_name} />
              <h3>{workout.workout_name}</h3>
              <p>{workout.body_part}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
