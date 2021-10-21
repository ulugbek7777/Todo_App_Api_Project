import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import CreateTasks from '../CreateTasks/CreateTasks';
import style from './Task.module.css';
import Taskmodal from '../TaskModal/TaskModal';

const Task = (props) => {
    //debugger
    const [btn, setBtn] = useState(false);
    const [task, setTask] = useState(props.task);
    const [drop, setDrop] = useState(false);
    let check = props.taskModal;
    const taskFinished = (id) => {
        props.taskFinished(id, props.chapter_id);
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
    const deleteTask = (id) => {
        let a = window.confirm('do you want to delete');
        if (a) {
            props.deleteTask(id)
        }
        
    }
    return (
        <div>
            <div className={style.container} style={{ cursor: 'pointer', border: check && 'none' }}>
            {
            btn ? <CreateTasks updateTask={props.updateTask} setBtn={ setBtn } description={props.description} task={props.task} id={props.id} />
            : <div>
                <div style={{ position: 'relative' }} style={{ marginBottom: check && '25px' }}>
                    <div  class={style.containerCheckbox}>
                        <div  class={style.round}>
                            <input type="checkbox" style={{ opacity: 0 }} checked={ props.required } />
                            <label onClick={ () => taskFinished(props.id) }></label>
                        </div>
                    </div>
                    <div className={style.taskText} >
                        {
                            check ? <div>
                                { props.task } 
                                <p style={{ whiteSpace: check && 'normal', margin: check && '20px 0 0 0', }}>{ props.description }</p>
                            </div>
                            : <NavLink to={props.taskToday + '/task/' + props.id}>
                            { props.task } 
                            <p>{ props.description }</p>
                        </NavLink>
                        }
                        
                    </div>
                </div>
                <div className={style.iconBlock} 
                style={{ display: drop ? 'block' : '', display: check && 'block' }}
                >
                    <div onClick={ showInput } className={`${style.icon} ${style.edit}`}></div>
                    <div className={`${style.icon} ${style.term}`}></div>
                    <div className={`${style.icon} ${style.comment}`}></div>
                    <div className={style.dropdown} onClick={ () => setDrop(!drop) }>
                        <div className={`${style.icon} ${style.threeDots} ${style.dropbtn}`}></div>
                        <div onBlur={ () => setDrop(false) } className={style.dropdownContent} style={{ display: drop ? 'block' : '' }}>
                            <div className={`${style.dropElementn}`} onClick={ () => deleteTask(props.id) } >
                                <NavLink to={props.today ? '/today' : '/inbox'}>
                                    <div className={style.deleteIcon}></div>
                                    <p className={style.dropText}>Delete</p>
                                </NavLink>
                                
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
    );
}

export default Task;

