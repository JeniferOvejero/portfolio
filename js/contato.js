export function inicializarContato() {
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
}