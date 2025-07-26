async function carregarEmpresas() {
  const container = document.getElementById('empresa-container');

  const resposta = await fetch('empresas.json');
  const empresas = await resposta.json();

  empresas.forEach(empresa => {
    const card = document.createElement('div');
    card.className = 'card';

    const header = document.createElement('div');
    header.className = 'card-header';

    const img = document.createElement('img');
    var nomeImg = "https://www.google.com/s2/favicons?sz=64&domain=www." + empresa.nome.toLowerCase().replace(/\s+/g, "");
    nomeImg += (empresa.nome != "Ensina Brasil") ? ".com.br" : ".org.br";
    img.src = nomeImg;
    img.alt = empresa.nome;

    const info = document.createElement('div');
    info.className = 'info';

    const nome = document.createElement('h2');
    nome.textContent = empresa.nome;

    const compat = document.createElement('span');
    compat.className = `compatibilidade ${getCorCompat(empresa.compatibilidade)}`;
    compat.textContent = empresa.compatibilidade;

    info.appendChild(nome);
    info.appendChild(compat);

    header.appendChild(img);
    header.appendChild(info);
    card.appendChild(header);

    const body = document.createElement('div');
    body.className = 'card-body';

    body.innerHTML = `
      <p><strong>Missão:</strong> ${empresa.missao}</p>
      <p><strong>Visão:</strong> ${empresa.visao}</p>
      <p><strong>Valores:</strong> ${empresa.valores}</p>
      <p><strong>Outras informações:</strong> ${empresa.descricao}</p>
    `;

    if (empresa.pessoas && empresa.pessoas.length > 0) {
      const pessoasDiv = document.createElement('div');
      pessoasDiv.className = 'pessoas';

      empresa.pessoas.forEach(pessoa => {
        const pessoaCard = document.createElement('div');
        pessoaCard.className = 'pessoa-card';
        pessoaCard.innerHTML = `
          <img src="${pessoa.foto}" alt="${pessoa.nome}" onclick="abrirImagem(this.src)">
          <h4>${pessoa.nome}</h4>
          <p>${pessoa.cargo}</p>
        `;
        pessoasDiv.appendChild(pessoaCard);
      });

      body.appendChild(pessoasDiv);
    }

    card.appendChild(body);

    console.log(`Carregando empresa: ${empresa.nome}`);

    header.addEventListener('click', () => {
      const visible = body.style.display === 'block';
      body.style.display = visible ? 'none' : 'block';
    });

    container.appendChild(card);
  });
}

function abrirImagem(src) {
  // Cria o overlay com desfoque
  const overlay = document.createElement("div");
  overlay.classList.add("imagem-overlay");

  // Cria a imagem ampliada
  const imgAmpliada = document.createElement("img");
  imgAmpliada.src = src;
  imgAmpliada.classList.add("imagem-ampliada");

  // Adiciona a imagem ao overlay
  overlay.appendChild(imgAmpliada);

  // Adiciona overlay ao body
  document.body.appendChild(overlay);

  // Aplica classe de desfoque ao conteúdo principal
  document.body.classList.add("fundo-desfocado");

  // Fecha ao clicar no overlay
  overlay.onclick = () => {
    overlay.remove();
    document.body.classList.remove("fundo-desfocado");
  };
}

function getCorCompat(nivel) {
  switch (nivel.toLowerCase()) {
    case 'alto': return 'cor-alto';
    case 'medio-alto': return 'cor-medio-alto';
    case 'medio': return 'cor-medio';
    default: return 'cor-outros';
  }
}

carregarEmpresas();
