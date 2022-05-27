// main variables
const taskList = document.getElementById('task-list')
const confirmBtn = document.getElementById('add')
const deleteBtn = document.getElementById('delete')
const newTaskField = document.getElementById('add-task')

//localStorage.clear // for clearing storage when debugging

// load stored tasks on page-load
loadTasksFromStorage()

// create new task when 'add' button is clicked
confirmBtn.addEventListener("click", readNewTask)

// create new task when pressing enter is pressed in input field
newTaskField.addEventListener("keydown", ({key}) => {
    if (key === "Enter") {
        readNewTask();
    }
})

// retrieves all locally stored tasks
function loadTasksFromStorage() {
    let taskArray = []

    // check every object in localStorage
    Object.keys(localStorage).forEach(function(key){
        // if it is a task > starts with i (id7, id8, etc.)
        if (key[0] == 'i') {
            //console.log(localStorage.getItem(key));
            let jsonString = localStorage.getItem(key);
            let jsonObject = JSON.parse(jsonString);
            taskArray[key] = jsonObject.text
        }
    });
    // sort tasks by id, and add them to the DOM
    taskArray.sort()
    Object.keys(taskArray).forEach(key => {
        // console.log(taskArray)
        NewListItem(taskArray[key], false, key)
    })
}

// creates object from a new task's text value
function taskObj(task) {
    this.text = task;
}

// store new tasks in localStorage
function storeTask(key, task) {
    console.log('storeTask')
    let obj = new taskObj(task);
    let jsonObject = JSON.stringify(obj);
    localStorage.setItem(key, jsonObject);
    getTask(key);
}

// debug function > currently unhooked
function getTask(key) {
    console.log('getTask')
    let jsonString = localStorage.getItem(key);
    let obj = JSON.parse(jsonString);
    console.log(obj.text)
}

// delete task <div> when the child <button> is clicked
function deleteTask(button) {
    let parentID = button.parentElement.id;
    //console.log(deleteBtn)
    console.log("del-parent: " + parentID);
    button.parentElement.remove();
    localStorage.removeItem(`id${parentID}`)
    
}

// sends input-field text to NewListItem if it contains enough contiguous alphanumericals 
function readNewTask() {
    let regExp = /(\w{3,})/g;
    if (regExp.test(newTaskField.value)) {
        const newInput = newTaskField.value
        newTaskField.value = ''
        NewListItem(newInput, true)
    }
}

// adds a new <li> element to the DOM
function NewListItem(newTask, isNew, key) {
    console.log('NewListItem')

    const newDiv = document.createElement("div")
    const newItem = document.createElement("li")
    const newButton = document.createElement("button")
    const newContent = document.createTextNode(newTask)
    const newIcon = document.createElement("i")
    const newCheckbox = document.createElement("input")
    let itemID = String(LastItemID() + 1)

    // use the existing id if the task is not new > from localStorage
    if (!isNew) {itemID = String(key.slice(2))}

    //console.log('next ID: ' + itemID)

    // construct <div class="list-item">
    newDiv.setAttribute("class", "list-item")
    newDiv.setAttribute("id", itemID)
    
    // construct <button class="del-btn" id="delete" >
    newButton.setAttribute("class", "del-btn")
    newButton.setAttribute("id", itemID)
    newButton.addEventListener("click", () => {deleteTask(newButton)})
    // construct <i class="fa-solid fa-trash">
    newIcon.setAttribute("class", "fa-solid fa-trash")
    // construct <input type="checkbox" name="completed" id="6" />
    newCheckbox.setAttribute("type", "checkbox")
    newCheckbox.setAttribute("name", "completed")

    // parent all constructed elements
    newButton.appendChild(newIcon)
    newItem.appendChild(newCheckbox)
    newItem.appendChild(newContent)
    newDiv.appendChild(newItem)
    newDiv.appendChild(newButton)

    // new task is added to user's localStorage
    if(isNew) storeTask(`id${itemID}`, newTask);

    // append task to list element
    taskList.appendChild(newDiv)
}

// returns the highest ID number present in the current list
function LastItemID() {
    let listItems = taskList.children
    let lastID = 0
    for (let i = 0; i < listItems.length; i++) {
        if (parseInt(listItems[i].id) > lastID) {
            lastID = parseInt(listItems[i].id)
        }
    }
    // console.log(lastID)
    return lastID
}