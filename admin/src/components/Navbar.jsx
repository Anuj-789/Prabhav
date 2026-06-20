export default function Navbar({ setOpen }) {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-30">

      <div className="flex items-center justify-between px-4 md:px-6 py-4">

        {/* Left */}
        <div className="flex items-center gap-3">

          <button
            onClick={() => setOpen(true)}
            className="text-2xl md:text-xl hover:text-blue-600 transition"
          >
            ☰
          </button>

          <div>
            <h1 className="text-lg md:text-xl font-bold text-gray-800">
              Admin Dashboard
            </h1>

            <p className="hidden sm:block text-xs text-gray-500">
              Content Management System
            </p>
          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          <div className="hidden md:flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              A
            </div>

            <span className="text-sm font-medium text-gray-700">
              Admin
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}