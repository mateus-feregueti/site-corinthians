document.addEventListener("DOMContentLoaded", () => {
    const navbarNav = document.querySelector(".navbar-nav");
    
    if (navbarNav) {
        // Cria o botão de alternar tema na navbar
        const liModo = document.createElement("li");
        liModo.className = "nav-item d-flex align-items-center ms-lg-3 mt-2 mt-lg-0";
        
        liModo.innerHTML = `
            <button id="btn-tema" class="btn btn-sm d-flex align-items-center gap-2">
                <span id="tema-icone">☀️</span> <span id="tema-texto">Modo Claro</span>
            </button>
        `;
        
        navbarNav.appendChild(liModo);

        const btnTema = document.getElementById("btn-tema");
        const temaIcone = document.getElementById("tema-icone");
        const temaTexto = document.getElementById("tema-texto");

        const navbar = document.querySelector(".navbar");
        const footer = document.querySelector("footer");

        function aplicarTema(tema) {
            document.documentElement.setAttribute("data-bs-theme", tema);
            localStorage.setItem("tema", tema);

            const botoesPagina = document.querySelectorAll("button:not(#btn-tema)");

            if (tema === "dark") {
                temaIcone.innerText = "☀️";
                temaTexto.innerText = "Modo Claro";

                // Botões gerais do site ficam brancos no modo escuro
                botoesPagina.forEach(botao => {
                    botao.classList.remove("btn-dark");
                    botao.classList.add("btn-light");
                });

                // Navbar e Footer ganham o tom ultra escuro de destaque
                navbar.classList.add("bg-super-dark");
                footer.classList.add("bg-super-dark");

            } else {
                temaIcone.innerText = "🌙";
                temaTexto.innerText = "Modo Escuro";

                // Botões gerais do site voltam a ser pretos no modo claro
                botoesPagina.forEach(botao => {
                    botao.classList.remove("btn-light");
                    botao.classList.add("btn-dark");
                });

                // Navbar e Footer voltam para o bg-dark padrão do seu HTML original
                navbar.classList.remove("bg-super-dark");
                footer.classList.remove("bg-super-dark");
            }
        }

        const temaSalvo = localStorage.getItem("tema") || "dark";
        aplicarTema(temaSalvo);

        btnTema.addEventListener("click", () => {
            const temaAtual = document.documentElement.getAttribute("data-bs-theme");
            const novoTema = temaAtual === "dark" ? "light" : "dark";
            aplicarTema(novoTema);
        });
    }
});