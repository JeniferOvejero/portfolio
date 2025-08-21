document.addEventListener("DOMContentLoaded", function () {
  // --- SELETORES GLOBAIS ---
  const carrossel = document.getElementById('carrossel-slides');
  const carregandoItem = document.getElementById("itens-carregando");
  const listaHabilidades = document.getElementById("habilidades-lista");
  const techIcons = {
    figma: "https://profilinator.rishav.dev/skills-assets/figma-icon.svg",
    sass: "https://profilinator.rishav.dev/skills-assets/sass-original.svg",
    html: "https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg",
    css: "https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg",
    javascript: "https://profilinator.rishav.dev/skills-assets/javascript-original.svg",
    nodejs: "https://img.icons8.com/fluent/512/node-js.png",
    react: "https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg",
    wordpress: "https://profilinator.rishav.dev/skills-assets/wordpress.png",
    python: "https://profilinator.rishav.dev/skills-assets/python-original.svg",
    express: "https://profilinator.rishav.dev/skills-assets/express-original-wordmark.svg",
    mongodb: "https://profilinator.rishav.dev/skills-assets/mongodb-original-wordmark.svg",
    c: "https://profilinator.rishav.dev/skills-assets/c-original.svg",
  };

  // --- LÓGICA DO CARROSSEL (ROBUSTA) ---
  let index = 0;
  let itemLargura = 0;

  function calcularDimensoes() {
    const primeiroItem = carrossel.querySelector('.carrossel-item');
    if (!primeiroItem) return;
    const gap = parseFloat(window.getComputedStyle(carrossel).gap) || 48;
    itemLargura = primeiroItem.offsetWidth + gap;
    moverCarrossel(0);
  }

  function moverCarrossel(direcao) {
    if (itemLargura === 0) return;
    const totalItens = carrossel.children.length;
    const visiveis = Math.floor(carrossel.parentElement.offsetWidth / itemLargura);
    index += direcao;
    if (index < 0) index = 0;
    const maxIndex = totalItens - visiveis;
    if (index > maxIndex) {
      index = maxIndex > 0 ? maxIndex : 0;
    }
    const deslocamento = index * itemLargura;
    carrossel.style.transform = `translateX(-${deslocamento}px)`;
  }

  // --- CARREGAMENTO DOS DADOS DOS PROJETOS ---
  fetch("https://script.google.com/macros/s/AKfycbxFJ1GHzO_tb0AQUE1aYXp7ha8Lz1hCkD_u0fe0J7OpoZQTHnhqIZ9HLi7ZJYV8c6idmA/exec")
    .then(response => response.json())
    .then(dados => {
      carregandoItem.style.display = "none";
      dados.forEach(projeto => {
        const item = document.createElement("div");
        item.className = "carrossel-item";
        const tecnologiasHtml = projeto['Tecnologias'].split(',').map(tec => {
          const key = tec.trim().toLowerCase();
          const src = techIcons[key] || "";
          if (!src) return `| ${key} | `;
          return `<img src="${src}" alt="${tec.trim()}" class="imagem-tecnologia">`;
        }).join('');
        item.innerHTML = `
          <div class="item">
            <img src="${projeto['Imagem']}" alt="Imagem do projeto" class="item-imagem">
            <h3 class="item-titulo">${projeto['Nome do Projeto']}</h3>
            <div class="item-tecnologias">${tecnologiasHtml}</div>
          </div>
        `;
        carrossel.appendChild(item);
      });
      calcularDimensoes();
      window.addEventListener('resize', calcularDimensoes);
    })
    .catch(error => {
      console.error("Erro ao carregar os dados:", error);
      carregandoItem.innerHTML = "Erro ao carregar projetos.";
    });

  // --- PREENCHIMENTO DAS HABILIDADES ---
  function preencherHabilidades() {
    for (const [nome, url] of Object.entries(techIcons)) {
      const div = document.createElement("div");
      div.classList.add("item-habilidade");
      const img = document.createElement("img");
      img.classList.add("habilidade");
      img.src = url;
      img.alt = nome;
      div.appendChild(img);
      listaHabilidades.appendChild(div);
    }
  }
  preencherHabilidades();

  // --- LÓGICA DOS LINKS E BOTÕES ---
  // Botões de navegação do carrossel (alternativa ao onclick)
  const btnAnterior = document.querySelector('.btn-navegacao.esquerda');
  const btnProximo = document.querySelector('.btn-navegacao.direita');
  if (btnAnterior && btnProximo) {
    btnAnterior.addEventListener('click', () => moverCarrossel(-1));
    btnProximo.addEventListener('click', () => moverCarrossel(1));
  }

  // Links sociais
  const links = {
    github: "https://github.com/jeniferovejero",
    linkedin: "https://www.linkedin.com/in/jeniferovejero",
    gmail: "jenifersofiaovejero@gmail.com"
  };

  Object.keys(links).forEach((nome) => {
    const botao = document.querySelector(`button[name="${nome}"]`);
    if (!botao) return;
    botao.addEventListener("click", () => {
      if (nome === "gmail") {
        navigator.clipboard.writeText(links.gmail)
          .then(() => alert("E-mail copiado para a área de transferência!"))
          .catch(() => alert("Erro ao copiar o e-mail."));
      } else {
        window.open(links[nome], "_blank");
      }
    });
  });

  const gmailLink = document.getElementById("gmail-home");
  if (gmailLink) {
    gmailLink.addEventListener("click", function (event) {
      event.preventDefault();
      navigator.clipboard.writeText(links.gmail)
        .then(() => alert("E-mail copiado para a área de transferência!"))
        .catch(() => alert("Erro ao copiar o e-mail."));
    });
  }
});