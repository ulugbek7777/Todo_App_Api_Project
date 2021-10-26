import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import style from './CreateTasks.module.css';

const CreateTasks = (props) => {
    const [task, setTask] = useState(props.subtask ? props.subtask : props.task);
    const [description, setDescription] = useState(props.description);
    const [numPriority, setNumPriority] = useState(props.priority ? props.priority : 4)
    const taskOnchange = (e) => {
        setTask(e.currentTarget.value);
    }
    const addTask = () => {
        if (task === undefined || task.length === 0) {
            alert('Write something to task!');
        } else if(task.length > 255) {
            alert('Task name limit: ' + task.length + '/255');
        } else if (description && description.length > 255) {
            alert('Description name limit: ' + description.length + '/255');
        } else {
            if(props.getSubtaskCreator) {
                props.getSubtaskCreator(task, parseInt(props.id, 10), description);
            } else {
                if (props.id) {
                    if(props.getUpdateSubtask) {
                        props.getUpdateSubtask(props.id, task, description)
                    } else {
                        props.updateTask(props.id, task, description, numPriority);
                    }
                    props.setBtn(false)
                } else {
                    props.chapter_id ? props.getChapterTaskCreator(task, props.chapter_id, description)
                    : props.getTaskCreator(task, props.chapter_id, description, props.date, numPriority)
                }
            }
        }
        
        
        setDescription('');
        setTask('');
    }
    return (
        <div>
            <div>
                <div className={style.container}>
                    <div className={style.textAreaBlock}>
                        <div><TextareaAutosize onChange={ (e) => { taskOnchange(e) }} value={task} className={style.textArea + ' ' + style.task} placeholder="Name Task" autoFocus 
                        onFocus={function(e) {
                            var val = e.target.value;
                            e.target.value = '';
                            e.target.value = val;
                          }}
                        /></div>
                        <div><TextareaAutosize onChange={ (e) => setDescription(e.currentTarget.value) } value={description} 
                        className={style.textArea + ' ' + style.description} placeholder="Description" /></div>
                    </div>
                    <div className={style.createInputFooter}>
                        <div className={style.icoDrop}>
                            <div className={style.icoPr1}></div>
                            <div className={style.dropdownContent}>
                                <p onClick={ () => setNumPriority(1) }>
                                    <div className={style.icoBlock}>
                                        <div className={`${style.priIco} ${style.redIco}`}></div> 
                                    </div>
                                    <div className={numPriority === 1 && style.activePriority}></div>
                                    Priority 1
                                </p>
                                <p onClick={ () => setNumPriority(2) }>
                                    <div className={style.icoBlock}>
                                        <div className={`${style.priIco} ${style.Ico2}`}></div> 
                                    </div>
                                    <div className={numPriority === 2 && style.activePriority}></div>
                                    Priority 2
                                </p>
                                <p onClick={ () => setNumPriority(3) }>
                                    <div className={style.icoBlock}>
                                        <div className={`${style.priIco} ${style.Ico3}`}></div> 
                                    </div>
                                    <div className={numPriority === 3 && style.activePriority}></div>
                                    Priority 3
                                </p>
                                <p onClick={ () => setNumPriority(4) }>
                                    <div className={style.icoBlock}>
                                        <div className={`${style.priIco} ${style.Ico4}`}></div> 
                                    </div>
                                    <div className={numPriority === 4 && style.activePriority}></div>
                                    Priority 4
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={ addTask } className={`${style.button} ${style.redBtn}`}>Add task</button>
                    <button onClick={ () => props.setBtn(false) } className={`${style.button} ${style.whiteBtn}`}>Cencel</button>
                </div>
            </div>    
        </div>
    );
}

export default CreateTasks;

