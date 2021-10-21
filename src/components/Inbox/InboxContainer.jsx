import React from 'react';
import {connect} from "react-redux";
import { getUserTasks, getTaskCreator, taskFinished, updateTask, deleteTask, 
    getUserChapters, getChaptersCreator, getChapterTaskCreator, getChaptersUpdate,
    getChaptersDelete } from '../../redux/data-reducer';
import Inbox from './Inbox';

class InboxContainer extends React.Component {
    componentDidMount() {
        this.props.getUserTasks();
        this.props.getUserChapters();
    }

    render() {
       // console.log("RENDER PROFILE");
        return (
            <Inbox {...this.props} 
            tasks={this.props.tasks}
            getTaskCreator={this.props.getTaskCreator}
            updateTask={this.props.updateTask}
            deleteTask={this.props.deleteTask}
            taskToday={ this.props.taskToday }
            //chapters
            chapters={this.props.chapters}
            getChaptersCreator={this.props.getChaptersCreator}
            getChapterTaskCreator={this.props.getChapterTaskCreator}
            getChaptersUpdate={this.props.getChaptersUpdate}
            getChaptersDelete={this.props.getChaptersDelete}
            />
        )
    }
}

let mapStateToProps = (state) => {
    //debugger
    return ({
        tasks: state.userData.tasks,
        taskToday: state.userData.taskTodayCheck,
        chapters: state.userData.chapters,
    })
}

export default connect(mapStateToProps, {getUserTasks, 
    getTaskCreator, taskFinished, 
    updateTask, deleteTask,
    //chapters
    getUserChapters,
    getChaptersCreator, getChapterTaskCreator, getChaptersUpdate, getChaptersDelete

})(InboxContainer);