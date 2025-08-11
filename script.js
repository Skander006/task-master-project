// selectors

const add = document.getElementById("add");
const addingPage = document.getElementById("adding-page");
const lists = document.getElementById("main");
const addButton = document.getElementById("add-button");
const startButton = document.getElementById("start-button");
const todoList= document.getElementById("todo-list");
const todoUnfinished = document.getElementById("todo-unfinished");
const todoFuture = document.getElementById("todo-future");
const taskName = document.getElementById("task-name");
const taskDescription = document.getElementById("task-description");
const category = document.getElementById("category");
const priority = document.getElementById("priority");
const taskDate = document.getElementById("task-date");


//events

add.addEventListener("click",()=>{
    addingPage.style.display = "flex";
    lists.style.display = "none";
});

addButton.addEventListener("click",()=>{
    addingPage.style.display = "none";
    lists.style.display = "flex";
});

startButton.addEventListener("click",()=>{
    addingPage.style.display = "flex";
    lists.style.display = "none";
});

addButton.addEventListener("click",addTask);
document.addEventListener("DOMContentLoaded",loadTasks);
todoList.addEventListener("click",handleClick);
todoUnfinished.addEventListener("click",handleClick);
todoFuture.addEventListener("click",handleClick);


function addTask(e){
    e.preventDefault();

    if (taskName.value == "") return;

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.innerText = taskName.value;

    const todoDescription = document.createElement("li");
    todoDescription.classList.add("todo-description");
    todoDescription.innerHTML = taskDescription.value;

    const textContainer = document.createElement("div");
    textContainer.classList.add("text-container");
    textContainer.appendChild(todoItem);
    textContainer.appendChild(todoDescription);

    todoDiv.appendChild(textContainer);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const checkButton = document.createElement("button");
    checkButton.innerHTML = "✅";
    checkButton.classList.add("check-btn");
    buttonContainer.appendChild(checkButton);

    const removeButton = document.createElement("button");
    removeButton.innerHTML = "❌";
    removeButton.classList.add("remove-btn");
    buttonContainer.appendChild(removeButton);

    //category css+html
    const icon = document.createElement("i");
    icon.classList.add("fa-solid");
    switch(category.value){
        case "Home" : icon.classList.add("fas fa-home"); break;
        case "Work" : icon.classList.add("fa-briefcase"); break;
        case "Fun" : icon.classList.add("fa-face-smile"); break;
        case "Sport" : icon.classList.add("fa-dumbbell"); break;
        case "Social" : icon.classList.add("fa-people-arrows"); break;
        default : icon.classList.add("fa-sun");
    }

    const rightDiv = document.createElement("div");
    rightDiv.appendChild(icon);
    rightDiv.appendChild(buttonContainer);

    todoDiv.appendChild(rightDiv);

    //save to localStorage

    saveToDoLocal({text : taskName.value, description : taskDescription.value, category : category.value, priority : priority.value, date : taskDate.value, completed : false});

    //append to lists
    const today = new Date().toISOString().split("T")[0];
    if (taskDate.value === today){
            todoList.appendChild(todoDiv);
            todoDiv.classList.add("fade-in");
        } else if (taskDate.value <today){
            todoUnfinished.appendChild(todoDiv);
            todoDiv.classList.add("fade-in")
        } else{
            todoFuture.appendChild(todoDiv);
            todoDiv.classList.add("fade-in");
        }
        

    //priority css

    if (priority.value === "Low"){
        todoDiv.style.backgroundColor= "rgb(155, 221, 245)"
    } else if (priority.value === "Medium"){
        todoDiv.style.backgroundColor = "rgba(255, 238, 162, 1)"
    } else{
        todoDiv.style.backgroundColor = "rgba(255, 169, 169, 1)"
    }

    


    
    
    //clear inputs
    taskName.value="";
    taskDescription.value = "";
    category.value = "";
    priority.value = "";
    taskDate.value = "";
}

function handleClick(e){
    const item = e.target;
    const parent = item.parentElement.parentElement.parentElement;

    if (item.classList.contains("check-btn")){
        parent.classList.toggle("completed");
        parent.querySelector(".todo-description").classList.toggle("line-through");
        parent.querySelector(".todo-item").classList.toggle("line-through");
        changeStatus(parent);
    } else if (item.classList.contains("remove-btn")){
        parent.classList.add("removed");
        removeTodo(parent);
        parent.addEventListener("animationend",()=>parent.remove());
    }
}

function loadTasks(e){
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach((todo) => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const todoName = document.createElement("li");
        todoName.classList.add("todo-item");
        todoName.innerText = todo.text;

        const textContainer = document.createElement("div");
        textContainer.classList.add("task-container");

        const todoDescription = document.createElement("p");
        todoDescription.classList.add("todo-description");
        todoDescription.innerHTML = todo.description;

        textContainer.appendChild(todoName);
        textContainer.appendChild(todoDescription);

        todoDiv.appendChild(textContainer);

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        const checkButton = document.createElement("button");
        checkButton.innerHTML = "✅";
        checkButton.classList.add("check-btn");
        buttonContainer.appendChild(checkButton);

        const removeButton = document.createElement("button");
        removeButton.innerHTML = "❌";
        removeButton.classList.add("remove-btn");
        buttonContainer.appendChild(removeButton);

        const icon = document.createElement("i");
        icon.classList.add("fa-solid");
        switch(todo.category){
            case "Home" : icon.classList.add("fas fa-home"); break;
            case "Work" : icon.classList.add("fa-briefcase"); break;
            case "Fun" : icon.classList.add("fa-face-smile"); break;
            case "Sport" : icon.classList.add("fa-dumbbell"); break;
            case "Social" : icon.classList.add("fa-people-arrows"); break;
            default : icon.classList.add("fa-sun");
        }

        const rightDiv = document.createElement("div");
        rightDiv.classList.add("rightDiv");
        rightDiv.appendChild(icon);
        rightDiv.appendChild(buttonContainer);

        todoDiv.appendChild(rightDiv);

        const today = new Date().toISOString().split("T")[0];
        
        if (todo.date === today){
            todoList.appendChild(todoDiv);
            todoDiv.classList.add("fade-in");
        } else if (todo.date <today){
            todoUnfinished.appendChild(todoDiv);
            todoDiv.classList.add("fade-in")
        } else{
            todoFuture.appendChild(todoDiv);
            todoDiv.classList.add("fade-in");
        }
        
        

        

        //priority css

        if (todo.priority === "Low"){
            todoDiv.style.backgroundColor= "rgb(155, 221, 245)"
        } else if (todo.priority === "Medium"){
            todoDiv.style.backgroundColor = "rgba(255, 238, 162, 1)"
        } else{
            todoDiv.style.backgroundColor = "rgba(255, 169, 169, 1)"
        }


    });

    
    localStorage.setItem("todos",JSON.stringify(todos));
}


function saveToDoLocal(todo){
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function changeStatus(todoElement){
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const todoText = todoElement.querySelector(".todo-item").innerText;

    todos.forEach(t => {
        if (t.text === todoText) {
            t.completed = !t.completed;
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}


function removeTodo(todo){
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTodos = todos.filter((t)=> t.text !== todo.querySelector(".todo-item").innerText);
    localStorage.setItem("todos",JSON.stringify(updatedTodos));
}

