const taskList = document.getElementById('task-list')
const confirmBtn = document.getElementById('add')
const deleteBtn = document.getElementById('delete')
const newTaskField = document.getElementById('add-task')

//console.log(taskList)

confirmBtn.addEventListener("click", readNewTask)

//console.log(localStorage[7].innerHTML);
//taskList.appendChild(localStorage.getItem(7))

//localStorage.clear

loadTasksFromStorage()

function loadTasksFromStorage() {

    let taskArray = []

    Object.keys(localStorage).forEach(function(key){
        // if it is a task > starts with i (id7, id8, etc.)
        if (key[0] == 'i') {
            //console.log(localStorage.getItem(key));
            let jsonString = localStorage.getItem(key);
            let jsonObject = JSON.parse(jsonString);
            taskArray[key] = jsonObject.text
            //console.log(jsonString)
            //console.log(jsonObject)
        }
        //console.log(objtest)
    });

    taskArray.sort()
    Object.keys(taskArray).forEach(key => {
        console.log(taskArray)
        NewListItem(taskArray[key], false, key)
    })
}



function storeTask(key, task) {
    console.log('storeTask')
    let obj = new taskObj(task);
    let jsonObject = JSON.stringify(obj);
    localStorage.setItem(key, jsonObject);
    getTask(key);
}

function getTask(key) {
    console.log('getTask')
    let jsonString = localStorage.getItem(key);
    let obj = JSON.parse(jsonString);
    console.log(obj.text)
}

function taskObj(task) {
    this.text = task;
}


function deleteTask(button) {
    let parentID = button.parentElement.id;
    //console.log(deleteBtn)
    console.log("del-parent: " + parentID);
    button.parentElement.remove();
    localStorage.removeItem(`id${parentID}`)
    
}

function readNewTask() {
    let regExp = /[a-zA-Z]/g;
    if (regExp.test(newTaskField.value)) {
        const newInput = newTaskField.value
        newTaskField.value = ''
        NewListItem(newInput, true)
    }
}

function NewListItem(newTask, isNew, key) {
    console.log('NewListItem')

    const newDiv = document.createElement("div")
    const newItem = document.createElement("li")
    const newButton = document.createElement("button")
    const newContent = document.createTextNode(newTask)
    const newIcon = document.createElement("i")
    const newCheckbox = document.createElement("input")
    
    let itemID = String(LastItemID() + 1)

    if (!isNew) {itemID = String(key.slice(2))}

    console.log('next ID: ' + itemID)

    // <div class="list-item">
    newDiv.setAttribute("class", "list-item")
    newDiv.setAttribute("id", itemID)
    // <button class="del-btn" id="delete" >
    newButton.setAttribute("class", "del-btn")
    newButton.setAttribute("id", itemID)
    newButton.addEventListener("click", () => {deleteTask(newButton)})
    // <i class="fa-solid fa-trash">
    newIcon.setAttribute("class", "fa-solid fa-trash")
    // <input type="checkbox" name="completed" id="6" />
    newCheckbox.setAttribute("type", "checkbox")
    newCheckbox.setAttribute("name", "completed")

    // parent all new elements
    newButton.appendChild(newIcon)
    newItem.appendChild(newCheckbox)
    newItem.appendChild(newContent)
    newDiv.appendChild(newItem)
    newDiv.appendChild(newButton)

    // console.log(isNew)
    console.log(`id${itemID}`)
    if(isNew) storeTask(`id${itemID}`, newTask);

    // add new item to list
    taskList.appendChild(newDiv)
}

function LastItemID() {
    let listItems = taskList.children
    // console.log(taskList.children)
    let lastID = 0
    for (let i = 0; i < listItems.length; i++) {
        if (parseInt(listItems[i].id) > lastID) {
            lastID = parseInt(listItems[i].id)
        }
    }
    // console.log(lastID)
    return lastID
}