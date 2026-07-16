import styles from "./AboutPage.module.css";

import buildingIllustration from "../../assets/fotoexterna.webp";
import buildingIllustration2 from "../../assets/fotodentro2.jpg";
import buildingIllustration3 from "../../assets/antiga.jpg";

export default function AboutPage() {
  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.sectionTag}>SOBRE</span>

          <div className={styles.divider} />

          <h1>Sobre a Biblioteca</h1>

          <p>
            A biblioteca pública municipal possui mais de 40 mil livros disponíveis para empréstimo à comunidade. 
            Além disso, no local são realizadas várias atividades como oficinas, palestras, cursos, contação de histórias, 
            exposições e apoio pedagógico. A biblioteca municipal possui ainda, um cuidado especial para pessoas com deficiência visual. 
            No local, existe a Sala de Braille Inhazinha Vilela, que conta com acervo adaptado para língua tátil, realiza atividades 
            como transcrições, orientações, apoio pedagógico, desenvolvimento motor, alfabetização e disponibiliza três óculos ORCAM 
            MyEye2, dispositivo de inteligência artificial capaz de oferecer às pessoas com baixa visão a oportunidade de ler qualquer obra.
            O usuário também pode levar livros de casa para serem lidos nos espaços.
          </p>

        <div className={styles.heroImage}>
          <figure className={styles.figure}>
            <div className={styles.sunGlow} />

            <img
              src={buildingIllustration}
              alt="Biblioteca Municipal"
            />

            <figcaption className={styles.caption}>
              Fonte: Prefeitura Municipal de Uberlândia.
            </figcaption>
          </figure>
        </div>
        </div>
      </section>

      {/* DECORATIVE DIVIDER */}
      <div className={styles.centerDivider}></div>

      {/* CURRENT LIBRARY */}
      <section className={styles.currentLibrary}>
        <div className={styles.headerBlock}>
          <span className={styles.sectionTag}>
            O ESPAÇO
          </span>

          <div className={styles.divider}></div>

          <h2>A biblioteca atual</h2>
        </div>

        <div className={styles.currentContent}>
          <p>
            São 37 servidores que fazem a Biblioteca Pública Municipal funcionar, desde o acervo e catalogação, até a organização dos eventos. Localizada no primeiro piso do prédio, os visitantes são recebidos por uma exposição logo na portaria.
          </p>

          <p>
            O espaço infanto-juvenil “Vovó Caximbó – Maria Inês Mendonça” leva alegria e diversão ao ambiente, em uma decoração lúdica e interativa, contando com móveis da coleção “Bichos Fantásticos”, especificamente projetados para crianças, além de uma brinquedoteca.
          </p>

          <p>
            Além disso, o Espaço Incluir oferece equipamentos para pessoas com deficiências visuais e físicas, seguindo os princípios de democratização e acesso. Logo ao lado, o Espaço Digital proporcionará uma infraestrutura de computadores e softwares para a realização de cursos e uso dos frequentadores da Biblioteca.
          </p>

          <p>
            Também compõem a Biblioteca Municipal uma galeria para exposições, Gibiteca, Sala Multiuso, Sala Uberlândia (dedicada à história da cidade), Hemeroteca (coleção de jornais, revistas e periódicos), área de pesquisa, ilha de computadores para acesso ao acervo eletrônico, sala de oficinas, sala de literatura e a parte administrativa, como a sala da diretora, acervos, entre outros.
          </p>

          <p>
            Entre os principais recursos disponíveis destacam-se:
          </p>

          <ul>
            <li>Acervo literário e técnico atualizado.</li>
            <li>Espaços para leitura silenciosa.</li>
            <li>Salas de estudo e pesquisa.</li>
            <li>Auditório para palestras e eventos culturais.</li>
            <li>Área infantil e programas de incentivo à leitura.</li>
            <li>Acesso à internet e consulta digital.</li>
            <li>Estrutura acessível para pessoas com deficiência.</li>
            <li>Programação cultural permanente.</li>
          </ul>
        </div>

        {/* PHOTO GALLERY PLACEHOLDERS */}

      <div className={styles.singlePhoto}>
        <figure className={styles.figure}>
          <img
            src={buildingIllustration2}
            alt="Biblioteca Municipal"
          />

          <figcaption className={styles.caption}>
            Fonte: Prefeitura Municipal de Uberlândia.
          </figcaption>
        </figure>
      </div>
      </section>

      {/* HISTORY */}
      <section className={styles.history}>
        <div className={styles.historyContent}>
          <span className={styles.sectionTag}>HISTÓRIA</span>

          <div className={styles.divider}></div>

          <h3>Conheça mais sobre sua história</h3>

          <p>
            A Biblioteca Pública de Uberlândia foi criada em 24 de outubro de 1940, através do decreto nº 81, na gestão do Prefeito Vasco Giffone. Em 10 de novembro deu-se a inauguração na Sede da Associação Comercial, Industrial e Agropecuária localizada na Av. João Pinheiro.
          </p>

          <p>
            Desde a sua criação, ocupou vários espaços, até ser transferida em 1976 para o prédio reformado da antiga rodoviária, onde permaneceu até 2019. No dia 31 de agosto de 1976, aniversário de Uberlândia, a Biblioteca ganhou um novo nome: Biblioteca Pública Municipal Juscelino Kubitschek de Oliveira, homenagem especial ao ex-presidente da República.
          </p>

          <p>
            Em 2020, o acervo ganhou novo endereço, agora na Praça Professor Jacy de Assis, onde está situado o Centro Municipal de Cultura.
          </p>

          <h3>Contexto histórico</h3>
         <p>No ano de 1943 e, no local, teve início a construção de um prédio para abrigar a Estação Rodoviária da cidade, 
            em estilo neocolonial, de planta regular, alongada no sentido norte-sul, de dois pavimentos, 
            possuindo platibanda arrematadas com telhas cerâmicas tipo capa-e-canal</p>

          <p>O andar do térreo foi construído nos limites do terreno e, hoje, seus vãos originais estão emparedados,
             o andar superior possui planta em forma de “T”. Ambos os andares possuem platibanda, sendo que a fachada norte do 
             andar superior é coroada com um frontão arqueado na maneira corrente da época. Os interiores não apresentam a 
             configuração original, possuem divisórias provisórias em ambos os andares.</p>

          <p>O piso é parte cerâmico e vinílico em alguns trechos. O teto do térreo é a laje piso do andar superior, 
            sendo que o último pavimento é forrado em gesso. As janelas são metálicas do tipo basculante, com vedações em vidro. 
            A estrutura é de concreto com vedações em tijolo cerâmico. A decoração externa é composta de pequenas colunas torsas 
            adossadas e frontões arqueados coroados com telhas tipo capa-e-canal. O jogo de volumes entre os andares, também, é 
            evidente, mas foi prejudicado pelas descaracterizações do térreo.</p>

          <p>No ano de 1976, a Estação Rodoviária foi transferida para o Bairro Martins, em uma edificação construída para abrigá-la
             sob a denominação de Estação Rodoviária Presidente Castelo Branco. Com a transferência da Estação para este novo endereço, 
             o antigo prédio localizado na Praça Cícero Macedo foi destinado a ser Biblioteca Pública Municipal. Após ser reformado, o 
             acervo foi para ali transferido e no dia 31 de agosto de 1976, dia do aniversário da cidade, a Biblioteca foi entregue à 
             comunidade recebendo a denominação de “Juscelino Kubitschek de Oliveira“. No ano de 2020 a Biblioteca Municipal foi 
             transferida para novo endereço e a edificação histórica recebeu nova função social.</p>

          <p>Este espaço no qual surgiu o primitivo núcleo urbano de Uberlândia é referência para a história e memória local, 
            pois, esconde e revela histórias que permanecem diluídas na sua arquitetura e geografia.</p>

          <p>Fonte: Prefeitura Municipal.</p>

          <p>
            Entre os principais marcos de sua trajetória destacam-se:
          </p>

          <ul>
            <li>
              <strong>1950–1970:</strong> criação do primeiro acervo público e
              início dos serviços de empréstimo.
            </li>

            <li>
              <strong>1980:</strong> expansão das instalações e criação de
              espaços para pesquisa e estudo.
            </li>

            <li>
              <strong>2000:</strong> modernização dos serviços e informatização
              do catálogo.
            </li>

            <li>
              <strong>2020:</strong> renovação estrutural e ampliação das áreas
              culturais e educativas.
            </li>
          </ul>

          <p>
            <em>
              Adicione aqui informações históricas específicas da instituição,
              datas oficiais, mudanças de endereço, restaurações e outras
              conquistas relevantes.
            </em>
          </p>
        </div>

      <div className={styles.historyImage}>
        <figure className={styles.figure}>
          <img
            src={buildingIllustration3}
            alt="Fachada histórica da Biblioteca Municipal"
          />

          <figcaption className={styles.caption}>
            Antigo endereço da Biblioteca Municipal de Uberlândia.
            Fonte: Prefeitura Municipal de Uberlândia.
          </figcaption>
        </figure>
      </div>
      </section>


    </main>
  );
}