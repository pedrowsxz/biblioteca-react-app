# *NOTA: 

Como a publicação do site ainda não foi autorizada, não foi utilizado o banco de dados oficial da Biblioteca Municipal, no qual havia a integração utilizando MongoDB.

Para que o projeto possa ser executado por qualquer pessoa sem necessidade de configurar um banco de dados, a versão publicada utiliza um catálogo local (`library_catalog.json`) como fonte de dados.

Esse arquivo é gerado automaticamente por um script que:

1. consulta a Open Library API (`https://openlibrary.org/search.json?subject=Brazilian+literature&limit=1000`);
2. filtra e transforma os dados para o modelo utilizado pela aplicação;
3. exporta o resultado para `src/data/library_catalog.json`.

A API sempre acessa os dados através da camada de **repositories**. Alterando apenas a variável `DATA_SOURCE` no arquivo `.env`, é possível utilizar tanto o arquivo JSON quanto o MongoDB, sem necessidade de modificar o restante da aplicação.

Formulário de Contato também desabilitado.

## Rodando a API
```bash
git clone ...
cd biblioteca-react-app
npm install
npm run dev
```
Depois acesse: http://localhost:5173

# Arquitetura

## Backend 

API  em Node.js/Express que serve o catálogo de livros e a lista de
eventos consumidos pelo frontend (`CatalogPage`, `BookPage` e `EventsPage`).

```
backend/
├── .env.example
├── package.json
└── src/
    ├── server.js              # sobe o servidor HTTP
    ├── app.js                 # Express: middlewares, rotas, erros
    ├── config/
    │   └── db.js               # conexão (singleton) com o MongoDB
    ├── utils/
    │   └── dataSource.js       # lê DATA_SOURCE do .env
    ├── repositories/           # única camada que sabe de onde vêm os dados
    │   ├── bookRepository.js   # decide entre MongoDB e JSON local
    │   └── eventRepository.js
    ├── routes/                 # rotas Express chamando os repositórios direto
    │   ├── books.routes.js     # (sem camada de "controller": desnecessária
    │   └── events.routes.js    #  nesse tamanho de projeto)
    ├── scripts/
    │   ├── transformBook.js    # regras de mapeamento Open Library -> modelo interno
    │   ├── fetchCatalog.js     # passos 1–3 do pipeline de importação
    │   └── seedDatabase.js     # passo 4: popula o MongoDB
    └── data/
        ├── library_catalog.json  # catálogo (comitado no repo, ver abaixo)
        └── events.json            # eventos de exemplo
        
```

## Frontend

O frontend foi desenvolvido em **React + Vite** e consome os endpoints disponibilizados pela API. As páginas do catálogo, livro e eventos obtêm seus dados exclusivamente através do backend, independentemente da fonte configurada (JSON local ou MongoDB).

```
frontend/
├── package.json
├── vite.config.js
└── src/
    ├── assets/
    │   ├── images/
    │   └── icons/
    ├── components/
    │   ├── AboutSection/
    │   ├── BookCard/
    │   ├── EventCard/
    │   ├── EventsSection/
    │   ├── Footer/
    │   ├── Header/
    │   ├── Hero/
    │   ├── QuickLinks/
    │   └── SearchBar/
    ├── pages/
    │   ├── HomePage/
    │   ├── AboutPage/
    │   ├── CatalogPage/
    │   ├── BookPage/
    │   ├── EventsPage/
    │   └── ContactPage/
    ├── services/
    │   └── api.js             # comunicação com o backend
    ├── App.jsx
    └── main.jsx
```

Acessar
## Arquitetura

```
backend/
├── .env.example
├── package.json
└── src/
    ├── server.js              # sobe o servidor HTTP
    ├── app.js                 # Express: middlewares, rotas, erros
    ├── config/
    │   └── db.js               # conexão (singleton) com o MongoDB
    ├── utils/
    │   └── dataSource.js       # lê DATA_SOURCE do .env
    ├── repositories/           # única camada que sabe de onde vêm os dados
    │   ├── bookRepository.js   # decide entre MongoDB e JSON local
    │   └── eventRepository.js
    ├── routes/                 # rotas Express chamando os repositórios direto
    │   ├── books.routes.js     # (sem camada de "controller": desnecessária
    │   └── events.routes.js    #  nesse tamanho de projeto)
    ├── scripts/
    │   ├── transformBook.js    # regras de mapeamento Open Library -> modelo interno
    │   ├── fetchCatalog.js     # passos 1–3 do pipeline de importação
    │   └── seedDatabase.js     # passo 4: popula o MongoDB
    └── data/
        ├── library_catalog.json  # catálogo (comitado no repo, ver abaixo)
        └── events.json            # eventos de exemplo
```

