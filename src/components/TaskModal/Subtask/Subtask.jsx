import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import CreateTasks from '../../CreateTasks/CreateTasks';
import style from './../../Task/Task.module.css';



export default function Subtask(props) {
    const [btn, setBtn] = useState(false);
    const [task, setTask] = useState(props.task);
    const [drop, setDrop] = useState(false);
    const subtaskFinished = (id) => {
        props.getSubtaskFinished(id);
    }
    // const taskOnchange = (e) => {
    //     setTask(e.currentTarget.value);
    // }
    // const addTask = () => {
    //     alert(props.id + ' ' + task);
    //     props.updateTask(props.id, task);
    //     setBtn(false);
    // }
    const showInput = () => {
        setBtn(true);
    }
    const deleteSubTask = (id) => {
        let a = window.confirm('Do you want to delete?');
        if (a) {
            props.getDeleteSubTask(id);
        }        
    }
    return (
        <div>
            <div className={style.container} style={{ cursor: 'pointer' }}>
            {
            btn ? <CreateTasks description={props.description} subtask={props.subtask} getUpdateSubtask={props.getUpdateSubtask} updateTask={props.updateTask} setBtn={ setBtn } task={props.task} id={props.id} />
            : <div>
                <div>
                    <div  class={style.containerCheckbox}>
                        <div  class={style.round}>
                            <input type="checkbox" style={{ opacity: 0 }} checked={ props.required } />
                            <label onClick={ () => subtaskFinished(props.id) }></label>
                        </div>
                    </div>
                    <div className={style.taskText}>
                        <NavLink to={'/inbox/task/' + props.id}>
                            { props.subtask }
                            <p>{ props.description }</p>
                        </NavLink>
                    </div>
                </div>
                <div className={style.iconBlock} 
                style={{ display: drop ? 'block' : '' }}
                >
                    <div onClick={ showInput } className={`${style.icon} ${style.edit}`}></div>
                    <div className={`${style.icon} ${style.term}`}></div>
                    <div className={`${style.icon} ${style.comment}`}></div>
                    <div className={style.dropdown} onClick={ () => setDrop(!drop) }>
                        <div className={`${style.icon} ${style.threeDots} ${style.dropbtn}`}></div>
                        <div onBlur={ () => setDrop(false) } className={style.dropdownContent} style={{ display: drop ? 'block' : '' }}>
                            <div className={`${style.dropElementn}`} onClick={ () => deleteSubTask(props.id) } >
                                <div className={style.deleteIcon}></div>
                                <p className={style.dropText}>Delete</p>
                                </div>
                            <div className={style.dropElementn}>delete</div>
                            <div className={style.dropElementn}>delete</div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    </div>
    )
}
