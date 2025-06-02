// Fecha o menu de temas ao clicar fora dele
document.addEventListener("click", function(event) {
    const menu = document.getElementById("theme-menu");
    const toggle = document.getElementById("theme-toggle");
    if (!menu.contains(event.target) && event.target !== toggle) {
        menu.classList.remove("show");
    }
});

// Impede que o clique no toggle feche o menu imediatamente
document.getElementById("theme-toggle").addEventListener("click", function(event) {
    event.stopPropagation();
    const menu = document.getElementById("theme-menu");
    menu.classList.toggle("show");
});

// Função para aplicar efeito visual (pulso) ao botão de tema
function pulseThemeToggle() {
    const toggle = document.getElementById("theme-toggle");
    toggle.classList.add("pulse");
    setTimeout(() => {
        toggle.classList.remove("pulse");
    }, 400);
}

// Alterna para o Tema Claro
document.getElementById("light-theme").addEventListener("click", function() {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
    document.getElementById("theme-menu").classList.remove("show");
    pulseThemeToggle();
});

// Alterna para o Tema Escuro
document.getElementById("dark-theme").addEventListener("click", function() {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
    document.getElementById("theme-menu").classList.remove("show");
    pulseThemeToggle();
});

// Aplica o tema salvo ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
});
