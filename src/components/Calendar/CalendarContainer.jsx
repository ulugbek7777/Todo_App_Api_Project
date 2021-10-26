import Calendar from './Calendar';
import React, { Component } from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import { getUserCalendarTasks, getTaskCreator, taskFinished, updateTask, deleteTask, getUserChapters, getUpdateTaskPosition } from './../../redux/data-reducer';
class Calendarcontainer extends Component {
    componentDidMount() {
        this.props.getUserChapters();
    }
    render() {
        return (
            <div>
                <Calendar getUserCalendarTasks={ this.props.getUserCalendarTasks } {...this.props} 
                tasks={this.props.tasks}
                getTaskCreator={this.props.getTaskCreator}
                updateTask={this.props.updateTask}
                deleteTask={this.props.deleteTask}
                taskFinished={this.props.taskFinished}
                taskToday={ this.props.taskToday }
                chapters={this.props.chapters}
                getUpdateTaskPosition={this.props.getUpdateTaskPosition}/>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    //console.log('mapStateToProps PROFILE')
    return ({
        tasks: state.userData.tasks,
        taskToday: state.userData.taskTodayCheck,
        chapters: state.userData.chapters,
    })
}

export default compose(
    connect(mapStateToProps, { getUserCalendarTasks, getTaskCreator, taskFinished, 
        updateTask, deleteTask, getUserChapters, getUpdateTaskPosition
    }),
)(Calendarcontainer);
