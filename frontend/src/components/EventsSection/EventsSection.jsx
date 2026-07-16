import React, { useRef, useEffect, useState } from "react";
import styles from "./EventsSection.module.css";
import {
  ArrowLeft, ArrowRight,
  CalendarDays,
  MapPin,
  Users,
  BookOpen,
  Music2,
  Film,
  Landmark,
  Palette,
  Dumbbell,
  MessagesSquare,
  MicVocal,
} from "lucide-react";

const EVENT_ICONS = {
  "Literatura": BookOpen,
  "Livro": BookOpen,
  "Música": Music2,
  "Cinema": Film,
  "Patrimônio": Landmark,
  "História": Landmark,
  "Arte": Palette,
  "Exposição": Palette,
  "Esporte": Dumbbell,
  "Comunidade": Users,
  "Palestra": MessagesSquare,
  "Debate": MessagesSquare,
  "Festival": CalendarDays,
  "Teatro": MicVocal,
};

export default function EventsSection() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction * 380,
      behavior: "smooth",
    });
  };

  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadEvents() {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data);
    }

    loadEvents();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <section className={styles.events}>
      <div className={styles.sectionHeading}>
        <div className={styles.sectionTitleRow}>
          <span className={styles.sectionMenuBars} aria-hidden="true">
            ≡
          </span>
          <h2>Próximos eventos</h2>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.scrollButton}
            onClick={() => scroll(-1)}
          >
            <ArrowLeft size={18} />
          </button>

          <button
            type="button"
            className={styles.scrollButton}
            onClick={() => scroll(1)}
          >
            <ArrowRight size={18} />
          </button>

          <a href="/eventos" className={styles.viewAll}>
            VER TODOS <ArrowRight size={18} />
          </a>
        </div>
      </div>

      <div ref={scrollRef} className={styles.eventsGrid}>
        {upcomingEvents.slice(0, 8).map((event) => {
          const Icon = EVENT_ICONS[event.category] ?? CalendarDays;

          return (
            <article className={styles.eventCard} key={event.title}>
              <div className={styles.dateBlock}>
                <div className={styles.day}>{event.day}</div>
                <div className={styles.month}>{event.month}</div>
              </div>

              <div className={styles.eventBody}>
                <h3>{event.title}</h3>
                <div className={styles.eventTime}>{event.time}</div>
                <p>{event.text}</p>
              </div>

              <div className={styles.eventIcon}>
                <Icon size={22} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}