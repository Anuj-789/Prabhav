import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ArticlePage from "./pages/ArticlePage";
import Favourites from "./pages/Favourites";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>

      {/* FOOTER AUTOMATIC (only home inside component) */}
      <Footer />
    </>
  );
}

export default App;