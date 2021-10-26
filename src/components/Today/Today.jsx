import React, { useState } from 'react'
import Task from '../Task/Task';
import style from './Today.module.css';
import sort from './../../assets/images/sort.png';
import more from './../../assets/images/more.png';
import CreateTasks from '../CreateTasks/CreateTasks';

export default function Today(props) {
    const [btn, setBtn] = useState(false);
    const [displayChapterInput, setDisplayChapterInput] = useState(false);
    const [chapterInput, setChapterInput] = useState('');
    const addChapter = () => {
        alert(chapterInput);
        props.getChaptersCreator(chapterInput);
    }
    return (
        <div>
            <div className={style.headerContainer}>
                <div className={style.leftText}>
                    <p className={style.inboxText}>Today</p>
                </div>
                <div className={style.rightIcons}>
                    <img className={style.icon} src={sort} alt="sort" />
                    <img className={style.icon} src={more} alt="more" />
                </div>
            </div>
            { props.tasks && props.tasks.map(u => <Task 
            task={ u.task } description={u.description} required={u.required} id={u.id} taskFinished={ props.taskFinished }
            updateTask={props.updateTask}
            deleteTask={props.deleteTask}
            today={true}
            taskToday={props.taskToday}
            priority={u.priority}
            chapters={props.chapters}
            getUpdateTaskPosition={props.getUpdateTaskPosition}
            />) }
            {
                btn ? <CreateTasks setBtn={setBtn} getTaskCreator={ props.getTaskCreator } />
                : <div onClick={ () => setBtn(true) } className={style.creatorButtons}>
                    <div className={style.plus}></div>
                    <div className={ style.createText }>Add Tasks</div>
                </div>
            }           
            
        </div>
    );
}
