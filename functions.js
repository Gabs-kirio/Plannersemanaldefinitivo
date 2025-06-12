// Salvar Hábito com personalização
document.getElementById("save-habit").addEventListener("click", function () {
  let habitText = document.getElementById("habit-input").value.trim();
  let habitColor = document.getElementById("habit-color").value;
  let habitIcon = document.getElementById("habit-icon").value;
  let habitCategory = document.getElementById("habit-category").value.trim();

  if (habitText !== "") {
    // Recupera o array de hábitos ou cria um novo
    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    habits.push({
      text: habitText,
      color: habitColor,
      icon: habitIcon,
      category: habitCategory,
      days: 0,
      lastMarkedDate: ""
    });
    localStorage.setItem("habits", JSON.stringify(habits));
    displayHabits();

    // Limpa os campos de entrada
    document.getElementById("habit-input").value = "";
    document.getElementById("habit-category").value = "";
  }
});

// Exibir hábitos salvos
function displayHabits() {
  let habits = JSON.parse(localStorage.getItem("habits")) || [];
  let habitList = document.getElementById("habit-list");
  habitList.innerHTML = ""; // Limpa a lista antes de recriar os itens

  habits.forEach((habit, index) => {
    // Cria o container de cada hábito
    let habitItem = document.createElement("div");
    habitItem.classList.add("habit-item");

    habitItem.innerHTML = `
      <button class="delete-habit" onclick="deleteHabit(${index})">🗑️</button>
      <p class="habit-text" style="color: ${habit.color};">${habit.icon} ${habit.text}</p>
      <p class="habit-category"><strong>Categoria:</strong> ${habit.category || "Sem categoria"}</p>
      <p class="habit-days">🔥 Dias consecutivos: <span id="habit-days-${index}">${habit.days}</span></p>
      <button class="mark-habit" id="mark-habit-${index}" onclick="markHabit(${index})">Marcar Hábito</button>
    `;

    habitList.appendChild(habitItem);
    checkResetHabit(index, habit.lastMarkedDate);
  });
}

// Marcar Hábito
function markHabit(index) {
  let habits = JSON.parse(localStorage.getItem("habits")) || [];
  let today = new Date().toISOString().split("T")[0];

  habits[index].days += 1;
  habits[index].lastMarkedDate = today;
  localStorage.setItem("habits", JSON.stringify(habits));

  document.getElementById(`habit-days-${index}`).textContent = habits[index].days;
  document.getElementById(`mark-habit-${index}`).disabled = true;
}

// Verifica se deve resetar o contador se não for marcado até 0:00
function checkResetHabit(index, lastMarkedDate) {
  let today = new Date().toISOString().split("T")[0];
  let habits = JSON.parse(localStorage.getItem("habits")) || [];

  if (lastMarkedDate && lastMarkedDate !== today) {
    habits[index].days = 0;
    habits[index].lastMarkedDate = "";
    localStorage.setItem("habits", JSON.stringify(habits));
    document.getElementById(`habit-days-${index}`).textContent = "0";
  }

  // Libera o botão se for um novo dia
  if (lastMarkedDate !== today) {
    document.getElementById(`mark-habit-${index}`).disabled = false;
  } else {
    document.getElementById(`mark-habit-${index}`).disabled = true;
  }
}

// Excluir Hábito individualmente
function deleteHabit(index) {
  let habits = JSON.parse(localStorage.getItem("habits")) || [];
  habits.splice(index, 1);
  localStorage.setItem("habits", JSON.stringify(habits));
  displayHabits();
}

// Carrega os hábitos salvos ao iniciar a página
document.addEventListener("DOMContentLoaded", displayHabits);
// Função auxiliar: retorna o nome do dia da semana para uma data
function getDayName(date) {
  const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  return days[date.getDay()];
}

// Função para atualizar ou somar moedas
function updateCoins(coinsToAdd) {
  let coins = parseInt(localStorage.getItem("coins")) || 0;
  coins += coinsToAdd;
  localStorage.setItem("coins", coins);
  document.getElementById("coins-count").textContent = coins;
}

// Chamada para atualizar a exibição das moedas na carga da página
function updateCoinsDisplay() {
  let coins = localStorage.getItem("coins") || 0;
  document.getElementById("coins-count").textContent = coins;
}

// Função para atualizar a contagem diária de hábitos
function updateDailyHabits() {
  let dailyHabits = JSON.parse(localStorage.getItem("dailyHabits")) || {};
  let todayName = getDayName(new Date());
  dailyHabits[todayName] = (dailyHabits[todayName] || 0) + 1;
  localStorage.setItem("dailyHabits", JSON.stringify(dailyHabits));
}

