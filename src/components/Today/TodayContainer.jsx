import React from 'react';
import {connect} from "react-redux";
import { getTaskCreator, taskFinished, updateTask, deleteTask, getUserTodayTasks, getUserChapters, getUpdateTaskPosition} from '../../redux/data-reducer';
import {compose} from "redux";
import Today from './Today';


class TodayContainer extends React.Component {

    componentDidMount() {
        this.props.getUserTodayTasks();
        this.props.getUserChapters();
    }
    

    render() {
        return (
            <div>
                <Today {...this.props} 
                tasks={this.props.tasks}
                getTaskCreator={this.props.getTaskCreator}
                updateTask={this.props.updateTask}
                deleteTask={this.props.deleteTask}
                taskFinished={this.props.taskFinished}
                taskToday={ this.props.taskToday }
                chapters={this.props.chapters}
                getUpdateTaskPosition={this.props.getUpdateTaskPosition}
                />
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    //console.log('mapStateToProps PROFILE')
    debugger
    return ({
        tasks: state.userData.tasks,
        taskToday: state.userData.taskTodayCheck,
        chapters: state.userData.chapters,
    })
}

export default compose(
    connect(mapStateToProps, {getTaskCreator, taskFinished, 
        updateTask, deleteTask, getUserTodayTasks, getUserChapters, getUpdateTaskPosition
    }),
)(TodayContainer);
