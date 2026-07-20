import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrandCol}>
          <div className={styles.brand}>
            <div>
              <div className={styles.brandTitle}>BIBLIOTECA</div>
              <div className={styles.brandSubtitle}>MUNICIPAL</div>
            </div>
          </div>
          <p>Leitura, cultura e conhecimento para toda a comunidade.</p>
        </div>

        <div className={styles.footerCol}>
          <h4>Informações</h4>
          <a href="/visite">Horários</a>
          <a href="/visite">Localização</a>
          <a href="/eventos">Eventos</a>
          <a href="/visite">Contato</a>
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
        Projeto acadêmico desenvolvido para fins educacionais.
        Este site não é oficial e não possui vínculo institucional com a Biblioteca Municipal.
      </div>
    </footer>
  );
}