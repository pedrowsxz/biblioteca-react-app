import styles from "./EventsPage.module.css";
import { events } from "../../data/content";
import EventCard from "../../components/EventCard/EventCard";

export default function EventsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.sectionTag}>EVENTOS</span>
          <div className={styles.divider} />
          <h1>Eventos</h1>
          <p>
            A programação da Biblioteca Municipal reúne encontros literários, oficinas,
            conversas, apresentações e atividades educativas pensadas para fortalecer a
            vida cultural da comunidade.
          </p>
          <p>
            Abaixo estão os eventos disponíveis no momento, organizados em cartões de
            leitura rápida para facilitar a navegação.
          </p>
        </div>

        <div className={styles.heroAside} aria-hidden="true">
          <div className={styles.heroPanel}>
            <div className={styles.heroPanelTop} />
            <div className={styles.heroPanelText}>
              <strong>Programação aberta</strong>
              <span>Atividades culturais, educativas e comunitárias</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.listSection}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionTag}>CALENDÁRIO</span>
            <div className={styles.divider} />
            <h2>Confira todos os eventos</h2>
          </div>
        </div>

        <div className={styles.grid}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </main>
  );
}