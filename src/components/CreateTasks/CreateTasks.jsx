import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import style from './CreateTasks.module.css';

const CreateTasks = (props) => {
    const [task, setTask] = useState(props.subtask ? props.subtask : props.task);
    const [description, setDescription] = useState(props.description)
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
                        props.updateTask(props.id, task, description);
                    }
                    props.setBtn(false)
                } else {
                    props.chapter_id ? props.getChapterTaskCreator(task, props.chapter_id)
                    : props.getTaskCreator(task, props.chapter_id, description, props.date)
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

