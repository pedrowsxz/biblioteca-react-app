import Hero from "../../components/Hero/Hero";
import QuickLinks from "../../components/QuickLinks/QuickLinks";
import AboutSection from "../../components/AboutSection/AboutSection";
import EventsSection from "../../components/EventsSection/EventsSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <QuickLinks />
      <AboutSection />
      <EventsSection />
    </main>
  );
}