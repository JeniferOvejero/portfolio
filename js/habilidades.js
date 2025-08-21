import { techIcons } from './dados.js';

export function inicializarHabilidades() {
  const listaHabilidades = document.getElementById("habilidades-lista");
  if (!listaHabilidades) return;

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