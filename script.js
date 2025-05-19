const carrossel = document.getElementById('carrossel-slides');
const itemLargura = 700 + 48;

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

 // Carregar dados do Google Sheets via Web App
  const techIcons = {
  figma: "https://profilinator.rishav.dev/skills-assets/figma-icon.svg",
  sass: "https://profilinator.rishav.dev/skills-assets/sass-original.svg",
  html: "https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg",
  css: "https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg",
  javascript: "https://profilinator.rishav.dev/skills-assets/javascript-original.svg"
};

fetch("https://script.google.com/macros/s/AKfycbxFJ1GHzO_tb0AQUE1aYXp7ha8Lz1hCkD_u0fe0J7OpoZQTHnhqIZ9HLi7ZJYV8c6idmA/exec")
  .then(response => response.json())
  .then(dados => {
    dados.forEach(projeto => {
      const item = document.createElement("div");
      item.className = "carrossel-item";

      const tecnologiasHtml = projeto['Tecnologias']
        .split(',')
        .map(tec => {
          const key = tec.trim().toLowerCase();
          const src = techIcons[key] || "";
          if (!src) return ''; // se não encontrar o ícone, não exibe nada
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
