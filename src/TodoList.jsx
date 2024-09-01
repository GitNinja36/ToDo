import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';


export default function TodoList(){
    let [todos, setTodos] = useState([{task: "tasks", id: uuidv4(), isDone: false }]);
    let [newTodo, setNewTodo] = useState("");
     
    function addNewTask(){
        setTodos((prevTodos) =>{
            return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }]
        });
        setNewTodo("");
    }

    function updateTodovalue(e){
        setNewTodo(e.target.value);
    }

    function deleteTodo(id){
        setTodos((preTodos) => preTodos.filter((preTodos) => preTodos.id != id));
    }


    let markAllDone = () =>{
        setTodos((todos) => 
            todos.map((todo) =>{
                return {
                    ...todo, 
                    isDone: true,
                };
            })
        );
    };

    let markAsDone=(id)=> {
        setTodos((todos) => 
          todos.map((todo) => {
            if(todo.id == id){
                return {
                    ...todo,
                    isDone: true,
                };
            }else{
                return todo;
            }
          })
        );
    };


    return(
        <div>
            <input 
                type="text" 
                placeholder="add a Task" 
                value={newTodo}  
                onChange={updateTodovalue}
            />
            <br /><br />
            <button onClick={addNewTask}>add task</button>
            <br /><br />
            <hr /><hr />
            <h4>ToDo list</h4>
            <br />
            <ul>
                {todos.map((todo)=>(
                    <li key={todo.id}>
                        <span style={todo.isDone ? {textDecoration:"line-through"} : {}}>{todo.task}</span>
                        &nbsp;&nbsp;
                        <button onClick={()=> deleteTodo(todo.id)}>delete</button> &nbsp;
                        <button onClick={()=> markAsDone(todo.id)}>mark as done</button>
                    </li>
                ))}
            </ul>
            <br /><br />
            <button onClick={markAllDone}>mark done all</button>
        </div>
    );
}