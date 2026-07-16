// CatalogPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, BookOpen, ChevronLeft, ChevronRight, X } from "lucide-react";
import styles from "./CatalogPage.module.css";

const ITEMS_PER_PAGE = 9;

const STATUS_LABELS = {
  available: "Disponível",
  unavailable: "Indisponível",
  borrowed: "Emprestado",
  reserved: "Reservado",
};

function statusLabel(status) {
  return STATUS_LABELS[status] || (status ? status[0].toUpperCase() + status.slice(1) : "—");
}

// Builds the numbered pagination sequence with ellipses for long result sets.
function getPageNumbers(current, total) {
  const pages = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("...");
  if (total > 1) pages.push(total);

  return pages;
}

export default function CatalogPage() {
  const [termDraft, setTermDraft] = useState("");
  const [genreDraft, setGenreDraft] = useState("all");
  const [statusDraft, setStatusDraft] = useState("all");

  const [genres, setGenres] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({ term: "", genre: "all", status: "all" });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch filter options from backend
    fetch("/api/books/filters")
      .then((res) => res.json())
      .then((data) => {
        setGenres(data.genres);
        setStatuses(data.statuses);
      })
      .catch((err) => console.error("Failed to fetch filters:", err));
  }, []);

  useEffect(() => {
    // Fetch books from backend when filters or currentPage change
    const params = new URLSearchParams();
    params.append("search", filters.term);
    params.append("genre", filters.genre);
    params.append("status", filters.status);
    params.append("page", currentPage.toString());
    params.append("limit", ITEMS_PER_PAGE.toString());

    fetch(`/api/books?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.items);
        setTotalBooks(data.total);
        setTotalPages(data.totalPages);
      })
      .catch((err) => console.error("Failed to fetch books:", err));
  }, [filters, currentPage]);

  const safePage = Math.min(currentPage, totalPages);
  const rangeStart = totalBooks === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE + 1;
  const rangeEnd = Math.min(safePage * ITEMS_PER_PAGE, totalBooks);

  function handleSearch(event) {
    event.preventDefault();
    setFilters({ term: termDraft, genre: genreDraft, status: statusDraft });
    setCurrentPage(1);
  }

  function handleReset() {
    setTermDraft("");
    setGenreDraft("all");
    setStatusDraft("all");
    setFilters({ term: "", genre: "all", status: "all" });
    setCurrentPage(1);
  }

  function goToPage(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const hasActiveFilters = filters.term || filters.genre !== "all" || filters.status !== "all";

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.sectionTag}>ACERVO DIGITAL</span>
        <div className={styles.divider} />
        <h1>Catálogo da Biblioteca</h1>
        <p>
          Explore o acervo da Biblioteca Municipal. Busque por título ou autor e filtre por
          gênero e disponibilidade para encontrar o próximo livro para sua leitura.
        </p>
      </section>

      <section className={styles.searchSection}>
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <label className={styles.searchField}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Buscar por título ou autor"
              value={termDraft}
              onChange={(event) => setTermDraft(event.target.value)}
            />
          </label>

          <label className={styles.selectField}>
            <span>Gênero</span>
            <select value={genreDraft} onChange={(event) => setGenreDraft(event.target.value)}>
              <option value="all">Todos</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.selectField}>
            <span>Disponibilidade</span>
            <select value={statusDraft} onChange={(event) => setStatusDraft(event.target.value)}>
              <option value="all">Todas</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {statusLabel(status)}
                </option>
              ))}
            </select>
          </label>

          <div className={styles.formActions}>
            <button type="submit" className={styles.searchButton}>
              <Search size={16} />
              Buscar
            </button>
            {hasActiveFilters && (
              <button type="button" className={styles.resetButton} onClick={handleReset}>
                <X size={15} />
                Limpar
              </button>
            )}
          </div>
        </form>
      </section>

      <section className={styles.resultsSection}>
        <div className={styles.resultsHeader}>
          <p>
            {totalBooks === 0
              ? "Nenhum resultado"
              : `Mostrando ${rangeStart}–${rangeEnd} de ${totalBooks} livro(s)`}
          </p>
        </div>

        {books.length === 0 ? (
          <div className={styles.emptyState}>
            <BookOpen size={30} />
            <p>Nenhum livro encontrado com os filtros selecionados.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {books.map((book) => (
              <article key={book.isbn} className={styles.card}>
                <Link to={`/catalogo/${book.isbn}`} className={styles.coverLink}>
                  {book.cover_image ? (
                    <img
                      src={book.cover_image}
                      alt={`Capa do livro ${book.title}`}
                      className={styles.cover}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.coverFallback}>
                      <BookOpen size={26} />
                    </div>
                  )}
                </Link>

                <div className={styles.cardBody}>
                  <span
                    className={`${styles.status} ${
                      book.availability_status === "available" ? styles.available : styles.unavailable
                    }`}
                  >
                    {statusLabel(book.availability_status)}
                  </span>

                  <Link to={`/catalogo/${book.isbn}`} className={styles.title}>
                    {book.title}
                  </Link>
                  <p className={styles.author}>{book.author}</p>

                  <div className={styles.meta}>
                    <span>{book.genre}</span>
                    <span aria-hidden="true">•</span>
                    <span>{book.publication_date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className={styles.pagination} aria-label="Paginação do catálogo">
            <button
              type="button"
              className={styles.pageNav}
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 1}
              aria-label="Página anterior"
            >
              <ChevronLeft size={18} />
            </button>

            {getPageNumbers(safePage, totalPages).map((page, index) =>
              page === "..." ? (
                <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                  …
                </span>
              ) : (
                <button
                  key={page}
                  type="button"
                  className={`${styles.pageButton} ${page === safePage ? styles.pageActive : ""}`}
                  onClick={() => goToPage(page)}
                  aria-current={page === safePage ? "page" : undefined}
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              className={styles.pageNav}
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage === totalPages}
              aria-label="Próxima página"
            >
              <ChevronRight size={18} />
            </button>
          </nav>
        )}
      </section>
    </main>
  );
}
