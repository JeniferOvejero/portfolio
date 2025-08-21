import { inicializarCarrossel } from './carrossel.js';
import { inicializarHabilidades } from './habilidades.js';
import { inicializarContato } from './contato.js';

document.addEventListener('DOMContentLoaded', () => {
  inicializarCarrossel();
  inicializarHabilidades();
  inicializarContato();
});