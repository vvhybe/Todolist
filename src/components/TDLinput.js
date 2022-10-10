import React, { useState } from 'react'

export default function TDLinput({tasktitle, setTasktitle, todos, setTodos}) {
    const [allCompleted, setAllCompleted] =  useState(false);
    // const [idxid, setIdxid] = useState(0);
    // const todoId = ()=>{setIdxid(idxid + 1); return idxid};

    const storeTasktitle = (title)=>{
        /^[\s]/.test(title) ? setTasktitle('') : setTasktitle(title);
    };
    
    const handleAddTodo = ()=>{
        if(tasktitle){
            setTodos([...todos, {id:new Date().getTime(), title:tasktitle, date:new Date().toLocaleString(), completed:false, edited:false}]);
            setTasktitle('');
        };

    };
    
    const handleEnterToAddTodo = (e)=>{ if(tasktitle && e.key === "Enter"){ handleAddTodo() } };

    const isTodoCompleted = ()=>( !todos.filter(todo => todo.completed).length > 0 );
    
    const handleDeleteCompletedTasks = () => {
        setTodos(todos.filter(todo => !todo.completed));
    };

    const completeAllTasks = ()=>{
        setAllCompleted(!allCompleted)
        setTodos( todos.map(task => ( { ...task, completed: allCompleted } )));
    }

    return (
        <div className='tdlinput'>
            <input type="text" placeholder='Add a task' value={tasktitle} onChange={e=>storeTasktitle(e.target.value)} onKeyDown={handleEnterToAddTodo} autoComplete="true"/>
            <button className='addTodo' title='Add task to list' onClick={handleAddTodo}></button>
            <button className='cmpltallTodos' title='Complete all tasks' onClick={completeAllTasks} disabled={!(todos.length > 0)}></button>
            <button className='delTodo' title='Delete completed tasks' onClick={handleDeleteCompletedTasks} disabled={isTodoCompleted()}></button>
        </div>
    )
}
