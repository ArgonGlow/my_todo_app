// main variables
const taskList = document.getElementById('task-list');
const confirmBtn = document.getElementById('add');
const deleteBtn = document.getElementById('delete');
const newTaskField = document.getElementById('add-task');

//localStorage.clear // for clearing storage when debugging

// load stored tasks on page-load
loadTasksFromStorage();

// create new task when 'add' button is clicked
confirmBtn.addEventListener("click", readNewTask);

// create new task when pressing enter is pressed in input field
newTaskField.addEventListener("keydown", ({key}) => {
    if (key === "Enter") {
        readNewTask();
    }
});

// retrieves all locally stored tasks
function loadTasksFromStorage() {
    let taskArray = [];

    // check every object in localStorage
    Object.keys(localStorage).forEach(function(key){
        // if it is a task > starts with i (id7, id8, etc.)
        if (key[0] == 'i') {
            // console.log(key);
            let jsonString = localStorage.getItem(key);
            let jsonObject = JSON.parse(jsonString);
            jsonObject["id"] = key;
            taskArray.push(jsonObject);
        }
    });

    // sort tasks by id, and add them to the DOM
    taskArray.sort((a, b) => a.id.slice(2) - b.id.slice(2));
    taskArray.forEach(task => {
        console.log(taskArray);
        NewListItem(task.text, false, task.id, task.checked);
    });
}

// creates object from a new task's text value
function taskObj(task) {
    this.text = task;
}

// store new tasks in localStorage
function storeTask(key, task, isChecked) {
    console.log('storeTask')
    let obj = new taskObj(task);
    obj.checked = isChecked;
    let jsonObject = JSON.stringify(obj);
    localStorage.setItem(key, jsonObject);
    getTask(key);
}

// debug function
function getTask(key) {
    console.log('getTask');
    let jsonString = localStorage.getItem(key);
    let obj = JSON.parse(jsonString);
    console.log(obj);
    console.log("text", obj.text);
}

// update an existing task in localStorage
function updateTask(input, isChecked = false) {
    let parentID = input.parentElement.parentElement.id;
    console.log("parentID" , parentID);

    if (input.getAttribute('type') === 'text') {
        console.log("text");
        storeTask(`id${parentID}`, input.value, isChecked);
    } else {
        storeTask(`id${parentID}`, input.nextElementSibling.value, isChecked);
    }
}

// delete task <div> when the child <button> is clicked
function deleteTask(button) {
    let parentID = button.parentElement.id;
    //console.log(deleteBtn);
    console.log("del-parent: " + parentID);
    button.parentElement.remove();
    localStorage.removeItem(`id${parentID}`);
}

// sends input-field text to NewListItem if it contains enough contiguous alphanumericals 
function readNewTask() {
    let regExp = /(\w{3,})/g;
    if (regExp.test(newTaskField.value)) {
        const newInput = newTaskField.value;
        newTaskField.value = '';
        NewListItem(newInput, true);
    }
}

// adds a new <li> element to the DOM 
function NewListItem(newTask, isNew, taskID, isChecked = false) {
    console.log('NewListItem:', newTask);

    const newDiv = document.createElement("div");
    const newItem = document.createElement("li");
    const newButton = document.createElement("button");
    const newField = document.createElement("input");
    const newIcon = document.createElement("i");
    const newCheckbox = document.createElement("input");
    let itemID = String(LastItemID() + 1);

    // use the existing id if the task is not new > from localStorage
    if (!isNew) {itemID = String(taskID.slice(2));}

    // construct <div class="list-item">
    Object.assign(newDiv, { className: 'list-item', id: itemID });

    // construct <input type="text" id="task-text" placeholder="...">
    Object.assign(newField, {
        type: 'text',
        id: 'task-text',
        placeholder: '...',
        value: newTask
    });
    newField.addEventListener("focusout", () => {updateTask(newField, newCheckbox.checked)});
    newField.addEventListener("keydown", ({key}) => {
        if (key === "Enter") {
            updateTask(newField);
            newField.blur();
        }});

    // construct <button class="del-btn" id="delete" >
    newButton.setAttribute("class", "del-btn");
    // newButton.setAttribute("id", itemID)
    newButton.setAttribute("id", "delete");
    newButton.addEventListener("click", () => {deleteTask(newButton)});
    // construct <i class="fa-solid fa-trash">
    newIcon.setAttribute("class", "fa-solid fa-trash");
    // construct <input type="checkbox" name="completed" id="6" />
    Object.assign(newCheckbox, { type: 'checkbox', name: 'completed' });
    newCheckbox.addEventListener("change",() => {
        updateTask(newField, newCheckbox.checked)});
    
    // checks checkbox of tasks stored as such
    if (isChecked) newCheckbox.checked = true;

    // parent all constructed elements
    newButton.appendChild(newIcon);
    newItem.appendChild(newCheckbox);
    newItem.appendChild(newField);
    newDiv.appendChild(newItem);
    newDiv.appendChild(newButton);

    // new/edited task is added/updated to user's localStorage
    if(isNew) storeTask(`id${itemID}`, newTask, false);

    // append task to list element
    taskList.appendChild(newDiv);
}

// returns the highest ID number present in the current list
function LastItemID() {
    let listItems = taskList.children;
    let lastID = 0;
    for (let i = 0; i < listItems.length; i++) {
        if (parseInt(listItems[i].id) > lastID) {
            lastID = parseInt(listItems[i].id);
        }
    }
    // console.log(lastID);
    return lastID;
}
