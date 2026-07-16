import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import EventsPage from "./pages/EventsPage/EventsPage";
import VisitPage from "./pages/VisitPage/VisitPage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import BookPage from "./pages/BookPage/BookPage";


export default function App() {
  return (
    <div className="page">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/eventos" element={<EventsPage />} />
        <Route path="/visite" element={<VisitPage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/catalogo/:isbn" element={<BookPage />} />
      </Routes>

      <Footer />
    </div>
  );
}