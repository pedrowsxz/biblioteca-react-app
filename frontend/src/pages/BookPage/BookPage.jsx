// BookPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Layers,
  Building2,
  Globe,
  Hash,
  BookMarked,
} from "lucide-react";
import styles from "./BookPage.module.css";

const STATUS_LABELS = {
  available: "Disponível",
  unavailable: "Indisponível",
  borrowed: "Emprestado",
  reserved: "Reservado",
};

function statusLabel(status) {
  return STATUS_LABELS[status] || (status ? status[0].toUpperCase() + status.slice(1) : "—");
}

const LANGUAGE_LABELS = {
  "pt-BR": "Português (Brasil)",
  pt: "Português",
  en: "Inglês",
  es: "Espanhol",
  fr: "Francês",
};

function languageLabel(code) {
  return LANGUAGE_LABELS[code] || code || "—";
}

export default function BookPage() {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch book data from backend
    fetch(`/api/books/${isbn}`)
      .then((res) => {
        if (res.status === 404) {
          throw new Error("notfound");
        }
        if (!res.ok) {
          throw new Error("network");
        }
        return res.json();
      })
      .then((data) => setBook(data))
      .catch((err) => setError(true));
  }, [isbn]);

  useEffect(() => {
    if (!book) return;
    // Fetch related books by genre
    const params = new URLSearchParams();
    params.append("genre", book.genre);
    fetch(`/api/books?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        const related = data.items.filter((item) => item.isbn !== book.isbn).slice(0, 3);
        setRelatedBooks(related);
      })
      .catch((err) => console.error("Failed to fetch related books:", err));
  }, [book]);

  if (error) {
    return (
      <main className={styles.page}>
        <div className={styles.notFound}>
          <BookOpen size={34} />
          <h1>Livro não encontrado</h1>
          <p>Não encontramos nenhum título com este código no nosso acervo.</p>
          <Link to="/catalogo" className={styles.backButton}>
            <ArrowLeft size={16} />
            Voltar ao catálogo
          </Link>
        </div>
      </main>
    );
  }

  if (!book) {
    // You can display a loading state here if desired
    return null;
  }

  const isAvailable = book.availability_status === "available";

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link to="/catalogo">
          <ArrowLeft size={16} />
          Voltar ao catálogo
        </Link>
      </div>

      <section className={styles.bookHero}>
        <div className={styles.coverColumn}>
          <div className={styles.coverFrame}>
            {book.cover_image ? (
              <img
                src={book.cover_image}
                alt={`Capa do livro ${book.title}`}
                className={styles.cover}
              />
            ) : (
              <div className={styles.coverFallback}>
                <BookOpen size={38} />
              </div>
            )}
          </div>

          <span className={`${styles.status} ${isAvailable ? styles.available : styles.unavailable}`}>
            {statusLabel(book.availability_status)}
          </span>

          <button type="button" className={styles.loanButton} disabled={!isAvailable}>
            <BookMarked size={16} />
            {isAvailable ? "Solicitar empréstimo" : "Indisponível no momento"}
          </button>
        </div>

        <div className={styles.infoColumn}>
          {book.genre && <span className={styles.sectionTag}>{book.genre.toUpperCase()}</span>}
          <h1>{book.title}</h1>
          <p className={styles.author}>por {book.author}</p>
          <div className={styles.divider} />

          {book.description && <p className={styles.description}>{book.description}</p>}

          {book.categories?.length > 0 && (
            <div className={styles.categories}>
              {book.categories.map((category) => (
                <span key={category} className={styles.categoryTag}>
                  {category}
                </span>
              ))}
            </div>
          )}

          <dl className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <dt>
                <Calendar size={15} />
                Publicação
              </dt>
              <dd>{book.publication_date || "—"}</dd>
            </div>
            <div className={styles.detailItem}>
              <dt>
                <Layers size={15} />
                Páginas
              </dt>
              <dd>{book.number_of_pages ? `${book.number_of_pages} páginas` : "—"}</dd>
            </div>
            <div className={styles.detailItem}>
              <dt>
                <Building2 size={15} />
                Editora
              </dt>
              <dd>{book.publisher || "—"}</dd>
            </div>
            <div className={styles.detailItem}>
              <dt>
                <Globe size={15} />
                Idioma
              </dt>
              <dd>{languageLabel(book.language)}</dd>
            </div>
            <div className={styles.detailItem}>
              <dt>
                <Hash size={15} />
                ISBN
              </dt>
              <dd>{book.isbn}</dd>
            </div>
          </dl>
        </div>
      </section>

      {relatedBooks.length > 0 && (
        <section className={styles.relatedSection}>
          <span className={styles.sectionTag}>MESMO GÊNERO</span>
          <h2>Você também pode gostar</h2>

          <div className={styles.relatedGrid}>
            {relatedBooks.map((related) => (
              <Link
                key={related.isbn}
                to={`/catalogo/${related.isbn}`}
                className={styles.relatedCard}
              >
                {related.cover_image ? (
                  <img
                    src={related.cover_image}
                    alt={`Capa do livro ${related.title}`}
                    className={styles.relatedCover}
                  />
                ) : (
                  <div className={styles.relatedCoverFallback}>
                    <BookOpen size={20} />
                  </div>
                )}
                <div>
                  <p className={styles.relatedTitle}>{related.title}</p>
                  <p className={styles.relatedAuthor}>{related.author}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
