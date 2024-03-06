tailwind - NICE!!


why not 


let todos = []
if (localStorage['todos']) {
  todos = JSON.parse(localStorage['todos'])
}

let todos
if (localStorage['todos']) {
  todos = JSON.parse(localStorage['todos'])
} else todos = [];

Do you need global to do?
let todo = {}


why read from storage and not from loaded 'todos'

if (localStorage['todos']) {

instead
if (todos) {

why not 
if (todo.isStyle === true) {

if (todo.isStyle) {


why not a function for this?
  textInput.value = ''
  dateInput.value = ''
  timeInput.value = ''

this function is way too long, its supoose to be 3 seprate functions.
createHtml(todo) {

funciton with one line? why?
function setAttributeElements(textElement, div, divC) {
  textElement.setAttribute('readonly', 'readonly')

why not?
if (todos[j].isStyle) {
        textElement.style.textDecoration = 'none'
        todos[j].isStyle = false
        storeInLocalStorage()
      } else {
        textElement.style.textDecoration = 'line-through'
        todos[j].isStyle = true
        storeInLocalStorage()

      }

      if (todos[j].isStyle) {
        textElement.style.textDecoration = 'none'
        todos[j].isStyle = false
      } else {
        textElement.style.textDecoration = 'line-through'
        todos[j].isStyle = true
      }
        storeInLocalStorage()

// you calling storeInLocalStorage() each itrate, why? one not after the loop
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


