document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".add-task").forEach(button => {
        button.addEventListener("click", function () {
            let dayId = this.getAttribute("data-day");
            let taskList = document.getElementById(dayId);
            let newTask = createTaskItem();
            taskList.appendChild(newTask);
            saveTasks();
        });
    });

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

        // Evento para marcar/desmarcar tarefa como feita
        checkbox.addEventListener("change", () => {
            taskText.classList.toggle("completed", checkbox.checked);
            saveTasks();
        });

        // Evento para editar o texto da tarefa
        taskText.addEventListener("input", saveTasks);

        // Evento para excluir a tarefa
        deleteButton.addEventListener("click", function () {
            li.remove(); // Remove a tarefa da lista visualmente
            saveTasks(); // Atualiza o localStorage corretamente
        });

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteButton); // Adiciona a lixeira à tarefa
        return li;
    }

    function saveTasks() {
        let allTasks = {};

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

        localStorage.setItem("tasks_data", JSON.stringify(allTasks));
    }

    function loadTasks() {
        let savedData = JSON.parse(localStorage.getItem("tasks_data") || "{}");

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

    loadTasks(); // Carrega todas as tarefas ao iniciar a página
});
function showToast(message, duration = 3000) {
    // Verifica se o container de toast já existe
    let toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "toast-container";
        document.body.appendChild(toastContainer);
    }

    // Cria a notificação
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    toastContainer.appendChild(toast);

    // Após (duration - 500) milissegundos, inicia o fade out
    setTimeout(() => {
        toast.style.opacity = 0;
        toast.style.transform = "translateY(20px)";
    }, duration - 500);

    // Remove a toast do DOM após o tempo total especificado
    setTimeout(() => {
        toast.remove();
    }, duration);
}
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
deleteButton.addEventListener("click", function () {
    li.remove();
    saveTasks();
    showToast("Tarefa excluída!");
});
