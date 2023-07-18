let dataContainer = document.getElementById("data-container");
let form = document.getElementById('formInput');
let checkbox = document.getElementById('status');
let todo = document.getElementById('todo')
let content = [];
let allTasksFilterBtn = document.getElementById('all')
let activeTasksFilter = document.getElementById('active')
let completeTaskFilter = document.getElementById('complete')
let deleteTasksBtn = document.getElementById('delete')
let count = document.getElementById('count')

let todos = localStorage.getItem('todo-store');
if(!todos){
    todos = content;
}else{
    todos = JSON.parse(todos)
    content[{...todos}]
}

populateDOM(todos)


form.addEventListener('submit', (e)=>{
    e.preventDefault();

    if(todo.value && todos.length <= 0){
        content.push({
            status: checkbox.checked,
            task: todo.value
        })

        localStorage.setItem('todo-store', JSON.stringify(content))
        let todos = JSON.parse(localStorage.getItem('todo-store'))
        console.log(todos);
        populateDOM(todos)
        todo.value = '';
        checkbox.checked = false;

        
    }else if(todo.value && todos.length > 0)
    {

        content.push({
            status: checkbox.checked,
            task: todo.value
        })

        localStorage.setItem('todo-store', JSON.stringify(content))
        let todos = JSON.parse(localStorage.getItem('todo-store'))
        console.log(todos);
        populateDOM(todos)
        todo.value = '';
        checkbox.checked = false;
    }
})

activeTasksFilter.addEventListener('click', ()=>{
    active()
})

completeTaskFilter.addEventListener('click', ()=>{
    completed()
})

allTasksFilterBtn.addEventListener('click', ()=>{
    let data = JSON.parse(localStorage.getItem('todo-store'))
    populateDOM(data)
})

deleteTasksBtn.addEventListener('click', ()=>{
    deleteTasks()
})

function populateDOM(input){
    
    let dataItems = document.querySelectorAll('.data .data-item');

    dataItems.forEach((el)=>el.remove())

    input.forEach((item)=>{
        let dataItem = document.createElement('div')
        dataItem.className = 'data-item';
        let status = document.createElement('input')
        status.type = "checkbox"
        status.checked = item.status
        let task = document.createElement('p')
        task.textContent = item.task

        if(item.status === true)
        {
            task.style.textDecoration = "line-through"
        }

        status.addEventListener('click', ()=>{
            task.style.textDecoration === 'line-through' ? task.style.textDecoration = "none" : task.style.textDecoration = "line-through"
        })
        
        dataItem.appendChild(status)
        dataItem.append(task)
        dataContainer.append(dataItem)
        
    })
    
}

function active(){
    let dataItems = document.querySelectorAll('.data .data-item');

    dataItems.forEach((el)=>el.remove())
    let todos = JSON.parse(localStorage.getItem('todo-store'))
    let active = todos.filter((item)=>item.status == false)
    count.textContent = ''
    count.textContent = `${active.length} items left`
    populateDOM(active)
}

function completed(){
    let dataItems = document.querySelectorAll('.data .data-item');
    dataItems.forEach((el)=>el.remove())
    let data = JSON.parse(localStorage.getItem('todo-store'))
    
    let completed = data.filter((item)=>{
       return item.status === true
    })

    count.textContent = `${completed.length} items complete`

    populateDOM(completed)
}


function deleteTasks(){
    let data = localStorage.removeItem('todo-store')
    content = []
    populateDOM(content);
}

