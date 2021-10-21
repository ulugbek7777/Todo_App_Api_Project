import React, { useState } from 'react';
import Task from '../Task/Task';
import style from './Inbox.module.css';
import sort from './../../assets/images/sort.png';
import more from './../../assets/images/more.png';
import CreateTasks from '../CreateTasks/CreateTasks';
import Chapters from './Chapters/Chapters';
import ChapterCreator from './Chapters/ChapterCreator';

const Inbox = (props) => {

    
    const [btn, setBtn] = useState(false);
    const [displayChapterInput, setDisplayChapterInput] = useState(false);
    const [chapterInput, setChapterInput] = useState('');
    const addChapter = () => {
        if(chapterInput === '') {
            alert('write something');
        }else if(chapterInput.length > 100) {
            alert('Task name limit: ' + chapterInput.length + '/100');
        } else {
            props.getChaptersCreator(chapterInput);
            setDisplayChapterInput(false);
            setChapterInput('');
        }
    }
    const cencel = () => { 
        setDisplayChapterInput(false);
        setChapterInput('');
    } 
    const flagIco = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red" stroke="grey" 
    stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line>
    </svg>
    return (
        <div>
            { flagIco }
            <div className={style.headerContainer}>
                <div className={style.leftText}>
                    <p className={style.inboxText}>Inbox</p>
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
            taskToday={ props.taskToday }
            />) }
            {
                btn ? <CreateTasks setBtn={setBtn} getTaskCreator={ props.getTaskCreator } />
                : <div onClick={ () => setBtn(true) } className={style.creatorButtons}>
                    <div className={style.plus}></div>
                    <div className={ style.createText }>Add Tasks</div>
                </div>
            }
            {
                displayChapterInput 
                ? <ChapterCreator setChapterInput={setChapterInput} chapterInput={chapterInput}
                addChapter={ addChapter } cencel={cencel} />
            : <div className={style.hoverActionButton} onClick={ () => setDisplayChapterInput(true) }>Add Chapter</div>
            }
            
            {
                props.chapters && props.chapters.map(d => {
                    return (
                        <Chapters chapter={d.chapter} tasks={ d.task } chapter_id ={d.id} 
                        taskFinished={ props.taskFinished }
                        updateTask={props.updateTask}
                        deleteTask={props.deleteTask}
                        getTaskCreator={ props.getTaskCreator }
                        getChapterTaskCreator={ props.getChapterTaskCreator }
                        taskToday={props.taskToday}
                        getChaptersUpdate={props.getChaptersUpdate}
                        getChaptersDelete={props.getChaptersDelete}
                        />
                    )
                })
            }
            
        </div>
    );
}

export default Inbox;

