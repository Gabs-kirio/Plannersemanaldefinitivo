// --- Gerenciamento do Hábito ---
document.getElementById("save-habit").addEventListener("click", function () {
    let habitText = document.getElementById("habit-input").value.trim();
    if (habitText !== "") {
        localStorage.setItem("userHabit", habitText);
        displayHabit();
    }
});

// Exibir hábito salvo ao carregar a página
function displayHabit() {
    let savedHabit = localStorage.getItem("userHabit");
    if (savedHabit) {
        document.getElementById("habit-display").textContent = `📌 Hábito: ${savedHabit}`;
    } else {
        document.getElementById("habit-display").textContent = "";
    }
}

// Carregar hábito salvo ao iniciar a página
document.addEventListener("DOMContentLoaded", displayHabit);


// Fecha o menu de funções ao clicar fora dele
document.addEventListener("click", function (event) {
    const functionMenu = document.getElementById("function-menu");
    const functionToggle = document.getElementById("function-toggle");
    if (!functionMenu.contains(event.target) && event.target !== functionToggle) {
        functionMenu.classList.remove("show");
    }
});

// --- Alternar Entre Planner e Modo Hábito ---
document.getElementById("mode-planner").addEventListener("click", function () {
    document.getElementById("habit-container").classList.add("hidden");
    document.getElementById("planner-container").classList.remove("hidden");
    localStorage.setItem("functionMode", "planner"); // Salva a escolha
});

document.getElementById("mode-habit").addEventListener("click", function () {
    document.getElementById("planner-container").classList.add("hidden");
    document.getElementById("habit-container").classList.remove("hidden");
    localStorage.setItem("functionMode", "habit"); // Salva a escolha
});

// --- Persistência da Função Selecionada ---
document.addEventListener("DOMContentLoaded", function () {
    const savedFunction = localStorage.getItem("functionMode") || "planner";
    if (savedFunction === "habit") {
        document.getElementById("planner-container").classList.add("hidden");
        document.getElementById("habit-container").classList.remove("hidden");
    } else {
        document.getElementById("habit-container").classList.add("hidden");
        document.getElementById("planner-container").classList.remove("hidden");
    }
});

// --- Contador de Tempo no Modo Hábito ---
let habitStartTime = null;
let habitTimerInterval = null;

document.getElementById("start-counter").addEventListener("click", function () {
    habitStartTime = new Date();
    localStorage.setItem("habitStartTime", habitStartTime.getTime());
    startHabitTimer();
});

document.getElementById("reset-counter").addEventListener("click", function () {
    localStorage.removeItem("habitStartTime");
    document.getElementById("time-display").textContent = "0 dias, 00:00:00";
    clearInterval(habitTimerInterval);
});

function startHabitTimer() {
    clearInterval(habitTimerInterval);
    habitTimerInterval = setInterval(function () {
        if (!habitStartTime) {
            habitStartTime = new Date(parseInt(localStorage.getItem("habitStartTime")));
        }
        const now = new Date();
        const diff = now - habitStartTime;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("time-display").textContent = `${days} dias, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Carregar contagem ao iniciar
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("habitStartTime")) {
        habitStartTime = new Date(parseInt(localStorage.getItem("habitStartTime")));
        startHabitTimer();
    }
});
// --- Gerenciamento do Hábito ---
document.getElementById("save-habit").addEventListener("click", function () {
    let habitText = document.getElementById("habit-input").value.trim();
    if (habitText !== "") {
        localStorage.setItem("userHabit", habitText);
        displayHabit();
    }
});

// Exibir hábito salvo ao carregar a página
function displayHabit() {
    let savedHabit = localStorage.getItem("userHabit");
    if (savedHabit) {
        document.getElementById("habit-display").textContent = `📌 Hábito: ${savedHabit}`;
    } else {
        document.getElementById("habit-display").textContent = "";
    }
}

// Carregar hábito salvo ao iniciar a página
document.addEventListener("DOMContentLoaded", displayHabit);
