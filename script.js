const carrossel = document.getElementById('carrossel-slides');
const carregandoItem = document.getElementById("itens-carregando");
const listaHabilidades = document.getElementById("habilidades-lista");
const itemLargura = 700 + 48;

 const techIcons = {
  figma: "https://profilinator.rishav.dev/skills-assets/figma-icon.svg",
  sass: "https://profilinator.rishav.dev/skills-assets/sass-original.svg",
  html: "https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg",
  css: "https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg",
  javascript: "https://profilinator.rishav.dev/skills-assets/javascript-original.svg",
  nodejs: "https://img.icons8.com/fluent/512/node-js.png",
  react: "https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg",
  python: "https://profilinator.rishav.dev/skills-assets/python-original.svg",
  c: "https://profilinator.rishav.dev/skills-assets/c-original.svg"
};

let index = 0;

function moverCarrossel(direcao) {
    const totalItens = carrossel.children.length;
    const visiveis = Math.floor(carrossel.parentElement.offsetWidth / itemLargura);

    index += direcao;

    if (index < 0) index = 0;
    if (index > totalItens - visiveis) index = totalItens - visiveis;

    const deslocamento = index * itemLargura;
    carrossel.style.transform = `translateX(-${deslocamento}px)`;
}

fetch("https://script.google.com/macros/s/AKfycbxFJ1GHzO_tb0AQUE1aYXp7ha8Lz1hCkD_u0fe0J7OpoZQTHnhqIZ9HLi7ZJYV8c6idmA/exec")
  .then(response => response.json())
  .then(dados => {

    carregandoItem.style.display = "none";

    dados.forEach(projeto => {
      const item = document.createElement("div");
      item.className = "carrossel-item";

      const tecnologiasHtml = projeto['Tecnologias']
        .split(',')
        .map(tec => {
          const key = tec.trim().toLowerCase();
          const src = techIcons[key] || "";
          if (!src) return `| ${key} | `;
          return `<img src="${src}" alt="${tec.trim()}" class="imagem-tecnologia">`;
        })
        .join('');

      item.innerHTML = `
        <div class="item">
          <img src="${projeto['Imagem']}" alt="Imagem do projeto" class="item-imagem">
          <h3 class="item-titulo">${projeto['Nome do Projeto']}</h3>
          <div class="item-tecnologias">${tecnologiasHtml}</div>
        </div>
      `;
      carrossel.appendChild(item);
    });
  })
  .catch(error => {
    console.error("Erro ao carregar os dados:", error);
  });

function preencherHabilidades(){
  for (const [nome, url] of Object.entries(techIcons)){
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

  //document.getElementsByName("linkein").