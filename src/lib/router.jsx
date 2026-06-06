// import Details from "../Pages/details";
import Dashboard from "../Pages/dashboard";
// import Posts from "../Pages/posts";
import { createBrowserRouter } from "react-router-dom";
import Workouts from "../Pages/workout";
import User from "../Pages/user";

const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  // { path: "/posts", element: <Posts /> },
  // { path: "/posts/:id", element: <Details /> },
  { path: "/workouts", element: <Workouts /> },
  { path: "/users", element: <User /> },
]);

export default router;
