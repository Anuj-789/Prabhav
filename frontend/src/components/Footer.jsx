import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Footer() {
  const location = useLocation();
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Page ke bottom ke paas aane par footer show hoga
      setShowFooter(scrollPosition > pageHeight - 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👉 ONLY SHOW ON HOME PAGE
  if (location.pathname !== "/") return null;

  return (
    <footer
      className={`bg-gradient-to-r from-blue-950 via-blue-900 via-blue-500 to-blue-950 text-white mt-auto pt-10 pb-6 border-t border-white/10 transition-all duration-700 ease-in-out ${
        showFooter
          ? "translate-y-0 opacity-100"
          : "translate-y-24 opacity-0"
      }`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold bg-white bg-clip-text text-transparent">
            Prabhav
          </h2>

          <p className="text-sm mt-2 text-white/70">
            ----Digital Platform for Storing My Favorite Literature
          </p>
        </div>

        {/* NAV LINKS */}
        <div>
          <h3 className="font-semibold mb-3 text-white/90">Quick Links</h3>

          <div className="flex flex-col gap-2 text-white/70">
            <Link
              to="/about"
              className="hover:text-white hover:font-medium transition-all duration-300"
            >
              About
            </Link>

            <Link
              to="/favourites"
              className="hover:text-white hover:font-medium transition-all duration-300"
            >
              Favourites
            </Link>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-3 text-white/90">Contact</h3>

          <p className="text-white/70">
            Email: aknuj2378@gmail.com
          </p>

          <p className="text-white/70 mt-1">
            Ramnagar, West-Champaran, Bihar
          </p>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="text-center mt-8 border-t border-white/10 pt-4 text-sm text-white/60">
        © {new Date().getFullYear()} Prabhav • Made by Anuj Gupta
      </div>
    </footer>
  );
}

export default Footer;