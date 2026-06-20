import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrandCol}>
          <div className={styles.brand}>
            <div className={styles.brandMark} aria-hidden="true">
              <span />
            </div>
            <div>
              <div className={styles.brandTitle}>BIBLIOTECA</div>
              <div className={styles.brandSubtitle}>MUNICIPAL</div>
            </div>
          </div>
          <p>Leitura, cultura e conhecimento para toda a comunidade.</p>
        </div>

        <div className={styles.footerCol}>
          <h4>Informações</h4>
          <a href="#">Horários</a>
          <a href="#">Localização</a>
          <a href="#">Eventos</a>
          <a href="#">Contato</a>
        </div>

        <div className={styles.footerCol}>
          <h4>Endereço</h4>
          <p>Praça Prof. Jacy de Assis - s/n</p>
          <p>Centro, Uberlândia - MG</p>
          <p>CEP 38400-121</p>
          <p>(34) 3236-9625</p>
        </div>

      </div>

      <div className={styles.copyright}>
        © 2026 Biblioteca Municipal. Todos os direitos reservados.
      </div>
    </footer>
  );
}