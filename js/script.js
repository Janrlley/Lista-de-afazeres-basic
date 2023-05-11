// seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

// funções
const saveTodo = (text) => {

    const todo = document.createElement("div");
    todo.classList.add("todo");  // Criando uma div para salvar o todo, sendo "todo" a div externa do html do projeto

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);  // Colocando o h3 no todo

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(removeBtn);

    todoList.appendChild(todo);  // Colocando o todo na Lista(div) geral

    console.log(todo)

    todoInput.value = "";  // Limpando o formulario quando o usuário enviar
    todoInput.focus(); // focando no input após o envio
};

const toggleForms = () => {  // Esconde um formulário e mostra o outro
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) => {

    const todos = document.querySelectorAll(".todo"); // Selecionando todos os "todos" 

    todos.forEach((todo) => {

        let todoTitle = todo.querySelector("h3"); // pegando o título do todo atual que esta mapeando (fazendo o foreach)

        if(todoTitle.innerText === oldInputValue) { // comparando o título da interação atual se é igual ao título salvo na memória
            todoTitle.innerText = text;
        }
    });

};

// eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const inputValue = todoInput.value;  //pegando o valor do input que o usuário digita

    if(inputValue) { // Criando uma validação para evitar que o usuário crie uma tarefa sem título
        // save todo
        saveTodo(inputValue);
    };

});

document.addEventListener("click", (e) => {  // Identificar o clique nos botões

    const targetEl = e.target;  // Através do target é possivel saber qual é o elemento(botão)
    const parentEl = targetEl.closest("div"); // Selecionando o elemento pai div mais próximo ao elemento
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")) {  // editando o elemento com base no título, caso o elemento(parentEl) existe e se ele tiver um "h3"
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-todo")) {  // verifica se determinado elemento contém uma class "finish-todo"
        parentEl.classList.toggle("done"); // toggle no lugar do add é usado para selecionar e desselecionar, se usássemos so o add ele so iria adc o "done" ao clicar e ao clicar de novo nao tiraria
    }

    if(targetEl.classList.contains("remove-todo")) { // Removendo elementos
        parentEl.remove();
    }

    if(targetEl.classList.contains("edit-todo")) { // Editando elementos
        toggleForms()

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue) {
        updateTodo(editInputValue); // atualizar
    }

    toggleForms();
});