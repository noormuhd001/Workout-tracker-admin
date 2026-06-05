import { useEffect, useState } from "react";
import Navbar from "./layout/navbar";
import "../styles/workout.css";

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [selectedPart, setSelectedPart] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    workout_name: "",
    body_part: "",

    image: null,
    kcal_per_minute: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("workout_name", formData.workout_name);
    data.append("body_part", formData.body_part);
    data.append("image", formData.image);
    data.append("kcal_per_minute", formData.kcal_per_minute);

    // const res = await fetch("http://127.0.0.1:8000/api/store-workout", {
    //   method: "POST",
    //   body: data,
    // });

    // const result = await res.json();

    // const text = await res.text();
    // console.log(text, result);

    const res = await fetch("http://127.0.0.1:8000/api/store-workout", {
      method: "POST",
      body: data,
    });

    console.log("Status:", res.status);

    const text = await res.text();
    console.log(text);
    setShowModal(false);
  };

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
      setWorkouts(data.workouts);
    };

    fetchWorkouts();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className="container py-4">
        <div className="filter-container d-flex align-items-center">
          {bodyParts.map((part) => (
            <button
              key={part}
              className={`filter-btn ${selectedPart === part ? "active" : ""}`}
              onClick={() => setSelectedPart(part)}
            >
              {part}
            </button>
          ))}

          <button
            className="btn btn-success ms-auto"
            onClick={() => setShowModal(true)}
          >
            Add Workout
          </button>
        </div>
        <div className="row">
          {filteredWorkouts.map((workout) => (
            <div key={workout.id} className="col-md-4 workout-card">
              <img src={workout.image_url} alt={workout.workout_name} />
              <h3>{workout.workout_name}</h3>
              <p>{workout.body_part}</p>
              <p className="kcal">{workout.kcal_per_minute} kcal/min</p>
            </div>
          ))}
        </div>

        {showModal && (
          <>
            <div className="modal fade show d-block">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Workout</h5>

                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label>Workout Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="workout_name"
                          value={formData.workout_name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label>Body Part</label>
                        <select
                          className="form-control"
                          name="body_part"
                          value={formData.body_part}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Body Part</option>
                          <option value="Chest">Chest</option>
                          <option value="Back">Back</option>
                          <option value="Legs">Legs</option>
                          <option value="Arms">Arms</option>
                          <option value="Shoulders">Shoulders</option>
                          <option value="Core">Core</option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <label>Image</label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={handleFileChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label>Kcal Per Minute</label>
                        <input
                          type="number"
                          className="form-control"
                          name="kcal_per_minute"
                          value={formData.kcal_per_minute}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>

                      <button type="submit" className="btn btn-success">
                        Save Workout
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="modal-backdrop fade show"></div>
          </>
        )}
      </div>
    </div>
  );
}
