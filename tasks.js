// Função para criar um item de tarefa (li)
function createTaskItem(text = "Nova Tarefa", completed = false) {
  let li = document.createElement("li");
  let checkbox = document.createElement("input");
  let taskText = document.createElement("span");
  let deleteButton = document.createElement("button"); // Botão da lixeira

  checkbox.type = "checkbox";
  checkbox.checked = completed;
  taskText.textContent = text;
  taskText.contentEditable = "true";
  deleteButton.textContent = "🗑️"; // Ícone de lixeira
  deleteButton.classList.add("delete-task");

  if (completed) taskText.classList.add("completed");

  // Evento para marcar/desmarcar tarefa
  checkbox.addEventListener("change", () => {
    taskText.classList.toggle("completed", checkbox.checked);
    saveTasks();
  });

  // Evento para editar o texto da tarefa
  taskText.addEventListener("input", saveTasks);

  // Evento para excluir a tarefa
  deleteButton.addEventListener("click", function () {
    li.remove();
    saveTasks();
    showToast("Tarefa excluída!");
  });

  li.appendChild(checkbox);
  li.appendChild(taskText);
  li.appendChild(deleteButton);
  return li;
}

// Função para salvar as tarefas do usuário logado
function saveTasks() {
  let allTasks = {};

  // Percorre cada lista de tarefas de cada dia
  document.querySelectorAll(".day ul").forEach(taskList => {
    let tasks = [];
    taskList.querySelectorAll("li").forEach(li => {
      tasks.push({
        text: li.querySelector("span").textContent,
        completed: li.querySelector("input").checked
      });
    });
    allTasks[taskList.id] = tasks;
  });

  let loggedUser = sessionStorage.getItem("loggedUser");
  if (loggedUser) {
    let userData = JSON.parse(localStorage.getItem(loggedUser)) || {};
    userData.plannerData = userData.plannerData || {};
    userData.plannerData.tasks_data = allTasks;
    localStorage.setItem(loggedUser, JSON.stringify(userData));
  }
}

// Função para carregar as tarefas do usuário logado
function loadTasks() {
  let loggedUser = sessionStorage.getItem("loggedUser");
  if (!loggedUser) return;
  let userData = JSON.parse(localStorage.getItem(loggedUser));
  let savedData = (userData.plannerData && userData.plannerData.tasks_data) || {};

  // Limpa as listas atuais antes de carregar as tarefas salvas
  document.querySelectorAll(".day ul").forEach(taskList => {
    taskList.innerHTML = "";
  });

  Object.keys(savedData).forEach(dayId => {
    let taskList = document.getElementById(dayId);
    if (taskList) {
      savedData[dayId].forEach(task => {
        let taskItem = createTaskItem(task.text, task.completed);
        taskList.appendChild(taskItem);
      });
    }
  });
}

// Função de toast para exibir notificações rápidas
function showToast(message, duration = 3000) {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = 0;
    toast.style.transform = "translateY(20px)";
  }, duration - 500);

  setTimeout(() => {
    toast.remove();
  }, duration);
}

document.addEventListener("DOMContentLoaded", function () {
  // Configura eventos para os botões de "adicionar tarefa"
  document.querySelectorAll(".add-task").forEach(button => {
    button.addEventListener("click", function () {
      let dayId = this.getAttribute("data-day");
      let taskList = document.getElementById(dayId);
      let newTask = createTaskItem();
      taskList.appendChild(newTask);
      saveTasks();
      showToast("Tarefa adicionada!");
    });
  });

  // Se já houver um usuário logado (persistência de sessão), carrega as tarefas
  if (sessionStorage.getItem("loggedUser")) {
    loadTasks();
  }
});
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
  document.getElementById("login-overlay").style.display = "none";
  
  // Após login, carrega as tarefas associadas a essa conta
  loadTasks();
});
