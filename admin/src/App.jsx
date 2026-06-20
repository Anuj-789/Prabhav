import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Articles from "./pages/Articles";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";

// ======================
// Protected Route Wrapper
// ======================
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// ======================
// App
// ======================
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN (public) */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED APP */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

          <Route index element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="articles" element={<Articles />} />
          <Route path="profile" element={<Profile />} />

        </Route>

        {/* fallback route */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;