// --- Atualização do gráfico com Chart.js ---
let habitsChart;  // Variável global para manter a instância do gráfico
function updateChart() {
  // Recupera os dados diários do localStorage
  let dailyHabits = JSON.parse(localStorage.getItem("dailyHabits")) || {};
  // Garante que todos os dias tenham um valor (0 se não houver dados)
  const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  const dataCounts = days.map(day => dailyHabits[day] || 0);

  const ctx = document.getElementById("habits-chart").getContext("2d");

  if (habitsChart) {
    // Se o gráfico já foi criado, apenas atualize os dados
    habitsChart.data.datasets[0].data = dataCounts;
    habitsChart.update();
  } else {
    // Cria o gráfico de linhas
    habitsChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: days,
        datasets: [{
          label: 'Hábitos Completados por Dia',
          data: dataCounts,
          borderColor: 'blue',
          backgroundColor: 'lightblue',
          fill: false,
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }
}

// Exemplo de função de "Marcar Hábito" (adaptar à sua lógica existente)
// Aqui, além de atualizar o contador do hábito, também atualizamos moedas e o registro diário.
function markHabit(index) {
  let habits = JSON.parse(localStorage.getItem("habits")) || [];
  let today = new Date().toISOString().split("T")[0];

  habits[index].days += 1;
  habits[index].lastMarkedDate = today;
  localStorage.setItem("habits", JSON.stringify(habits));

  document.getElementById(`habit-days-${index}`).textContent = habits[index].days;
  document.getElementById(`mark-habit-${index}`).disabled = true;

  // Adiciona moedas (exemplo: 10 moedas por marcação)
  updateCoins(10);

  // Atualiza a contagem de hábitos do dia e o gráfico
  updateDailyHabits();
  updateChart();
}

// Na carga da página, atualiza a exibição de moedas e o gráfico
document.addEventListener("DOMContentLoaded", function () {
  updateCoinsDisplay();
  updateChart();
  // Também chame aqui sua função displayHabits() se houver hábitos salvos...
});
// Solicita permissão para notificações
if (Notification.permission === "default") {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            new Notification("Olá, Gabriel!", {
                body: "Vai fazer esses habitos carai!",
                icon: "caminho/para/o/icone.png"
            });
        }
    });
}
// Abre/fecha o menu da loja ao clicar no botão de Loja
document.getElementById("store-toggle").addEventListener("click", function (event) {
  event.stopPropagation();
  var storeMenu = document.getElementById("store-menu");
  storeMenu.classList.toggle("show");
});

// Fecha o menu da loja se clicar fora dele
document.addEventListener("click", function (event) {
  var storeMenu = document.getElementById("store-menu");
  var storeToggle = document.getElementById("store-toggle");
  if (!storeMenu.contains(event.target) && event.target !== storeToggle) {
    storeMenu.classList.remove("show");
  }
});

// Processa a compra do item Wanderley
document.getElementById("buy-wanderley").addEventListener("click", function () {
  // Obtém as moedas armazenadas (ou 0 se não existirem)
  let coins = parseInt(localStorage.getItem("coins")) || 0;
  
  if (coins >= 10) {
    coins -= 10;
    localStorage.setItem("coins", coins);
    alert("Compra do Wanderley realizada com sucesso!");
    // Se houver, atualize a exibição de moedas (ex.: elemento com id "coins-count")
    if (document.getElementById("coins-count")) {
      document.getElementById("coins-count").textContent = coins;
    }
  } else {
    alert("Você não tem moedas suficientes.");
  }
});
// Alternar entre telas de Login e Registro
document.getElementById("show-register").addEventListener("click", function () {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("register-screen").classList.remove("hidden");
});

document.getElementById("show-login").addEventListener("click", function () {
    document.getElementById("register-screen").classList.add("hidden");
    document.getElementById("login-screen").classList.remove("hidden");
});

// Registro de Usuário
document.getElementById("register-button").addEventListener("click", function () {
    let email = document.getElementById("register-email").value.trim();
    let password = document.getElementById("register-password").value.trim();

    if (email === "" || password === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (localStorage.getItem(email)) {
        alert("Este e-mail já está registrado!");
        return;
    }

    let userData = {
        password: password,
        plannerData: {}  // Dados do planner (separados por usuário)
    };
    localStorage.setItem(email, JSON.stringify(userData));
    alert("Conta criada com sucesso! Faça login.");
    document.getElementById("register-screen").classList.add("hidden");
    document.getElementById("login-screen").classList.remove("hidden");
});

// Login de Usuário
document.getElementById("login-button").addEventListener("click", function () {
    let email = document.getElementById("login-email").value.trim();
    let password = document.getElementById("login-password").value.trim();

    if (email === "" || password === "") {
        alert("Preencha todos os campos!");
        return;
    }

    let userData = JSON.parse(localStorage.getItem(email));
    if (!userData || userData.password !== password) {
        alert("E-mail ou senha incorretos!");
        return;
    }

    sessionStorage.setItem("loggedUser", email);

    alert("Login realizado com sucesso!");
    // Oculta o overlay de login e libera o conteúdo do planner
    document.getElementById("login-overlay").style.display = "none";
});

// Verifica se o usuário já está logado na carga da página
document.addEventListener("DOMContentLoaded", function () {
    let loggedUser = sessionStorage.getItem("loggedUser");
    if (loggedUser) {
        document.getElementById("login-overlay").style.display = "none";
    } else {
        // Se não houver usuário logado, garante que o overlay está visível
        document.getElementById("login-overlay").style.display = "flex";
    }
});
