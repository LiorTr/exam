let todos
if (localStorage['todos']) {
  todos = JSON.parse(localStorage['todos'])
} else todos = [];
const saveButton = document.querySelector('.save-btn')
const textInput = document.querySelector('.input-task')
const dateInput = document.querySelector('.input-date')
const timeInput = document.querySelector('.input-time')
const todoOutput = document.querySelector('.output-tasks')
const clearBtn = document.querySelector('.clear-btn')
const sortBtn = document.querySelector('.sort-btn')

let todo = {}
let id = 0

function init() {
  if (localStorage['todos']) {
    todos.forEach((todo) => {
      let createdElement = createHtml(todo)
      if (todo.isStyle === true) {
        createdElement.textElement.style.textDecoration = 'line-through'
      }
    })
  }
}

init()

saveButton.addEventListener('click', function () {
  let inputs = [textInput.value, dateInput.value, timeInput.value]
  if (inputs.includes('')) {
    alert('fill in all the inputs')
  } else {
    saveObjectTask()
    id++
    todos.push(todo)
    createHtml(todo)
    storeInLocalStorage()
  }
  textInput.value = ''
  dateInput.value = ''
  timeInput.value = ''
})

function saveObjectTask() {
  let text = textInput.value
  let date = dateInput.value
  let time = timeInput.value
  todo = {
    text: text,
    date: date,
    time: time,
    id: id,
    isStyle: false
  }
}
function createHtml(todo) {
  const textElement = document.createElement('textarea')
  const dateElement = document.createElement('li')
  const timeElement = document.createElement('li')
  const indexId = document.createElement('span')
  const timeAndDateList = document.createElement('div')
  const listTodo = document.createElement('div')
  const divTodo = document.createElement('div')
  const divContainer = document.createElement('div')
  const removeBtn = document.createElement('button')
  const endTodoBtn = document.createElement('button')
  const editTodoBtn = document.createElement('button')
  addClassToHtml(listTodo, textElement, removeBtn, endTodoBtn, editTodoBtn, timeAndDateList, divTodo, divContainer)
  changTextContent(textElement, dateElement, timeElement, indexId, todo)
  appendChildToHtml(textElement, dateElement, timeElement, listTodo, removeBtn, endTodoBtn, editTodoBtn, indexId, timeAndDateList, divTodo, divContainer)
  setAttributeElements(textElement, divTodo, divContainer)
  indexId.style.opacity = 0
  removeBtn.addEventListener('click', function () {
    removeBtnfunc(indexId, removeBtn)
  })
  endTodoBtn.addEventListener('click', function () {
    endTodoBtnFunc(indexId, textElement)
  })
  editTodoBtn.addEventListener('click', function () {
    editTodoBtnFunc(indexId, textElement, divContainer)
  })

  return { textElement, dateElement, timeElement, timeAndDateList, listTodo, removeBtn, endTodoBtn, editTodoBtn, indexId, divTodo }
}

clearBtn.addEventListener('click', function () {
  localStorage.clear()
  todos = []
  todoOutput.textContent = ''
})

function changTextContent(text, date, time, id, todo) {
  text.textContent = todo.text
  date.textContent = todo.date
  time.textContent = todo.time
  id.textContent = todo.id
}
function setAttributeElements(textElement, div, divC) {
  textElement.setAttribute('readonly', 'readonly')
  // divC.setAttribute("ondrop", "drop(event)")
  // divC.setAttribute("ondragover", "allowDrop(event)")
  // divC.setAttribute("id", "div-todo-container")
  // div.setAttribute("id", "div-todo")
  // div.setAttribute("ondragstart", "drag(event)")
  // div.setAttribute("draggable", "true")
}
function appendChildToHtml(text, date, time, list, btndel, btnend, editBtn, id, listTimeDate, div, divC) {
  list.appendChild(text)
  div.appendChild(id)
  listTimeDate.appendChild(date)
  listTimeDate.appendChild(time)
  div.appendChild(editBtn)
  div.appendChild(btnend)
  div.appendChild(btndel)
  div.appendChild(list)
  div.appendChild(listTimeDate)
  divC.appendChild(div)
  todoOutput.appendChild(divC)
}

function storeInLocalStorage() {
  localStorage['todos'] = JSON.stringify(todos)
}

function addClassToHtml(list, text, btndel, btnend, editBtn, timeAndDate, div, divC) {
  btndel.classList.add('remove-btn')
  btndel.classList.add('glyphicon')
  btndel.classList.add('glyphicon-remove')
  editBtn.classList.add('edit-btn')
  editBtn.classList.add('glyphicon')
  editBtn.classList.add('glyphicon-edit')
  btnend.classList.add('end-todo-btn')
  btnend.classList.add('glyphicon')
  btnend.classList.add('glyphicon-saved')
  list.classList.add('list-todo')
  text.classList.add('text-list')
  timeAndDate.classList.add('list-todo-time-date')
  div.classList.add('div-todo')
  divC.classList.add('div-container')
}

function removeBtnfunc(id, removeBtn) {
  let todoId = Number(id.textContent);
  for (let j = 0; j < todos.length; j++) {
    if (Number(todos[j].id) === todoId) {
      todos.splice(j, 1)
      removeBtn.parentElement.remove()
      storeInLocalStorage()
    }
  }
}

function endTodoBtnFunc(id, textElement) {
  let todoId = Number(id.textContent);
  for (let j = 0; j < todos.length; j++) {
    if (Number(todos[j].id) === todoId) {
      if (todos[j].isStyle) {
        textElement.style.textDecoration = 'none'
        todos[j].isStyle = false
        storeInLocalStorage()
      } else {
        textElement.style.textDecoration = 'line-through'
        todos[j].isStyle = true
        storeInLocalStorage()

      }
    }
  }
}

function editTodoBtnFunc(id, textElement, div) {
  const finishEditTodoBtn = document.createElement('button')
  div.appendChild(finishEditTodoBtn)
  finishEditTodoBtn.classList.add('save-edit-btn')
  finishEditTodoBtn.classList.add('glyphicon')
  finishEditTodoBtn.classList.add('glyphicon-thumbs-up')
  let todoId = Number(id.textContent);
  for (let j = 0; j < todos.length; j++) {
    if (Number(todos[j].id) === todoId) {
      textElement.removeAttribute('readonly')

      finishEditTodoBtn.addEventListener('click', function () {
        textElement.textContent = textElement.value
        todos[j].text = textElement.value
        storeInLocalStorage()
      })
      storeInLocalStorage()
    }
  }
}

sortBtn.addEventListener('change', function () {
  if (this.value === 'task-name') {
    todos.sort((a, b) => (a.text > b.text) ? 1 : ((b.text > a.text) ? -1 : 0))
    storeInLocalStorage()
    todoOutput.textContent = ''
    init()
  }
  if (this.value === 'task-date') {
    todos.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
    storeInLocalStorage()
    todoOutput.textContent = ''
    init()
  }
}
)

// function allowDrop(ev) {
//   ev.preventDefault();
// }

// function drag(ev) {
//   ev.dataTransfer.setData("text", ev.target.id);
// }

// function drop(ev) {
//   ev.preventDefault();
//   let data = ev.dataTransfer.getData("text");
//   ev.target.appendChild(document.getElementById(data));
// }