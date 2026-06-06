import { useEffect, useState } from "react";
import Navbar from "./layout/navbar";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import Swal from "sweetalert2";

export default function User() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/get-all-users");
      const result = await res.json();
      setUserData(result.userData);
    };

    fetchUserData();
  }, []);

  // Function to handle status toggling
  const handleToggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to change this user's status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Change it!",
      cancelButtonText: "Cancel",
    });

    const statusData = new FormData();
    statusData.append("status", newStatus);
   
    if (!confirm.isConfirmed) return;
    const res = await fetch(
      `http://127.0.0.1:8000/api/user-update-status/${userId}`,
      {
        method: "POST", // or 'POST' depending on your backend
        // headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      },
    );
    const result = await res.json();
    Swal.fire({
      icon: "success",
      title: "Success",
      text: result.text,
      timer: 2000,
      showConfirmButton: false,
    });

    // Optimistic UI update: update local state immediately
    setUserData((prevData) =>
      prevData.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user,
      ),
    );
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {userData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.formatted_role_name}</td>
                <td>
                  <span
                    className={`badge ${
                      user.status === 1 ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {user.status === 1 ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleToggleStatus(user.id, user.status)}
                    className="btn btn-sm btn-light"
                    style={{
                      border: "none",
                      background: "none",
                      fontSize: "1.2rem",
                    }}
                    aria-label="Toggle Status"
                  >
                    {user.status === 1 ? (
                      <FaToggleOn className="text-success" />
                    ) : (
                      <FaToggleOff className="text-secondary" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
            {userData.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
