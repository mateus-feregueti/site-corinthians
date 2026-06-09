// Banco de dados com as perguntas do quiz
const perguntas = [
    {
        pergunta: "Em que ano o Corinthians foi fundado?",
        alternativas: { A: "1908", B: "1910", C: "1912", D: "1914" },
        correta: "B"
    },
    {
        pergunta: "Qual é o nome oficial do Corinthians?",
        alternativas: { A: "Sport Club Corinthians Paulista", B: "Clube Corinthians Paulista", C: "Sociedade Corinthians Paulista", D: "Associação Corinthians Paulista" },
        correta: "A"
    },
    {
        pergunta: "Qual destes apelidos pertence ao Corinthians?",
        alternativas: { A: "Tricolor", B: "Peixe", C: "Timão", D: "Raposa" },
        correta: "C"
    },
    {
        pergunta: "Qual estádio é a casa do Corinthians?",
        alternativas: { A: "Morumbi", B: "Allianz Parque", C: "Neo Química Arena", D: "Pacaembu" },
        correta: "C"
    },
    {
        pergunta: "Qual é a cor predominante do uniforme principal do Corinthians?",
        alternativas: { A: "Verde", B: "Azul", C: "Preto e branco", D: "Vermelho e preto" },
        correta: "C"
    }
];

let indiceAtual = 0;
let pontuacao = 0;

// Mapeamento dos elementos do HTML
const campoPergunta = document.getElementById("pergunta");
const formOpcoes = document.getElementById("opcoes-form");
const btnEnviar = document.getElementById("btn-enviar");

// Função responsável por renderizar a pergunta atual na tela
function carregarPergunta() {
    // Limpa o formulário de alternativas anteriores
    formOpcoes.innerHTML = "";
    
    // Se chegou ao fim do array de perguntas, exibe o resultado final
    if (indiceAtual >= perguntas.length) {
        campoPergunta.innerText = `Fim do Quiz! Você acertou ${pontuacao} de ${perguntas.length} perguntas.`;
        btnEnviar.style.display = "none"; 
        return;
    }

    // Obtém os dados da pergunta atual
    const dadosPergunta = perguntas[indiceAtual];
    campoPergunta.innerText = `${indiceAtual + 1}. ${dadosPergunta.pergunta}`;

    // Cria as opções de radio usando a estrutura de classes do Bootstrap
    for (const [letra, texto] of Object.entries(dadosPergunta.alternativas)) {
        const divOpcao = document.createElement("div");
        divOpcao.className = "form-check mb-2"; // Classes do Bootstrap para estilizar o radio
        
        divOpcao.innerHTML = `
            <input class="form-check-input" type="radio" id="opcao${letra}" name="resposta" value="${letra}">
            <label class="form-check-label" for="opcao${letra}">
                <strong>${letra})</strong> ${texto}
            </label>
        `;
        formOpcoes.appendChild(divOpcao);
    }
}

// Evento de clique do botão Enviar
btnEnviar.addEventListener("click", () => {
    // Captura qual alternativa foi assinalada
    const radioSelecionado = document.querySelector('input[name="resposta"]:checked');

    // Validação caso o usuário tente avançar sem responder
    if (!radioSelecionado) {
        alert("Por favor, selecione uma alternativa antes de continuar!");
        return;
    }

    const respostaUsuario = radioSelecionado.value;
    const respostaCorreta = perguntas[indiceAtual].correta;

    // Janela de prompt/alert informando se a resposta está certa ou errada
    if (respostaUsuario === respostaCorreta) {
        alert("Resposta CORRETA! Parabéns! 🎉");
        pontuacao++;
    } else {
        alert(`Resposta INCORRETA! ❌ A alternativa certa era a (${respostaCorreta}).`);
    }

    // Avança para o próximo índice e atualiza o container
    indiceAtual++;
    carregarPergunta();
});

// Executa a função pela primeira vez assim que a página carrega
carregarPergunta();