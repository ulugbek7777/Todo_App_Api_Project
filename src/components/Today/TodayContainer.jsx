import React from 'react';
import {connect} from "react-redux";
import { getTaskCreator, taskFinished, updateTask, deleteTask, getUserTodayTasks} from '../../redux/data-reducer';
import {compose} from "redux";
import Today from './Today';


class TodayContainer extends React.Component {

    componentDidMount() {
        this.props.getUserTodayTasks();
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
                />
            </div>
        )
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
    connect(mapStateToProps, {getTaskCreator, taskFinished, 
        updateTask, deleteTask, getUserTodayTasks
    }),
)(TodayContainer);
