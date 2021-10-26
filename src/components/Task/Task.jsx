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
    const [changePsBlock, setChangePsBlock] = useState(false);
    let check = props.taskModal;
    const taskFinished = (id) => {
        props.taskFinished(id, props.chapter_id);
    }

    const showInput = () => {
        setBtn(true);
    }
    const deleteTask = (id) => {
        let a = window.confirm('do you want to delete');
        if (a) {
            props.deleteTask(id);
            setDrop(false);
        }
        
    }
    const changePs = (chapter_id) => {
        props.getUpdateTaskPosition(props.id, chapter_id, props.chapter_id);
        setDrop(false);
    }
    let colorBorder = '#ccc';
    if(props.priority === 1) {
        colorBorder = 'rgb(209, 69, 59)';
    }else if(props.priority === 2) {
        colorBorder = 'rgb(235, 137, 9)';
    }else if(props.priority === 3) {
        colorBorder = 'rgb(36, 111, 224)';
    }else {
        colorBorder = '#ccc';
    }
    debugger
    return (
        <div>
            <div className={style.container} style={{ cursor: 'pointer', border: check && 'none' }}>
            {
            btn ? <CreateTasks priority={props.priority} updateTask={props.updateTask} setBtn={ setBtn } description={props.description} task={props.task} id={props.id} />
            : <div>
                <div style={{ position: 'relative' }} style={{ marginBottom: check && '25px' }}>
                    <div  class={style.containerCheckbox}>
                        <div  class={style.round}>
                            <input type="checkbox" style={{ opacity: 0 }} checked={ props.required } />
                            <label style={{borderColor: colorBorder}} onClick={ () => taskFinished(props.id) }></label>
                        </div>
                    </div>
                    <div className={style.taskText}>
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
                style={{ display: drop ? 'block' : check && 'block' }}
                >
                    <div onClick={ showInput } className={`${style.icon} ${style.edit}`}></div>
                    <div className={`${style.icon} ${style.term}`}></div>
                    <div className={`${style.icon} ${style.comment}`}></div>
                    <div className={style.dropdown}>
                        <div onClick={ () => setDrop(!drop) } className={`${style.icon} ${style.threeDots} ${style.dropbtn}`}></div>
                        <div className={style.dropdownContent} style={{ display: drop ? 'block' : '' }}>
                            <div className={`${style.dropElementn}`} onClick={ () => deleteTask(props.id) } >
                                <NavLink to={props.today ? '/today' : '/inbox'}>
                                    <div className={style.deleteIcon}></div>
                                    <p className={style.dropText}>Delete</p>
                                </NavLink>
                                </div>
                            <div onClick={() => setChangePsBlock(!changePsBlock)} className={style.dropElementn}>Change position
                            {changePsBlock && <div className={style.changePsBlock}>
                                <div className={style.chapterExit}></div>
                                { props.chapter_id && <div onClick={ () => changePs(0) } className={style.gotToInbox}>
                                    <div className={style.inboxImg}></div>
                                    <div class={style.inboxText}>Inbox</div>
                                </div> }
                                <div className={style.chaptersSc}>
                                    { props.chapters.map(d => {
                                        return d.id && <div onClick={ () => changePs(d.id) } className={style.chapterBlock}>
                                        <span className={style.chapterIcon}></span>
                                        <div className={style.chapterText}>{d.chapter}</div>
                                        { d.id === props.chapter_id && <span className={style.selectedChapter}></span>}
                                    </div>
                                    }) }
                                </div>
                                
                                
                            </div>}
                            </div>
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

