// --- Gerenciamento do Menu de Modos ---

// Abre/fecha o menu de modos ao clicar no botão (canto superior esquerdo)
document.getElementById("mode-toggle").addEventListener("click", function (event) {
    event.stopPropagation(); // Evita que o clique se propague para o document
    const modeMenu = document.getElementById("mode-menu");
    modeMenu.classList.toggle("show");
  });
  
  // Fecha o menu de modos se clicar fora dele
  document.addEventListener("click", function (event) {
    const modeMenu = document.getElementById("mode-menu");
    const modeToggle = document.getElementById("mode-toggle");
    if (!modeMenu.contains(event.target) && event.target !== modeToggle) {
      modeMenu.classList.remove("show");
    }
  });
  
  // --- Funções para Definir os Modos ---
  
  // Modo "Bloco de Notas": Exibe todos os dias lado a lado (grid de 7 colunas)
  function setModeBloco() {
    // Oculta o container do modo Diário, caso exista
    const diaryContainer = document.getElementById("diario-days");
    if (diaryContainer) {
      diaryContainer.style.display = "none";
    }
    const planner = document.querySelector(".planner");
    planner.classList.remove("diario", "lista");
    planner.classList.add("bloco");
    // Assegura que todos os dias estão visíveis
    document.querySelectorAll(".planner .day").forEach(dayDiv => {
      dayDiv.style.display = "block";
    });
    // Salva a escolha no localStorage
    localStorage.setItem("plannerMode", "bloco");
  }
  
  // Modo "Diário": Exibe somente um dia ocupando toda a largura e adiciona botões para seleção
  function setModeDiario() {
    const planner = document.querySelector(".planner");
    planner.classList.remove("bloco", "lista");
    planner.classList.add("diario");
  
    // Cria (ou exibe) o container para os botões dos dias (diary container)
    let diaryContainer = document.getElementById("diario-days");
    if (!diaryContainer) {
      diaryContainer = document.createElement("div");
      diaryContainer.id = "diario-days";
      // Insere o container acima do planner
      document.body.insertBefore(diaryContainer, planner);
    }
    diaryContainer.style.display = "flex";
    diaryContainer.innerHTML = ""; // Limpa qualquer conteúdo anterior
  
    // Define os dias com seu nome, abreviação e o ID correspondente do <ul>
    const days = [
      { name: "Segunda", abbr: "SEG", id: "tasks-segunda" },
      { name: "Terça", abbr: "TER", id: "tasks-terca" },
      { name: "Quarta", abbr: "QUA", id: "tasks-quarta" },
      { name: "Quinta", abbr: "QUI", id: "tasks-quinta" },
      { name: "Sexta", abbr: "SEX", id: "tasks-sexta" },
      { name: "Sábado", abbr: "SAB", id: "tasks-sabado" },
      { name: "Domingo", abbr: "DOM", id: "tasks-domingo" }
    ];
  
    // Para cada dia, cria um botão que, ao ser clicado, exibe somente esse dia
    days.forEach(function (day) {
      const btn = document.createElement("button");
      btn.textContent = day.abbr;
      btn.dataset.day = day.id;
      btn.addEventListener("click", function () {
        // Oculta todos os dias...
        document.querySelectorAll(".planner .day").forEach(dayDiv => {
          dayDiv.style.display = "none";
        });
        // ...e exibe somente o dia correspondente
        const selectedDayUl = document.getElementById(btn.dataset.day);
        if (selectedDayUl) {
          const selectedDayDiv = selectedDayUl.parentElement;
          selectedDayDiv.style.display = "block";
        }
      });
      diaryContainer.appendChild(btn);
    });
  
    // Por padrão, exibe apenas o primeiro dia e oculta os demais
    let firstDayFound = false;
    document.querySelectorAll(".planner .day").forEach(function (dayDiv) {
      if (!firstDayFound) {
        dayDiv.style.display = "block";
        firstDayFound = true;
      } else {
        dayDiv.style.display = "none";
      }
    });
    // Salva a escolha
    localStorage.setItem("plannerMode", "diario");
  }
  
  // Modo "Lista": Altera o layout para uma lista vertical onde cada dia preenche a tela inteira
  function setModeLista() {
    // Oculta o container do modo Diário, se existir
    const diaryContainer = document.getElementById("diario-days");
    if (diaryContainer) {
      diaryContainer.style.display = "none";
    }
    const planner = document.querySelector(".planner");
    planner.classList.remove("diario", "bloco");
    planner.classList.add("lista");
    // Garante que todos os dias estejam visíveis
    document.querySelectorAll(".planner .day").forEach(dayDiv => {
      dayDiv.style.display = "block";
    });
    // Salva a escolha
    localStorage.setItem("plannerMode", "lista");
  }
  
  // --- Eventos dos Botões do Menu de Modos ---
  
  document.getElementById("mode-bloco").addEventListener("click", function () {
    setModeBloco();
    document.getElementById("mode-menu").classList.remove("show");
  });
  
  document.getElementById("mode-diario").addEventListener("click", function () {
    setModeDiario();
    document.getElementById("mode-menu").classList.remove("show");
  });
  
  document.getElementById("mode-lista").addEventListener("click", function () {
    setModeLista();
    document.getElementById("mode-menu").classList.remove("show");
  });
  
  // --- Carregamento do Último Modo Selecionado ---
  // Ao iniciar a página, recupera o modo salvo ou, por padrão, usa o modo "bloco"
  document.addEventListener("DOMContentLoaded", function () {
    const savedMode = localStorage.getItem("plannerMode") || "bloco";
    if (savedMode === "diario") {
      setModeDiario();
    } else if (savedMode === "lista") {
      setModeLista();
    } else {
      setModeBloco();
    }
  });
  
