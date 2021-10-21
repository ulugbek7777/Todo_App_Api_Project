import * as axios from "axios";
import { updateTaskData } from "../redux/data-reducer";

const instance = axios.create({
    responseType: "json",
    withCredentials: true,
    baseURL: 'http://localhost:8000/api/',
    headers:     {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});


export const usersAPI = {
    me() {
        return instance.get('user')
            .then(response => {
                return response.data;
            });
    },
}

export const usersAPIData = {
    tasks() {
        return instance.get('tasks')
            .then(response => {
                return response.data;
            });
    },
    tasksToday() {
        return instance.get('tasks/today')
            .then(response => {
                return response.data;
            });
    },
    tasksCalendar(date) {
        return instance.post('tasks/calendar', { date })
            .then(response => {
                return response.data;
            });
    },
    createTask(task, chapter_id = 0, description, date) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        //debugger
        today = yyyy + '-' + dd + '-' + mm;
        return instance.post('store/task', { task, 'date': date ? date : today, 'chapter_id': chapter_id, description, 'priority': 1 })
            .then(response => {
                return response.data;
            });
    },
    finishedTask(id) {
        return instance.put('store/task/finished/' + id)
            .then(response => {
                return response.data;
            });
    },
    updateTaskData(id, newTask, description) {
        return instance.put('store/task/update/' + id, { 'task': newTask, description, 'priority': 3 })
            .then(response => {
                return response.data;
            });
    },
    deleteTaskData(id) {
        return instance.delete('store/task/delete/' + id)
            .then(response => {
                return response.data;
            });
    },

    //modal

    modalData(id) {
        return instance.get('task/show/' + id)
            .then(response => {
                return response.data;
            });
    },

    createSubtask(subtask, id, description) {
        return instance.post('store/subtask/task/' + id, { subtask, description })
            .then(response => {
                return response.data;
            });
    },

    finishedSubtask(id) {
        return instance.put('finished/subtask/' + id)
            .then(response => {
                return response.data;
            });
    },

    updateSubtaskData(id, newSubTask,description) {
        return instance.put('update/subtask/' + id, { 'subtask': newSubTask, description })
            .then(response => {
                return response.data;
            });
    },
    deleteSubTaskData(id) {
        return instance.delete('destroy/subtask/' + id)
            .then(response => {
                return response.data;
            });
    },

    // chapters

    chapters() {
        return instance.get('chapters')
            .then(response => {
                return response.data;
            });
    },
    createChapters(chapter) {
        return instance.post('store/chapter', { chapter })
            .then(response => {
                return response.data;
            });
    },
    updateChapters(chapter, id) {
        return instance.put('update/chapter/' + id, { chapter })
            .then(response => {
                debugger
                return response.data;
            });
    },
    deleteChapters(id) {
        return instance.delete('destroy/chapter/' + id)
            .then(response => {
                return response.data;
            });
    },
}