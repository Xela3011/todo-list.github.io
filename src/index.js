// import { TodoList } from './classes/todo-list.class';
// import { Todo } from './classes/todo.class';
import {TodoList} from './classes';
import { CreateHtmlTodo } from './js/componentes';
import './styles.css';


export const todoList = new TodoList();

todoList.todos.forEach(CreateHtmlTodo);