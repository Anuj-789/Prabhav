import { useEffect, useState } from "react";
import api from "../services/api";

export default function Profile() {
  const [admin, setAdmin] = useState({
    id: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);

  // ======================
  // GET PROFILE
  // ======================
  const fetchProfile = async () => {
    try {
      const res = await api.get("/admin/profile");

      setAdmin({
        id: res.data.id,
        email: res.data.email,
        password: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ======================
  // UPDATE PROFILE
  // ======================
  const handleUpdate = async () => {
    try {
      setLoading(true);
      setMsg("");

      await api.put("/admin/profile", {
        email: admin.email,
        password: admin.password,
      });

      setMsg("Profile updated successfully ✅");

      setAdmin({
        ...admin,
        password: "",
      });

      setShowUpdate(false);
    } catch (err) {
      setMsg("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // LOGOUT
  // ======================
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="max-w-md mx-auto p-6">

      <div className="bg-white shadow rounded p-5">

        {/* ID */}
        <div className="mb-3">
          <span className="font-semibold">Admin ID:</span>
          <p className="text-gray-600 break-all">
            {admin.id}
          </p>
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <span className="font-semibold">Email:</span>
          <p className="text-gray-600">
            {admin.email}
          </p>
        </div>

        {/* SUCCESS / ERROR MESSAGE */}
        {msg && (
          <div className="mb-4 text-sm text-center text-blue-600">
            {msg}
          </div>
        )}

        {/* UPDATE FORM */}
        {showUpdate && (
          <>
            <label className="block text-sm font-medium mb-1">
              New Email
            </label>

            <input
              className="w-full border p-2 mb-3 rounded"
              value={admin.email}
              onChange={(e) =>
                setAdmin({
                  ...admin,
                  email: e.target.value,
                })
              }
            />

            <label className="block text-sm font-medium mb-1">
              New Password
            </label>

            <input
              type="password"
              className="w-full border p-2 mb-4 rounded"
              placeholder="Enter new password"
              value={admin.password}
              onChange={(e) =>
                setAdmin({
                  ...admin,
                  password: e.target.value,
                })
              }
            />

            <button
              onClick={handleUpdate}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded mb-3"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </>
        )}

        {/* UPDATE BUTTON */}
        {!showUpdate && (
          <button
            onClick={() => setShowUpdate(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded mb-3"
          >
            Update Profile
          </button>
        )}

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded"
        >
          Logout
        </button>

      </div>

    </div>
  );
}