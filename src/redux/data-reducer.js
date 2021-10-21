import { usersAPIData } from "../api/api";


const SET_USER_DATA = 'SET_USER_DATA';
const SET_USER_DATA_TODAY = 'SET_USER_DATA_TODAY';
const SET_USER_DATA_CALENDAR = 'SET_USER_DATA_CALENDAR';
const CREATE_TASK_DATA = 'CREATE_TASK_DATA';
const FINISHED_TASK = 'FINISHED_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const DELETE_TASK = 'DELETE_TASK';

//MODAL WINDOW

const SET_MODAL_DATA = 'SET_MODAL_DATA';
//Subtask
const CREATE_SUBTASK_DATA = 'CREATE_SUBTASK_DATA';
const UPDATE_SUBTASK = 'UPDATE_SUBTASK';
const DELETE_SUBTASK = 'DELETE_SUBTASK';
const FINISHED_SUBTASK = 'FINISHED_SUBTASK';
//chapters

const SET_USER_DATA_CHAPTERS = 'SET_USER_DATA_CHAPTERS';
const CREATE_CHAPTER_DATA = 'CREATE_CHAPTER_DATA';
const CREATE_CHAPTER_TASK_DATA = 'CREATE_CHAPTER_TASK_DATA';
const UPDATE_CHAPTER_TASK_DATA = 'UPDATE_CHAPTER_TASK_DATA';
const DELETE_CHAPTER_TASK_DATA = 'DELETE_CHAPTER_TASK_DATA';


let initialState = {
    tasks: null, 
    taskTodayCheck: '',
    chapters: null,
    modalData: {
        task: [],
        subtasks: [],
        checkModalActive: false
    }
};