**Decisão principal:** os `repositories/` são o único lugar do código que
sabe se os dados vêm do MongoDB ou de um arquivo JSON local. Rotas,
transformação e o restante da aplicação não têm ideia de qual fonte está
ativa — só chamam `findBooks()`, `findBookByIsbn()` etc. Isso deixa a troca
de fonte de dados restrita a uma variável de ambiente, sem duplicar lógica
de filtro/paginação em dois lugares.

Não há camada de `controllers/` nem `models`/schema separados: com only
duas entidades e rotas de leitura simples, isso seria uma indireção sem
ganho real para o tamanho do projeto. Se o backend crescer (autenticação,
escrita, validação mais complexa), essa é a primeira divisão a introduzir.

## Pipeline de importação (`npm run fetch:catalog`)

Implementa os passos 1–3 pedidos:

1. **Busca** — `src/scripts/fetchCatalog.js` chama o endpoint de busca da
   Open Library informado no enunciado, acrescido apenas do parâmetro
   `fields`, porque por padrão a API *não* devolve `isbn`, `subject`,
   `publisher`, `language` nem `number_of_pages_median` — só os campos
   pedidos explicitamente.
2. **Transformação** — `src/scripts/transformBook.js` é um módulo puro
   (sem I/O) que converte um item (`doc`) da resposta no modelo interno
   usado pelo catálogo: escolhe um gênero a partir de `subject`, monta a
   descrição e as categorias, resolve idioma, capa (via
   `covers.openlibrary.org`) e um ISBN (com fallback para outro
   identificador da obra quando a Open Library não retorna ISBN).
   A Open Library não informa disponibilidade de exemplares (não é o
   sistema de um acervo físico), então esse campo é sorteado, com viés
   para `"available"`, só para o catálogo de teste ter os três estados
   que a interface precisa exibir e filtrar.
3. **Exportação** — o resultado (deduplicado por ISBN) é salvo em
   `src/data/library_catalog.json`.

Rodar com:

```bash
npm install
npm run fetch:catalog
```

> A Open Library bloqueia acesso automatizado a partir deste ambiente de
> geração de código (`robots.txt`), então o script não pôde ser executado
> aqui contra a API real — mas foi testado de ponta a ponta com documentos
> no formato real da API (ver seção "Amostra" abaixo), e deve rodar
> normalmente a partir de uma máquina/servidor comum.

## Seed do MongoDB (`npm run seed`) — passo 4

`src/scripts/seedDatabase.js` lê `src/data/library_catalog.json`, limpa a
coleção `books` e insere o catálogo inteiro, criando um índice único em
`isbn`. Independe de `DATA_SOURCE`: sempre grava no banco, para dar para
preparar a coleção antes de alternar a aplicação para
`DATA_SOURCE=mongodb`.

```bash
npm run seed
```

## Configuração (`.env`)

```bash
cp .env.example .env
```

| Variável | Descrição |
|---|---|
| `DATA_SOURCE` | `json` ou `mongodb` — de onde a API lê os dados |
| `PORT` | porta do servidor Express (padrão `3001`) |
| `FRONTEND_ORIGIN` | origem liberada no CORS |
| `MONGODB_URI` / `MONGODB_DB_NAME` | conexão com o Mongo (necessária com `DATA_SOURCE=mongodb` ou ao rodar `npm run seed`) |

O código de integração com o MongoDB (`config/db.js`, uso nos
repositórios, script de seed) existe e roda independentemente do valor de
`DATA_SOURCE` — só quem decide se ele é *usado* nas rotas é essa variável.

## Amostra em `library_catalog.json`

O `library_catalog.json` comitado no repositório é uma amostra de livros, não o catálogo completo de 40.000 itens da biblioteca — isso é proposital
apenas para rodar `DATA_SOURCE=json` e testar a aplicação de ponta a ponta sem precisar
rodar o pipeline de importação nem setar um MongoDB.

Ela foi gerada passando documentos reais (título/autor/ano) pelo mesmo
`transformBook.js` usado pelo pipeline de verdade — então o formato e as
regras de transformação são idênticos ao que `npm run fetch:catalog`
produziria. Rode `npm run fetch:catalog` para substituí-la pelo catálogo
completo vindo da Open Library.



### Endpoints

| Rota | Descrição |
|---|---|
| `GET /api/health` | status da API e fonte de dados ativa |
| `GET /api/books?search=&genre=&status=&page=&limit=` | busca paginada |
| `GET /api/books/filters` | valores distintos de gênero/disponibilidade |
| `GET /api/books/:isbn` | detalhe de um livro |
| `GET /api/events` | lista de eventos |
| `GET /api/events/:id` | detalhe de um evento |
