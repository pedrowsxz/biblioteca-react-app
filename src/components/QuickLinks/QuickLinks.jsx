import React from "react";
import { ArrowRight } from "lucide-react";
import { quickCards } from "../../data/content";
import styles from "./QuickLinks.module.css";

export default function QuickLinks() {
  return (
    <section className={styles.quickLinks}>
      {quickCards.map((card) => {
        const Icon = card.icon;
        return (
          <article className={styles.quickCard} key={card.title}>
            <div className={styles.quickIcon}>
              <Icon size={28} />
            </div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
            <div className={styles.cardArrow}>
              <ArrowRight size={16} />
            </div>
          </article>
        );
      })}
    </section>
  );
}