const checker = (state) => {
                return {
                    ...state,
                    tasks: [...state.tasks],
                    chapters: [...state.chapters],
                    modalData: {
                        subtasks: [...state.modalData.subtasks],
                        task: [...state.modalData.task],
                        checkModalActive: true
                    }
                }
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                tasks: action.tasks,
                taskTodayCheck: '/inbox',
            };
        case SET_USER_DATA_TODAY:
            return {
                ...state,
                tasks: action.tasks,
                taskTodayCheck: '/today',
            };
        case SET_USER_DATA_CALENDAR: {
            return {
                ...state,
                tasks: action.tasks,
                taskTodayCheck: '/upcoming',
            };
        }
        case CREATE_TASK_DATA:
            let task = action.task;
            return {
                ...state,
                tasks: [...state.tasks, task],
            };
        case UPDATE_TASK: {
            state.tasks.filter(task => {
                if(task.id === parseInt(action.data.id, 10)) {
                    task.task = action.data.newTask;
                    task.description = action.data.newDescription
                };
            });
            state.chapters.find((chapter) => {
                if(chapter.id === action.data.chapter_id) {
                    for(let i = 0;i <= chapter.task.length - 1;i++) {
                        if(chapter.task[i].id === parseInt(action.data.id, 10)) {
                            chapter.task[i].task = action.data.newTask
                            chapter.task[i].description = action.data.newDescription
                        }
                    }
                }
            });
            if(state.modalData.checkModalActive) {
                state.modalData.task[0].task = action.data.newTask; 
                state.modalData.task[0].description = action.data.newDescription;
                return checker(state);
            }
            return {
                ...state,
                tasks: [...state.tasks],
                chapters: [...state.chapters],
                modalData: {
                    subtasks: [...state.modalData.subtasks],
                    task: [...state.modalData.task],
                    checkModalActive: false
                }
            }
        }
            
        case FINISHED_TASK: {
            if (action.data.chapter_id) {
                state.chapters.filter(chapter => {
                    if(chapter.id === action.data.chapter_id) {
                        chapter.task.filter(task => {
                            if(task.id === parseInt(action.data.id, 10)) {
                                task.required = !task.required;
                            }
                        });
                    }
                });
            }            
            state.tasks.filter(task => {
                if(task.id === parseInt(action.data.id, 10)) {
                    task.required = !task.required;
                };
            });
            if(state.modalData.checkModalActive) {
                state.modalData.task[0].required = !state.modalData.task[0].required; 
                return checker(state);
                
            }
            return {
                ...state,
                tasks: [...state.tasks],
                // chapters: [...state.chapters],
            }
        }
            
        case DELETE_TASK: 
            let i = 0;
            state.tasks.filter(task => {
                if(task.id === parseInt(action.data.id, 10)) {
                    state.tasks.splice(i, 1);
                };
                i++;
            });
            state.chapters && state.chapters.find((chapter) => {
                if(chapter.id === action.data.chapter_id) {
                    for(let i = 0;i <= chapter.task.length -1;i++) {
                        if(chapter.task[i].id === parseInt(action.data.id, 10)) {
                            chapter.task.splice(i, 1);
                        }
                    }
                }
            });
            return {
                ...state,
                tasks: [...state.tasks],
                chapters: [...state.chapters],
            }

        //MODAL WINDOW LOGIC
        case SET_MODAL_DATA: 
            state.modalData.task = [action.data.task];
            state.modalData.subtasks = [...action.data.subtasks];
            state.modalData.checkModalActive = true;
            return {
                ...state,
            }

        //subtask
        case CREATE_SUBTASK_DATA: {
            state.modalData.subtasks.push(action.subtask);

            return checker(state);
        }
        case UPDATE_SUBTASK: {
            state.modalData.subtasks.find(subtask => {
                if(subtask.id === action.data.id) {
                    subtask.subtask = action.data.newSubTask;
                    subtask.description = action.data.description;
                }
            });
            return checker(state);
        }
        case DELETE_SUBTASK: {
            state.modalData.subtasks = state.modalData.subtasks.filter(subtask => {
                return subtask.id !== action.id;
            });
            return checker(state);
        }
        case FINISHED_SUBTASK: {
            state.modalData.subtasks.find(subtask => {
                if(subtask.id === action.id) {
                    subtask.required = !subtask.required
                }
            });
            return checker(state);
        }
        //END MODAL WINDOW LOGIC

        //chapters

        case SET_USER_DATA_CHAPTERS:
            return {
                ...state,
                chapters: action.chapters,
            };
        case CREATE_CHAPTER_DATA:
            let chapter = action.chapter;
            return {
                ...state,
                chapters: [...state.chapters, chapter]
            };
        case CREATE_CHAPTER_TASK_DATA:
            state.chapters.filter(chapter => {
                //debugger
                if(chapter.id === action.data.chapter_id && chapter.task !== undefined) {
                    //debugger
                    chapter.task.push(action.data.task);
                } else {
                    chapter.task = [action.data.task]
                }
            })
            return {
                ...state,
                chapters: [...state.chapters]
            }
        case UPDATE_CHAPTER_TASK_DATA: {
            state.chapters.find(u => {
                if (u.id === action.data.id) {
                    u.chapter = action.data.chapter;
                }
            });

            return {
                    ...state,
                    chapters: [...state.chapters],
            };
        }
        case DELETE_CHAPTER_TASK_DATA: {
            state.chapters = state.chapters.filter(u => {
                return u.id !== action.id;
            });
            return {
                ...state,
                chapters: [...state.chapters],
            }
        }

        default:
            return state;
    }
}

export const setUserTasks = (tasks) => ({type: SET_USER_DATA, tasks});
export const setUserTodayTasks = (tasks) => ({type: SET_USER_DATA_TODAY, tasks});
export const setUserCalendarTasks = (tasks) => ({type: SET_USER_DATA_CALENDAR, tasks});
export const createTaskData = (task) => ({type: CREATE_TASK_DATA, task});
export const updateTaskData = (data) => ({type: UPDATE_TASK, data});
export const finishedTaskData = (data) => ({type: FINISHED_TASK, data});
export const deleteTaskData = (data) => ({type: DELETE_TASK, data});

//MODAL WINDOW LOGIC
export const setModalData = (data) => ({type: SET_MODAL_DATA, data});

//subtask
export const createSubtaskkData = (subtask) => ({type: CREATE_SUBTASK_DATA, subtask});
export const updateSubTaskData = (data) => ({type: UPDATE_SUBTASK, data});
export const deleteSubTaskData = (id) => ({type: DELETE_SUBTASK, id});
export const subtaskFinished = (id) => ({type: FINISHED_SUBTASK, id});
//END MODAL WINDOW LOGIC

//chapters

export const setUserChapters = (chapters) => ({type: SET_USER_DATA_CHAPTERS, chapters});
export const createChapterData = (chapter) => ({type: CREATE_CHAPTER_DATA, chapter});
export const createChapterTaskData = (data) => ({type: CREATE_CHAPTER_TASK_DATA, data});
export const updateChapterTaskData = (data) => ({type: UPDATE_CHAPTER_TASK_DATA, data});
export const deleteChapterTaskData = (id) => ({type: DELETE_CHAPTER_TASK_DATA, id});
//endChapters

