import { techIcons } from './dados.js';

export function inicializarCarrossel() {
  const carrossel = document.getElementById('carrossel-slides');
  const carregandoItem = document.getElementById("itens-carregando");
  if (!carrossel || !carregandoItem) return;

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
    const totalItens = carrossel.querySelectorAll('.carrossel-item').length;
    const visiveis = Math.round(carrossel.parentElement.offsetWidth / itemLargura);
    
    index += direcao;
    if (index < 0) index = 0;
    const maxIndex = totalItens - visiveis;
    if (index > maxIndex) {
      index = maxIndex > 0 ? maxIndex : 0;
    }
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

  const btnAnterior = document.querySelector('.btn-navegacao.esquerda');
  const btnProximo = document.querySelector('.btn-navegacao.direita');
  if (btnAnterior && btnProximo) {
    btnAnterior.addEventListener('click', () => moverCarrossel(-1));
    btnProximo.addEventListener('click', () => moverCarrossel(1));
  }
}