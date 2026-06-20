import React from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import QuickLinks from "./components/QuickLinks/QuickLinks";
import AboutSection from "./components/AboutSection/AboutSection";
import EventsSection from "./components/EventsSection/EventsSection";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <QuickLinks />
        <AboutSection />
        <EventsSection />
      </main>
      <Footer />
    </div>
  );
}