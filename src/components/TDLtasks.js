import React from 'react';

export default function TDLtasks({todos, setTodos, newTasktitle, setNewTasktitle}) {

    const handleDeleteTask = ({id})=>{
        setTodos(todos.filter((todo) => todo.id !== id));
    }
    
    const handleComplet = ({id})=>{
        setTodos( todos.map((task) =>( (task.id === id &&  !task.edited) ? {...task, completed: !task.completed} : task )))
    }
    
    const renameThisTask = (newTitle)=>{
        /^\s/.test(newTitle) ? setNewTasktitle('') : setNewTasktitle(newTitle);
    }

    const handelRenameTask = ({id})=>{
        setTodos( todos.map(task => ( (task.id === id) ? {...task, title: newTasktitle || task.title, edited: !task.edited} : {...task, edited: false} )));
        setNewTasktitle('');
    }

    const onBlur = ({id})=>{
        setTodos( todos.map(todo =>( (todo.id === id) ? {...todo, edited:false} : todo)))
        setNewTasktitle('');
    }
     
    const onEnter = (e, todo)=>{ if(e.key === "Enter" && !(/^\s/.test(e.target.value))) { handelRenameTask(todo) } }


    return (
    <ul className='tdltask'>
        {[...todos].reverse().map(todo => (
            <li key={todo.id} className={todo.completed ? "completed" : null}>
                <div className='taskinfo' onClick={()=>{handleComplet(todo)}}>
                    {(todo.edited) ? (<input defaultValue={todo.title} onChange={e=>renameThisTask(e.target.value)} onKeyDown={e=>onEnter(e, todo)} onBlur={()=>onBlur(todo)} autoFocus/>) : (<h4 className={todo.completed ? "completed" : ""}>{todo.title}</h4>)}
                    <span>{todo.date}</span>
                </div>
                <div className='actBtns'>
                    <button className='renmeCrntTodo' title='Rename this task' onClick={()=>{handelRenameTask(todo)}}></button>
                    <button className='delCrntTodo' title='Delete this task' onClick={()=>{handleDeleteTask(todo)}}></button>
                </div>
            </li>
        ))}
    </ul>
    )
}
