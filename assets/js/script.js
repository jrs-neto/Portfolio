// Seção about
const about = document.querySelector("#about");

// Seção projects
const swiperWrapper = document.querySelector(".swiper-wrapper");

// Formulário
const formulario = document.querySelector("#formulario");

// Expressão Regular de validação do e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Função de preenchimento da seção about
async function getAboutGitHub() {
  try {
    const resposta = await fetch("https://api.github.com/users/jrs-neto");
    const perfil = await resposta.json();

    about.innerHTML = "";

    about.innerHTML = `
      <article class="about-content">
        <h2 class="about-title">Sobre Mim</h2>
        <p class="about-text">Sou desenvolvedor em formação, com foco em Front-end e Full Stack, atualmente cursando Análise e Desenvolvimento de Sistemas e certificado como AWS Cloud Practitioner.
Atualmente, venho me especializando em JavaScript (ES6+), TypeScript, React e Node.js, desenvolvendo aplicações completas com consumo e criação de APIs REST, além de trabalhar com bancos de dados relacionais como PostgreSQL e MySQL. Também possuo experiência com serviços AWS, como S3, EC2, Lambda e IAM.
Tenho experiência prática através de projetos acadêmicos, pessoais e também como desenvolvedor Full Stack voluntário em um time internacional, onde desenvolvi um chatbot com Node.js e TypeScript, implementei uma arquitetura serverless na AWS e automatizei processos internos.
</p>

        <div class="about-side">
          <div class="data-container">
            <div class="data-item">
              <span class="data-number">${perfil.followers}</span>
              <span class="data-label">Seguidores</span>
            </div>

            <div class="data-item">
              <span class="data-number">${perfil.public_repos}</span>
              <span class="data-label">Repositórios</span>
            </div>
          </div>

          <div class="buttons-container about-buttons">
            <a href="${perfil.html_url}" target="_blank" class="botao">Acessar GitHub</a>
            <a href="https://drive.google.com/drive/folders/1D8wHplySJvqn6GL273GQbGKQfpA0LRTn?usp=sharing" target="_blank" class="botao-outline">Ver Currículo</a>
          </div>
        </div>
      </article>
    `;
  } catch (error) {
    console.error("Erro ao buscar dados no GitHub", error);
  }
}

// Função buscar os dados dos projetos
async function getProjectsGitHub() {
  try {
    const resposta = await fetch("https://api.github.com/users/jrs-neto/repos?sort=pushed&per_page=6");

    const repositorios = await resposta.json();

    swiperWrapper.innerHTML = "";

    const linguagens = {
      JavaScript: "javascript",
      TypeScript: "typescript",
      Python: "python",
      Java: "java",
      HTML: "html",
      CSS: "css",
      PHP: "php",
      "C#": "csharp",
      Go: "go",
      Kotlin: "kotlin",
      Swift: "swift",
      C: "c",
      "C++": "c_plus",
      GitHub: "github",
    };

    repositorios.forEach((repositorio) => {
      const linguagem = repositorio.language || "GitHub";
      const icone = linguagens[linguagem] ?? linguagens["GitHub"];
      const urlIcone = `./assets/icons/languages/${icone}.svg`;

      const nomeFormatado = repositorio.name
        .replace(/[-_]/g, " ")
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .toUpperCase();

      const truncar = (texto, limite) => (texto.length > limite ? texto.substring(0, limite) + "..." : texto);

      const descricao = repositorio.description
        ? truncar(repositorio.description, 100)
        : "Projeto desenvolvido no GitHub";

      const tags =
        repositorio.topics?.length > 0
          ? repositorio.topics
              .slice(0, 3)
              .map((topic) => `<span class="tag">${topic}</span>`)
              .join("")
          : `<span class="tag">${linguagem}</span>`;

      const botaoDeploy = repositorio.homepage
        ? `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">Deploy</a>`
        : "";

      const botoesAcao = `
        <div class="project-buttons">
          <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
            GitHub
          </a>
          ${botaoDeploy}
        </div>
      `;

      swiperWrapper.innerHTML += `
        <div class="swiper-slide">
          <article class="project-card">

            <figure class="project-image">
              <img src="${urlIcone}" alt="Ícone - ${linguagem}">
            </figure>

            <div class="project-content">
              <h3>${nomeFormatado}</h3>
              <p>${descricao}</p>

              <div class="project-tags">
                ${tags}
              </div>

              ${botoesAcao}
            </div>

          </article>
        </div>
      `;
    });

    iniciarSwiper();
  } catch (error) {
    console.error("Erro ao buscar dados no GitHub", error);
  }
}

function iniciarSwiper() {
  new Swiper(".projects-swiper", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 24,
    loop: true,
    watchOverflow: true,

    breakpoints: {
      0: { slidesPerView: 1 },
      769: { slidesPerView: 2 },
      1025: { slidesPerView: 3 },
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    autoplay: {
      delay: 5000,
      pauseOnMouseEnter: true,
    },

    grabCursor: true,
  });
}

// Validação do formulário
if (formulario) {
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    document.querySelectorAll("form span").forEach((span) => (span.innerHTML = ""));

    let isValid = true;

    const nome = document.querySelector("#nome");
    const erroNome = document.querySelector("#erro-nome");

    if (nome && nome.value.trim().length < 3) {
      erroNome.innerHTML = "O nome deve ter no mínimo 3 caracteres";
      if (isValid) nome.focus();
      isValid = false;
    }

    const email = document.querySelector("#email");
    const erroEmail = document.querySelector("#erro-email");

    if (email && !email.value.trim().match(emailRegex)) {
      erroEmail.innerHTML = "Digite um endereço de e-mail válido";
      if (isValid) email.focus();
      isValid = false;
    }

    const assunto = document.querySelector("#assunto");
    const erroAssunto = document.querySelector("#erro-assunto");

    if (assunto && assunto.value.trim().length < 5) {
      erroAssunto.innerHTML = "O assunto deve ter no mínimo 5 caracteres";
      if (isValid) assunto.focus();
      isValid = false;
    }

    const mensagem = document.querySelector("#mensagem");
    const erroMensagem = document.querySelector("#erro-mensagem");

    if (mensagem && mensagem.value.trim().length === 0) {
      erroMensagem.innerHTML = "A mensagem não pode ser vazia";
      if (isValid) mensagem.focus();
      isValid = false;
    }

    if (isValid) {
      const submitButton = formulario.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Enviando...";
      }

      formulario.submit();
    }
  });
}

// Executar funções
getAboutGitHub();
getProjectsGitHub();

// Efeito de digitação no logo "Coding"
const textToType = "Coding";
const typingOutput = document.getElementById("titulo");
let indexTyping = 0;

function typeWriter() {
  if (!typingOutput) return;

  if (indexTyping < textToType.length) {
    if (indexTyping === 0) typingOutput.textContent = "";
    typingOutput.textContent += textToType.charAt(indexTyping);
    indexTyping++;
    setTimeout(typeWriter, 200);
  } else if (indexTyping === textToType.length) {
    setTimeout(() => {
      indexTyping = 0;
      typeWriter();
    }, 2500);
    indexTyping++;
  }
}

typeWriter();

// Dark Mode Toggle Logic
const themeToggle = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");

// Inicializa o tema baseado na escolha anterior
if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
} else if (currentTheme === "light") {
  document.body.classList.remove("dark-mode");
}

// Alterna e salva a escolha ao clicar
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}
