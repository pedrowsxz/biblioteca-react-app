import React from "react";
import { ArrowRight } from "lucide-react";
import styles from "./Hero.module.css";
import buildingIllustration from "../../assets/fotoaerea.jpg";

export default function Hero() {
  return (
    <section className={styles.hero} id="inicio">
      <div className={styles.heroText}>
        <span className={styles.eyebrowBars} aria-hidden="true">
          Bem-vindo ao portal da
        </span>

        <h1>
          Biblioteca Pública Municipal Juscelino Kubitschek de Oliveira
        </h1>

        <p>
          Este portal apresenta informações sobre a Biblioteca Pública Municipal
          Juscelino Kubitschek de Oliveira, contribuindo para ampliar sua presença
          digital e facilitar o acesso da comunidade aos seus serviços e atividades.
          Um portal informativo desenvolvido para reunir em um único lugar
          informações sobre a biblioteca, seus serviços, eventos culturais e formas
          de acesso ao conhecimento.
        </p>

        <a href="catalogo" className={styles.primaryBtn}>
          CONHEÇA O CATÁLOGO <ArrowRight size={18} />
        </a>
      </div>

      <div className={styles.heroArt}>
        <figure className={styles.figure}>
          <div className={styles.sunGlow} />

          <img
            className={styles.buildingImage}
            src={buildingIllustration}
            alt="Biblioteca Municipal Juscelino Kubitschek"
            loading="eager"
          />

          <figcaption className={styles.caption}>
            Fonte: Prefeitura Municipal de Uberlândia.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}