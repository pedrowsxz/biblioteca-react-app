import React, { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { events } from "../../data/content";
import styles from "./EventsSection.module.css";

export default function EventsSection() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction * 380,
      behavior: "smooth",
    });
  };

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
        {events.slice(0, 8).map((event) => {
          const Icon = event.icon;

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