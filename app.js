const taskList = document.getElementById('task-list')
const confirmBtn = document.getElementById('add')
const newTaskField = document.getElementById('add-task')

console.log(taskList)

confirmBtn.addEventListener("click", readNewTask)

function readNewTask() {
    const newInput = newTaskField.value
    newTaskField.value = ''
    NewListItem(newInput)

}

function NewListItem(newTask) {
    
    const newDiv = document.createElement("div")
    const newItem = document.createElement("li")
    const newButton = document.createElement("button")
    const newContent = document.createTextNode(newTask)
    const newIcon = document.createElement("i")
    const newCheckbox = document.createElement("input")
    
    let itemID = String(LastItemID() + 1)

    console.log(itemID)

    // <div class="list-item">
    newDiv.setAttribute("class", "list-item")
    newDiv.setAttribute("id", itemID)
    // <button class="del-btn" id="delete" >
    newButton.setAttribute("class", "del-btn")
    newButton.setAttribute("id", "delete")
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

    // add new item to list
    taskList.appendChild(newDiv)
}

function LastItemID() {
    let listItems = taskList.children
    console.log(taskList.children)
    let lastID = 0
    for (let i = 0; i < listItems.length; i++) {
        if (parseInt(listItems[i].id) > lastID) {
            lastID = parseInt(listItems[i].id)
        }
    }
    // console.log(lastID)
    return lastID
}