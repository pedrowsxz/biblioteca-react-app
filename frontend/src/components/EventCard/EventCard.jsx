import {
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
import styles from "./EventCard.module.css";

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

export default function EventCard({ event }) {
  const Icon = EVENT_ICONS[event.category] ?? CalendarDays;

  return (
    <article className={styles.card}>
      <div className={styles.body}>
        <div className={styles.badge}>
          {event.category}
        </div>

        <div className={styles.metaTop}>
          <span className={styles.date}>
            <CalendarDays size={14} />
            {event.weekday} · {event.day} {event.month} · {event.time}
          </span>

          <span className={styles.location}>
            <MapPin size={14} />
            {event.location}
          </span>
        </div>

        <h3>{event.title}</h3>
        <p className={styles.description}>{event.description}</p>

        <div className={styles.bottomRow}>
          <div className={styles.audience}>
            <Users size={15} />
            {event.audience}
          </div>

          <div className={styles.iconChip} aria-hidden="true">
            <Icon size={18} />
          </div>
        </div>
      </div>
    </article>
  );
}