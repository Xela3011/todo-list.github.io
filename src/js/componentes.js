
//Referencias en el html

import { Todo } from "../classes";
import {todoList} from '../index';

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const clearCompleted = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFilters = document.querySelectorAll('.filtro');

export const CreateHtmlTodo = (todo) => {
  const htmlTodo = `
        <li class="${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''}>
            <label>${todo.task}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
        </li>
  `;

  const div = document.createElement('div');
  div.innerHTML = htmlTodo;
  
  divTodoList.append(div.firstElementChild);

  return div.firstElementChild;
}



//Eventos

txtInput.addEventListener('keyup', (event) => {
    if(event.keyCode === 13 && txtInput.value.length > 0){
        const newTodo = new Todo(txtInput.value);
        todoList.newTodo(newTodo);
        CreateHtmlTodo(newTodo);
        txtInput.value = '';
    }
})

divTodoList.addEventListener('click', (event) =>{
    const elementName = event.target.localName //input, label o botón
    const todoElement = event.target.parentElement.parentElement;
    const todoId      = todoElement.getAttribute('data-id');
    if(elementName.includes('input')){
        todoList.checkCompleteTodo(todoId)
        todoElement.classList.toggle('completed');
    }else if(elementName.includes('button')){
        todoList.deleteTodo(todoId)
        divTodoList.removeChild(todoElement);
    }
}) 


clearCompleted.addEventListener('click', () =>{
    todoList.wipeCompleted()
    for(let i = divTodoList.children.length - 1;i >=0;i--){
        const element = divTodoList.children[i]
        if(element.classList.contains('completed')){
            divTodoList.removeChild(element)
        }
    }
});

ulFilters.addEventListener('click', (event) => {
    const filter = event.target.text
    if(!filter) return

    anchorFilters.forEach(elem => elem.classList.remove('selected'))
    event.target.classList.add('selected')
    
    for(const element of divTodoList.children){
        element.classList.remove('hidden')
        const completed =  element.classList.contains('completed')

        switch(filter){
            case 'Pendientes':
                if(completed){element.classList.add('hidden')}
            break

            case 'Completados':
                if(!completed){element.classList.add('hidden')}
            break
        }
    }
})