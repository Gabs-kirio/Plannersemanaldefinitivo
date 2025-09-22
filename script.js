 // Carregar tarefas salvas
    const tarefas = JSON.parse(localStorage.getItem("planner")) || {};

    function salvar() {
      localStorage.setItem("planner", JSON.stringify(tarefas));
    }

    function renderizar(dia) {
      const ul = document.querySelector(`.dia[data-dia="${dia}"] ul`);
      ul.innerHTML = "";
      (tarefas[dia] || []).forEach((tarefa, index) => {
        const li = document.createElement("li");
        if (tarefa.feita) li.classList.add("concluida");

        const span = document.createElement("span");
        span.textContent = tarefa.texto;
        span.onclick = () => {
          tarefa.feita = !tarefa.feita;
          salvar();
          renderizar(dia);
        };

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "🗑️";
        btnExcluir.onclick = () => {
          tarefas[dia].splice(index, 1);
          salvar();
          renderizar(dia);
        };

        li.appendChild(span);
        li.appendChild(btnExcluir);
        ul.appendChild(li);
      });
    }

    document.querySelectorAll(".dia").forEach(diaEl => {
      const dia = diaEl.dataset.dia;

      // Garantir que o dia existe no objeto
      if (!tarefas[dia]) tarefas[dia] = [];

      // Adicionar tarefa
      diaEl.querySelector(".adicionar button").onclick = () => {
        const input = diaEl.querySelector("input");
        if (input.value.trim() !== "") {
          tarefas[dia].push({ texto: input.value, feita: false });
          input.value = "";
          salvar();
          renderizar(dia);
        }
      };

      // Limpar todas tarefas do dia
      diaEl.querySelector(".limpar-dia").onclick = () => {
        if (confirm("Tem certeza que deseja apagar todas as tarefas de " + dia + "?")) {
          tarefas[dia] = [];
          salvar();
          renderizar(dia);
        }
      };

      renderizar(dia);
    });
