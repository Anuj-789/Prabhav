import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  const location = useLocation();

  const hideFooter = location.pathname !== "/";

  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      {/* ONLY SHOW ON HOME */}
      {!hideFooter && <Footer />}

    </div>
  );
}

export default MainLayout;