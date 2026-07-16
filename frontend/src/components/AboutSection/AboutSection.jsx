import React from "react";
import { ArrowRight } from "lucide-react";
import styles from "./AboutSection.module.css";
import buildingIllustration from "../../assets/fotodentro1.jpg";

export default function AboutSection() {
  return (
    <section className={styles.about}>
      <div className={styles.aboutCopy}>
        <span className={styles.sectionLabel}>SOBRE A BIBLIOTECA</span>
        <h2>Um dos principais espaços culturais de Uberlândia.</h2>
        <p>
          A biblioteca pública municipal possui mais de 40 mil livros disponíveis para empréstimo à comunidade.
          Além disso, no local são realizadas várias atividades como oficinas, palestras, cursos, contação de histórias, 
          exposições e apoio pedagógico.
        </p>
        <a href="sobre" className={styles.secondaryBtn}>
          SAIBA MAIS SOBRE A BIBLIOTECA <ArrowRight size={18} />
        </a>
      </div>

    <div className={styles.aboutImage} aria-hidden="true">
      <figure className={styles.figure}>
        <img
          src={buildingIllustration}
          alt="About us"
          className={styles.aboutPhoto}
        />

        <figcaption className={styles.caption}>
          Fonte: Prefeitura Municipal de Uberlândia.
        </figcaption>
      </figure>
    </div>
    </section>
  );
}