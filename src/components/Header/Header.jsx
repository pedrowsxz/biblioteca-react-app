import React from "react";
import { Menu } from "lucide-react";
import { navItems } from "../../data/content";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.topbar}>
      <div className={styles.brand}>
        <div className={styles.brandMark} aria-hidden="true">
          <span />
        </div>
        <div>
          <div className={styles.brandTitle}>BIBLIOTECA PÚBLICA MUNICIPAL</div>
          <div className={styles.brandSubtitle}>JUSCELINO KUBITSCHEK DE OLIVEIRA</div>
        </div>
      </div>

      <button className={styles.mobileMenu} aria-label="Abrir menu">
        <Menu size={20} />
      </button>

      <nav className={styles.nav}>
        {navItems.map((item, index) => (
          <a key={item} href="#" className={index === 0 ? styles.active : ""}>
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
}