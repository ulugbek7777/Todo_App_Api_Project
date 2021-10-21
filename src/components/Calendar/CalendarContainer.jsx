import Calendar from './Calendar';
import React, { Component } from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import { getUserCalendarTasks, getTaskCreator, taskFinished, updateTask, deleteTask, } from './../../redux/data-reducer';
class Calendarcontainer extends Component {
    componentDidMount() {
        
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
                taskToday={ this.props.taskToday }/>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    //console.log('mapStateToProps PROFILE')
    return ({
        tasks: state.userData.tasks,
        taskToday: state.userData.taskTodayCheck,
    })
}

export default compose(
    connect(mapStateToProps, { getUserCalendarTasks, getTaskCreator, taskFinished, 
        updateTask, deleteTask,
    }),
)(Calendarcontainer);
