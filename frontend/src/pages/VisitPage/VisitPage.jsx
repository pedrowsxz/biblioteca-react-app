import { MapPin, Clock3, Phone, Mail, Send } from "lucide-react";
import styles from "./VisitPage.module.css";
import { visitorInfo } from "../../data/content";

export default function VisitPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.sectionTag}>{visitorInfo.subtitle.toUpperCase()}</span>
          <div className={styles.divider} />
          <h1>{visitorInfo.title}</h1>
          <p>
            Logo à frente do Terminal Central. Planeje a sua visita à Biblioteca Municipal. Veja o endereço, horário de funcionamento,
            e detalhes de contato abaixo. Esta página foi projetada para ajudar os visitantes rapidamente
            acessar as informações mais importantes.
          </p>
        </div>

        <div className={styles.heroPanel} aria-hidden="true">
          <div className={styles.heroPanelInner}>
            <MapPin size={34} />
            <strong>Fácil de encontrar</strong>
            <span>Localização central, acesso público e um espaço acolhedor para todos.</span>
          </div>
        </div>
      </section>

      <section className={styles.infoGrid}>
        <article className={styles.infoCard}>
          <div className={styles.cardIcon}><MapPin size={20} /></div>
          <h2>Endereço / Localização</h2>
          <div className={styles.textBlock}>
            {visitorInfo.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </article>

        <article className={styles.infoCard}>
          <div className={styles.cardIcon}><Clock3 size={20} /></div>
          <h2>Horário de Funcionamento</h2>
          <ul className={styles.hoursList}>
            {visitorInfo.hours.map((item) => (
              <li key={item.day}>
                <span>{item.day}</span>
                <span>{item.time}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className={styles.infoCard}>
          <div className={styles.cardIcon}><Phone size={20} /></div>
          <h2>Informação de Contato</h2>
          <div className={styles.textBlock}>
            <p><strong>Telefone:</strong> {visitorInfo.phone}</p>
            <p><strong>Email:</strong> {visitorInfo.email}</p>
          </div>
        </article>
      </section>

      <section className={styles.contactSection}>
        <div className={styles.formCard}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionTag}>FORMULÁRIO DE CONTATO</span>
            <div className={styles.divider} />
            <h2>Envie uma mensagem</h2>
          </div>

          <form className={styles.form}>
            <label>
              Nome
              <input type="text" />
            </label>

            <label>
              Email
              <input type="email" />
            </label>

            <label>
              Assunto
              <input type="text" />
            </label>

            <label className={styles.fullWidth}>
              Mensagem
              <textarea rows="6" />
            </label>

            <button type="button" className={styles.button}>
              <Send size={16} />
              Enviar Mensagem
            </button>
          </form>
        </div>

        <div className={styles.mapCard}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionTag}>MAPA</span>
            <div className={styles.divider} />
            <h2>Localização</h2>
          </div>
        <div className={styles.mapPlaceholder}>
        <iframe
            title="Library Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.3484125976556!2d-48.27527190000001!3d-18.9159663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94a444fed38ed65f%3A0xbe579de972cd4bf1!2sBiblioteca%20P%C3%BAblica%20Municipal%20Juscelino%20Kubitschek%20de%20Oliveira!5e0!3m2!1spt-BR!2sbr!4v1782000565978!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        />
        </div>
        </div>
      </section>
    </main>
  );
}