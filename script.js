let addBtn = document.querySelector("#add");
let todoInput = document.querySelector("#todo-input");
let todoDate = document.querySelector("#todo-date");

let todoContainer = document.querySelector(".todo-container");


let getData = ()=>{
    let temp = localStorage.getItem('todoList');

    if(temp === null) return [];
    
    return JSON.parse(temp);
}

let todoList  = getData();


let update = ()=>{
    localStorage.setItem('todoList',JSON.stringify(todoList));
}

let display = ()=>{
    let newHTML = '';

    for(let i=0 ; i<todoList.length ; i++){
        newHTML += 
        `<span>${todoList[i].task}</span>
        <span>${todoList[i].date}</span>
        <button id = "delete" class = "btn" onclick = "todoList.splice(${i},1); display(); update();" >Delete</button>
        `
    }

    todoContainer.innerHTML = newHTML;
}

// display prev data in start on reloading
display();



// function to return curr date
let currDate = ()=>{
    let date = new Date();
    let day = String(date.getDate()).padStart(2,'0');
    let mon = String(date.getMonth()+1).padStart(2,'0');
    let year = date.getFullYear();

    return `${year}-${mon}-${day}`;
}


addBtn.addEventListener("click",()=>{
    todoList.push({
        task : todoInput.value,
        date : todoDate.value || currDate()
    });
    update();
    todoInput.value = '';
    todoDate = '';
    display();
});