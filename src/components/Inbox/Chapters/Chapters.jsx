import React, { useState } from 'react';
import CreateTasks from '../../CreateTasks/CreateTasks';
import Task from '../../Task/Task';
import style from './../Inbox.module.css';
import ChapterCreator from './ChapterCreator';

const Chapters = (props) => {

    const [accordion, setAccordion] = useState(false);
    const [btn, setBtn] = useState(false);

    const [displayChapterInput, setDisplayChapterInput] = useState(false);
    const [chapterInput, setChapterInput] = useState(props.chapter);
    const addChapter = () => {
        if(chapterInput === '') {
            alert('write something');
        } else if(chapterInput.length > 100) {
            alert('Task name limit: ' + chapterInput.length + '/100');
        } else {
            props.getChaptersUpdate(chapterInput, props.chapter_id);
            setDisplayChapterInput(false);
            setChapterInput('');
        }
    }
    const cencel = () => { 
        setDisplayChapterInput(false);
        setChapterInput('');
    }
    const deleteChapter = () => {
        let x = window.confirm('Do you want to delete this chapter?');
        if(x) {
            props.getChaptersDelete(props.chapter_id);
        }
    }
    return (
        <div>
            {
                displayChapterInput ? <ChapterCreator cencel={cencel} setChapterInput={setChapterInput} chapterInput={chapterInput}
                addChapter={ addChapter }/>
                : <div className={style.chapterBlock}>
                    <div style={{ transform: accordion && 'rotate(0deg)' }} 
                        onClick={ () => setAccordion(!accordion) }
                        className={style.accordionIcon}></div>
                    <p className={style.addChapter}>{ props.chapter }</p>
                    
                    <div className={style.dropdown}>
                        <div className={style.threeDotsChapter + ' ' + style.dropbtn}></div>
                        <div className={style.dropdownContent}>
                            <p onClick={ () => setDisplayChapterInput(true) }>Edit</p>
                            <p onClick={ deleteChapter }>Delete</p>
                            <p>yiyiyiy</p>
                        </div>
                    </div>
                </div>
            }
            
            {
                accordion &&
                props.tasks && props.tasks.map(u => <Task 
                    chapter_id={props.chapter_id}
                    task={ u.task } required={u.required} id={u.id} taskFinished={ props.taskFinished }
                    updateTask={props.updateTask}
                    deleteTask={props.deleteTask}
                    taskToday={props.taskToday}
                    description={u.description}
                    />)
            }
            {
                btn ? accordion && <CreateTasks getChapterTaskCreator={props.getChapterTaskCreator} chapter_id ={props.chapter_id} setBtn={setBtn} getTaskCreator={ props.getTaskCreator } />
                : accordion && <div onClick={ () => setBtn(true) } className={style.creatorButtons}>
                    <div className={style.plus}></div>
                    <div className={ style.createText }>Add Tasks</div>
                </div>
            }
        </div>
    )
}

export default Chapters;