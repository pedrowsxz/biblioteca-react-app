import React from "react";
import { ArrowRight } from "lucide-react";
import { events } from "../../data/content";
import styles from "./EventsSection.module.css";

export default function EventsSection() {
  return (
    <section className={styles.events}>
      <div className={styles.sectionHeading}>
        <div className={styles.sectionTitleRow}>
          <span className={styles.sectionMenuBars} aria-hidden="true">
            ≡
          </span>
          <h2>Próximos eventos</h2>
        </div>
        <a href="#" className={styles.viewAll}>
          VER TODOS <ArrowRight size={18} />
        </a>
      </div>

      <div className={styles.eventsGrid}>
        {events.map((event) => {
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