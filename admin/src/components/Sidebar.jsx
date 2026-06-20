import { Link } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-700">

          <h2 className="text-xl font-bold">
            Admin Panel
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-red-400 text-xl"
          >
            ✕
          </button>

        </div>

        {/* Menu */}
        <div className="flex flex-col p-4 gap-2">

          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            📊 Dashboard
          </Link>

          <Link
            to="/categories"
            onClick={() => setOpen(false)}
            className="px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            📁 Categories
          </Link>

          <Link
            to="/articles"
            onClick={() => setOpen(false)}
            className="px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            📰 Articles
          </Link>

          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            👤 Profile
          </Link>

        </div>

        {/* Bottom Logout */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-700">

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition"
          >
            🚪 Logout
          </button>

        </div>

      </div>
    </>
  );
}