import { NavLink } from "react-router-dom";
import "../../styles/layout/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Workout Tracker</div>

      <div className="nav-links">
        <NavLink to="/">Dashboard</NavLink>
        {/* <NavLink to="/posts">Posts</NavLink> */}
        <NavLink to="/workouts">Workouts</NavLink>
        <NavLink to="/users">User</NavLink>
      </div>
    </nav>
  );
}
