document.getElementById("theme-toggle").addEventListener("click", function() {
    let menu = document.getElementById("theme-menu");
    
    if (menu.classList.contains("show")) {
        menu.classList.remove("show"); // Esconde o menu
    } else {
        menu.classList.add("show"); // Mostra o menu
    }
});

document.getElementById("light-theme").addEventListener("click", function() {
    document.body.classList.remove("dark-mode");
    document.getElementById("theme-menu").classList.remove("show");
});

document.getElementById("dark-theme").addEventListener("click", function() {
    document.body.classList.add("dark-mode");
    document.getElementById("theme-menu").classList.remove("show");
});
document.addEventListener("DOMContentLoaded", function () {
    // Carregar dados salvos no localStorage
    document.querySelectorAll(".day textarea").forEach((textarea, index) => {
        const savedData = localStorage.getItem("planner_" + index);
        if (savedData) {
            textarea.value = savedData;
        }

        // Salvar ao digitar
        textarea.addEventListener("input", function () {
            localStorage.setItem("planner_" + index, textarea.value);
        });
    });
});
