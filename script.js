const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const editForm = document.getElementById("edit-form");
const editInput = document.getElementById("edit-input");
const cancelEditBtn = document.getElementById("cancel-edit-btn");
const searchInput = document.getElementById("search-input");
const eraseBtn = document.getElementById("erase-button");
const filterBtn = document.getElementById("filter-select");
const editBtn = document.getElementById('edit-todo');

let oldInputValue;

const loadTarefas = () => {
    try {
        todoList.innerHTML = "<h2>Tarefas:</h2>";

        arrayDeTarefas.forEach((tarefa) => {
            exibirTarefa(tarefa);
        });
    } catch (error) {
        console.error("Erro ao carregar tarefas: ", error);
        alert("Ocorreu um erro ao carregar as tarefas.");
    }
};

const exibirTarefa = (tarefa) => {
    try {
        const todo = document.createElement("div");
        todo.classList.add("todo");

        if (tarefa.done) {
            todo.classList.add("done");
        }

        const tituloTarefa = document.createElement("h3");
        tituloTarefa.innerText = tarefa.titulo;
        todo.appendChild(tituloTarefa);

        const doneBtn = document.createElement("button");
        doneBtn.classList.add("finish-todo");
        doneBtn.innerHTML = `<i class="far fa-check-circle"></i>`;
        doneBtn.dataset.tooltip = "Marcar como feita";
        todo.appendChild(doneBtn);

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-todo");
        editBtn.innerHTML = `<i class="far fa-edit"></i>`;
        editBtn.dataset.tooltip = "Editar";
        todo.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("remove-todo");
        deleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;
        deleteBtn.dataset.tooltip = "Excluir";
        todo.appendChild(deleteBtn);

        todoList.appendChild(todo);
        todoInput.value = "";
    } catch (error) {
        console.error("Erro ao exibir tarefa: ", error);
        alert("Ocorreu um erro ao exibir a tarefa.");
    }
};


const toggleForms = () => {
    try {
        editForm.classList.toggle("hidden");
        todoForm.classList.toggle("hidden");
        todoList.classList.toggle("hidden");
    } catch (error) {
        console.error("Erro ao alternar formulários: ", error);
        alert("Ocorreu um erro ao alternar os formulários.");
    }
};

const editarTarefa = (tarefaASerEditada) => {
    try {
        const novoValorDaTarefa = editInput.value;

        arrayDeTarefas = arrayDeTarefas.map((tarefa) => {
            if (tarefa.titulo === tarefaASerEditada) {
                tarefa.titulo = novoValorDaTarefa;
            }
            return tarefa;
        });

        loadTarefas();
    } catch (error) {
        console.error("Erro ao editar tarefa: ", error);
        alert("Ocorreu um erro ao editar a tarefa.");
    }
};

const busca = (search) => {
    try {
        const todos = document.querySelectorAll(".todo");

        todos.forEach((todo) => {
            let todoTitle = todo.querySelector("h3").innerText.toLowerCase();
            const normalizedSearch = search.toLowerCase();

            todo.style.display = "flex";

            if (!todoTitle.includes(normalizedSearch)) {
                todo.style.display = "none";
            }
        });
    } catch (error) {
        console.error("Erro ao buscar tarefa: ", error);
        alert("Ocorreu um erro ao buscar a tarefa.");
    }
};

const filtro = (valorDoFiltro) => {
    try {
        const tarefas = document.querySelectorAll(".todo");

        switch (valorDoFiltro) {
            case "all":
                tarefas.forEach((todo) => (todo.style.display = "flex"));
                break;
            case "done":
                tarefas.forEach((todo) =>
                    todo.classList.contains("done")
                        ? todo.style.display = "flex"
                        : todo.style.display = "none"
                );
                break;
            case "todo":
                tarefas.forEach((todo) =>
                    !todo.classList.contains("done")
                        ? todo.style.display = "flex"
                        : todo.style.display = "none"
                );
                break;
            default:
                break;
        }
    } catch (error) {
        console.error("Erro ao filtrar tarefas: ", error);
        alert("Ocorreu um erro ao filtrar as tarefas.");
    }
};


const toggleDone = (tarefaASerMarcada) => {
    arrayDeTarefas = arrayDeTarefas.map((tarefa) => {
        if (tarefa.titulo === tarefaASerMarcada) {
            tarefa.done = !tarefa.done; 
        }
        return tarefa;
    });

    loadTarefas();
};


const removerTarefa = (tituloDaTarefaParaRemover) => {
    const indiceDaTarefaParaRemover = arrayDeTarefas.findIndex((tarefa) => tarefa.titulo === tituloDaTarefaParaRemover);
    arrayDeTarefas.splice(indiceDaTarefaParaRemover, 1);
    loadTarefas();
};

let arrayDeTarefas = [];
let tarefaParaEdicao;

if (arrayDeTarefas.length === 0) {
    todoList.classList.add("hidden");
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
      const inputValue = todoInput.value;

      const tarefaDuplicada = arrayDeTarefas.some(tarefa => tarefa.titulo.toLowerCase() === inputValue.toLowerCase());

      if (tarefaDuplicada) {
          alert("Já existe uma tarefa com esse nome.");
          return;
      }

      if (inputValue) {
          arrayDeTarefas.push({ titulo: inputValue, done: false });
          exibirTarefa({ titulo: inputValue, done: false });
          todoList.classList.remove("hidden");
      }
  } catch (error) {
      console.error("Erro ao adicionar tarefa: ", error);
      alert("Ocorreu um erro ao adicionar a tarefa.");
  }
});


document.addEventListener("click", (e) => {
    try {
        const targetEl = e.target;
        const parentEl = targetEl.closest("div");
        let todoTitle;

        if (parentEl && parentEl.querySelector("h3")) {
            todoTitle = parentEl.querySelector("h3").innerText;
        }

        if (targetEl.classList.contains("finish-todo")) {
            toggleDone(todoTitle);
        }

        if (targetEl.classList.contains("remove-todo")) {
            removerTarefa(todoTitle);
        }

        if (targetEl.classList.contains("edit-todo")) {
            toggleForms();
            tarefaParaEdicao = parentEl.querySelector("h3").innerText;
            editInput.value = tarefaParaEdicao;
        }
    } catch (error) {
        console.error("Erro ao manipular clique: ", error);
        alert("Ocorreu um erro ao processar a ação.");
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    try {
        toggleForms();
    } catch (error) {
        console.error("Erro ao cancelar edição: ", error);
        alert("Ocorreu um erro ao cancelar a edição.");
    }
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    try {
        const editInputValue = editInput.value;
        const tarefaAtual = tarefaParaEdicao;

        if (editInputValue) {
            editarTarefa(tarefaAtual);
        }

        toggleForms();
    } catch (error) {
        console.error("Erro ao submeter edição: ", error);
        alert("Ocorreu um erro ao submeter a edição.");
    }
});

searchInput.addEventListener("keyup", (e) => {
    try {
        const search = e.target.value;
        busca(search);
    } catch (error) {
        console.error("Erro ao buscar: ", error);
        alert("Ocorreu um erro ao realizar a busca.");
    }
});

filterBtn.addEventListener("change", (e) => {
    try {
        const filterValue = e.target.value;
        filtro(filterValue);
    } catch (error) {
        console.error("Erro ao aplicar filtro: ", error);
        alert("Ocorreu um erro ao aplicar o filtro.");
    }
});
``
