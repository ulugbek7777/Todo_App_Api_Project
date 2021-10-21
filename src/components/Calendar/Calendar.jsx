import React, { useState } from 'react'
import Calendarr from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import style from './../Inbox/Inbox.module.css';
import sort from './../../assets/images/sort.png';
import more from './../../assets/images/more.png';
import CreateTasks from '../CreateTasks/CreateTasks';
import Task from '../Task/Task';
export default function Calendar(props) {
    const [value, onChange] = useState(new Date());
    const [btn, setBtn] = useState(false);
    const [getTasksState, setGetTasksState] = useState(false);
    const getTasks = () => {
        props.getUserCalendarTasks(dayjs(value).format('YYYY-DD-MM'));
        setGetTasksState(true);
    }
    return (
        <div>
            <div className={style.headerContainer}>
                <div className={style.leftText}>
                    <p className={style.inboxText}>Upcomming</p>
                </div>
                <div className={style.rightIcons}>
                    <img className={style.icon} src={sort} alt="sort" />
                    <img className={style.icon} src={more} alt="more" />
                </div>
            </div>
            {
                !getTasksState ? 
                <div>
                    <Calendarr
                        locale="eng"
                        onChange={onChange}
                        minDate={new Date()}
                        value={value}
                    />
                    <button className={style.redBtn + ' ' + style.button} onClick={ getTasks }>Get tasks</button>
                </div> 
                : <div>
                    { props.tasks && props.tasks.map(u => <Task 
                    task={ u.task } description={u.description} required={u.required} id={u.id} taskFinished={ props.taskFinished }
                    updateTask={props.updateTask}
                    deleteTask={props.deleteTask}
                    calendar={true}
                    taskToday={props.taskToday}
                    />) }
                    {
                        btn ? <CreateTasks setBtn={setBtn} getTaskCreator={ props.getTaskCreator } date={dayjs(value).format('YYYY-DD-MM')} />
                        : <div onClick={ () => setBtn(true) } className={style.creatorButtons}>
                            <div className={style.plus}></div>
                            <div className={ style.createText }>Add Tasks</div>
                        </div>
                    } 
                </div>
            }
            
        </div>
    )
}
