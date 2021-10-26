import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import CreateTasks from '../CreateTasks/CreateTasks';
import Task from '../Task/Task';
import Subtask from './Subtask/Subtask';
import style from './TaskModal.module.css'

const Taskmodal = (props) => {
    const [btn, setBtn] = useState(false);
    return (
        <div className={style.block}>
            <section className={ style.container }>
                <div className={style.modalCard}>
                    <div className={style.modalCardHeader}>
                        <NavLink to={props.taskToday}>
                            <div className={style.exitIcon}></div>
                        </NavLink>
                    </div>
                    <div className={style.modalCardTask}>
                            <Task 
                                task={ props.task } description={ props.description } required={props.required} id={props.id} taskFinished={ props.taskFinished }
                                chapter_id={ props.chapter_id }
                                updateTask={props.updateTask}
                                deleteTask={props.deleteTask}
                                taskModal={ true }
                                priority={props.priority}
                                getUpdateTaskPosition={props.getUpdateTaskPosition}
                                chapters={props.chapters}
                                />
                    </div>
                    <div className={style.content}>
                        <div className={style.tasblist}>
                            <h1>Tablist</h1>
                        </div>
                        <div className={style.contentContainer}>
                            {
                                props.subtasks.map(u => <Subtask getSubtaskFinished={props.getSubtaskFinished} 
                                    subtask={u.subtask} 
                                    required={u.required}
                                    id={u.id}
                                    getUpdateSubtask={props.getUpdateSubtask}
                                    getDeleteSubTask={props.getDeleteSubTask}
                                    description={u.description}
                                />)
                            }
                            {
                                btn ? <CreateTasks setBtn={setBtn} getSubtaskCreator={ props.getSubtaskCreator } id={props.id}/>
                                : <div onClick={ () => setBtn(true) } className={style.creatorButtons}>
                                    <div className={style.plus}></div>
                                    <div className={ style.createText }>Add Tasks</div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Taskmodal;