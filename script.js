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