export const getUserTasks = () => (dispatch) => {
    return usersAPIData.tasks()
        .then(response => {
            if (true) {
                let tasks = response;
                dispatch(setUserTasks(tasks));
            }
    });
};
export const getUserTodayTasks = () => (dispatch) => {
    return usersAPIData.tasksToday()
        .then(response => {
            if (true) {
                let tasks = response.tasks;
                dispatch(setUserTodayTasks(tasks));
            }
    });
};

export const getUserCalendarTasks = (date) => (dispatch) => {
    return usersAPIData.tasksCalendar(date)
        .then(response => {
            if (true) {
                let tasks = response.tasks;
                dispatch(setUserCalendarTasks(tasks));
            }
    });
};

export const getTaskCreator = (task, chapter_id, description, date) => (dispatch) => {
    return usersAPIData.createTask(task, chapter_id, description, date)
        .then(response => {
            let task = response.task;
            dispatch(createTaskData(task));
            
    });
}
export const taskFinished = (id, chapter_id) => (dispatch) => {
    return usersAPIData.finishedTask(id)
        .then(response => {
            dispatch(finishedTaskData({id, chapter_id}));
    });
}
export const updateTask = (id, newTask, newDescription) => (dispatch) => {
    return usersAPIData.updateTaskData(id, newTask, newDescription)
        .then(response => {
            let data = {
                'id': parseInt(id, 10),
                newTask, 
                'chapter_id': response.chapter_id,
                newDescription,
            }
            dispatch(updateTaskData(data));
            
    });
}

export const deleteTask = (id) => (dispatch) => {
    return usersAPIData.deleteTaskData(id)
        .then(response => {
            dispatch(deleteTaskData({id, 'chapter_id': response.chapter_id}));
    });
}

//modal

export const getModalData = (id) => (dispatch) => {
    return usersAPIData.modalData(id)
        .then(response => {
            if (true) {
                //debugger
                let task = response.task;
                let subtasks = response.subtasks;
                dispatch(setModalData({task, subtasks}));
            }
    });
};

//subtask

export const getSubtaskCreator = (subtask, id, description) => (dispatch) => {
    return usersAPIData.createSubtask(subtask, id, description)
        .then(response => {
            dispatch(createSubtaskkData(response.subtask));
    });
}

export const getUpdateSubtask = (id, newSubTask, description) => (dispatch) => {
    return usersAPIData.updateSubtaskData(id, newSubTask, description)
        .then(response => {
            let data = {
                'id': parseInt(id, 10),
                newSubTask,
                description
            }
            dispatch(updateSubTaskData(data));
            
    });
}
export const getDeleteSubTask = (id) => (dispatch) => {
    return usersAPIData.deleteSubTaskData(id)
        .then(response => {
            dispatch(deleteSubTaskData(id));
    });
}

export const getSubtaskFinished = (id) => (dispatch) => {
    return usersAPIData.finishedSubtask(id)
        .then(response => {
            dispatch(subtaskFinished(id));
    });
}

//chapters

export const getUserChapters = () => (dispatch) => {
    return usersAPIData.chapters()
        .then(response => {
            if (true) {
                let chapters = response;
                dispatch(setUserChapters(chapters));
            }
    });
};

export const getChaptersCreator = (chapter) => (dispatch) => {
    return usersAPIData.createChapters(chapter)
        .then(response => {
            dispatch(createChapterData(response.chapter));
    });
}
export const getChaptersUpdate = (chapter, id) => (dispatch) => {
    return usersAPIData.updateChapters(chapter, id)
        .then(response => {
            dispatch(updateChapterTaskData({ chapter, id }));
    });
}

export const getChapterTaskCreator = (task, chapter_id) => (dispatch) => {
    return usersAPIData.createTask(task, chapter_id)
        .then(response => {
            let task = response.task;
            let chapter_id = response.task.chapter_id;
            dispatch(createChapterTaskData({task, chapter_id}));
            
    });
}

export const getChaptersDelete = (id) => (dispatch) => {
    return usersAPIData.deleteChapters(id)
        .then(response => {
            dispatch(deleteChapterTaskData(id));
    });
}

export default dataReducer;