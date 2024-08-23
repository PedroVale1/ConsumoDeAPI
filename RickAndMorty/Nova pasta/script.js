const container = document.querySelector("#container");
const searchInput = document.querySelector("#search");

let lista_de_personagens = []; // Variável para armazenar os personagens

async function buscarPersonagens() {
    try {
        const resposta = await fetch("https://rickandmortyapi.com/api/character");
        const dados = await resposta.json();
        lista_de_personagens = dados.results; // Armazena os dados dos personagens

        exibirPersonagens(lista_de_personagens); // Exibe todos os personagens inicialmente
    } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
    }
}

function exibirPersonagens(personagens) {
    container.innerHTML = ""; // Limpa o container antes de adicionar novos cartões

    personagens.forEach(personagemDaVez => {
        // Criar a div para o personagem
        const novoCard = document.createElement("div");
        novoCard.classList.add("personagem-card"); // Adiciona uma classe para estilizar

        // Preencher a div com o conteúdo HTML
        novoCard.innerHTML = `
            <h2>Nome: ${personagemDaVez.name}</h2>
            <p>Espécie: ${personagemDaVez.species}</p>
            <p>Status: ${personagemDaVez.status}</p>
            <p>Gênero: ${personagemDaVez.gender}</p>
            <img src="${personagemDaVez.image}" alt="${personagemDaVez.name}" style="width: 100px; height: 100px;">
        `;

        // Adicionar a div ao container
        container.appendChild(novoCard);
    });
}

// Função para filtrar personagens com base no texto da pesquisa
function filtrarPersonagens() {
    const textoPesquisa = searchInput.value.toLowerCase(); // Obtém o texto da pesquisa e converte para minúsculas
    const personagensFiltrados = lista_de_personagens.filter(personagem =>
        personagem.name.toLowerCase().includes(textoPesquisa)
    ); // Filtra os personagens com base no texto da pesquisa

    exibirPersonagens(personagensFiltrados); // Exibe os personagens filtrados
}

// Adiciona um ouvinte de eventos ao campo de pesquisa
searchInput.addEventListener("input", filtrarPersonagens);

buscarPersonagens(); // Chama a função para buscar e exibir os personagens
