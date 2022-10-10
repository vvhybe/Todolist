import React, { useState, useEffect } from 'react'
import TDLinput from './TDLinput';
import TDLtasks from './TDLtasks';

export default function ToDoList() {
    const [tasktitle, setTasktitle] = useState("");
    const [newTasktitle, setNewTasktitle] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(()=>{
        const localTodos = JSON.parse(localStorage.getItem('todos'));
        if(localTodos.length > 0){
            setTodos(localTodos)
            localStorage.setItem('todos',"");
        };
    },[]);
    
    useEffect(()=>{
        const localTodos = JSON.stringify(todos);
        localStorage.setItem('todos',localTodos);
    },[todos]);

    return (
        <div className='todolist'>
            <TDLinput 
            tasktitle={tasktitle}
            setTasktitle={setTasktitle}
            todos={todos}
            setTodos={setTodos}
            />
            
            <TDLtasks 
            todos={todos}
            setTodos={setTodos}
            newTasktitle={newTasktitle}
            setNewTasktitle={setNewTasktitle}
            />
        </div>
    )
};
