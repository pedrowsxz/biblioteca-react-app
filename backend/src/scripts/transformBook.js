// Converte um item da resposta da Open Library (`docs[i]`) no modelo
// interno de livro usado pelo catálogo da aplicação.

// Lista (não objeto) porque a ordem importa: "fiction" é um assunto tão
// genérico que aparece em quase todos os livros, então precisa ser o
// último a ser testado — senão um romance nunca chegaria a ser
// classificado como "Romance", por exemplo.
const GENRE_BY_SUBJECT_KEYWORD = [
  ["love stories", "Romance"],
  ["romance", "Romance"],
  ["poetry", "Poesia"],
  ["drama", "Drama"],
  ["biography", "Biografia"],
  ["short stories", "Conto"],
  ["children's stories", "Infantil"],
  ["fantasy", "Fantasia"],
  ["history", "História"],
  ["essays", "Ensaio"],
  ["fiction", "Ficção"],
];

const LANGUAGE_BY_CODE = {
  por: "pt-BR",
  eng: "en",
  spa: "es",
  fre: "fr",
  fra: "fr",
};

function pickGenre(subjects = []) {
  const lowerSubjects = subjects.map((subject) => subject.toLowerCase());

  for (const [keyword, genre] of GENRE_BY_SUBJECT_KEYWORD) {
    if (lowerSubjects.some((subject) => subject.includes(keyword))) return genre;
  }

  return "Literatura";
}

function pickLanguage(languages = []) {
  return LANGUAGE_BY_CODE[languages[0]] || "pt-BR";
}

// A Open Library nem sempre retorna ISBN. Quando falta, usamos outro
// identificador da obra como substituto, sempre como string e sempre
// com um prefixo que deixa claro que não é um ISBN "de verdade".
function buildIsbn(doc) {
  if (doc.isbn?.length) return String(doc.isbn[0]);
  if (doc.cover_edition_key) return `OL-${doc.cover_edition_key}`;
  if (doc.key) return `OL-${doc.key.replace("/works/", "")}`;
  return null;
}

function buildCoverImage(coverId) {
  return coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : null;
}

function buildDescription(genre) {
  return `Obra literária de grande relevância cultural, frequentemente presente em bibliotecas brasileiras. Gênero predominante: ${genre}.`;
}

function buildCategories(genre, year) {
  const categories = new Set([genre, "Literatura Brasileira"]);
  if (year && year < 1950) categories.add("Clássico");
  categories.add("Literatura");
  return Array.from(categories);
}

// A Open Library é um catálogo bibliográfico, não o sistema de um acervo
// físico: ela não informa se um exemplar está disponível. Por isso o
// status é sorteado (com viés para "available") só para o catálogo de
// testes ter os três estados que a interface precisa exibir/filtrar.
function randomAvailabilityStatus() {
  const roll = Math.random();
  if (roll < 0.7) return "available";
  if (roll < 0.9) return "borrowed";
  return "reserved";
}

export function transformDoc(doc) {
  if (!doc.title || !doc.author_name?.length) return null;

  const isbn = buildIsbn(doc);
  if (!isbn) return null;

  const genre = pickGenre(doc.subject);
  const year = doc.first_publish_year || null;

  return {
    title: doc.title,
    author: doc.author_name[0],
    genre,
    publication_date: year ? String(year) : "Data não informada",
    number_of_pages: doc.number_of_pages_median || null,
    availability_status: randomAvailabilityStatus(),
    isbn,
    publisher: doc.publisher?.[0] || "Editora não informada",
    language: pickLanguage(doc.language),
    description: buildDescription(genre),
    categories: buildCategories(genre, year),
    cover_image: buildCoverImage(doc.cover_i),
  };
}