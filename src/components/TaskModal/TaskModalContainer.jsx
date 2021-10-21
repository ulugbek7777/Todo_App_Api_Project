import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import Taskmodal from './TaskModal';
import { getModalData, taskFinished, updateTask, deleteTask, 
    getSubtaskCreator, getSubtaskFinished, getUpdateSubtask,
    getDeleteSubTask, } from './../../redux/data-reducer'

class TaskModalContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getModalData(id)
    }
    

    render() {
        console.log(this.props.task)
       // console.log("RENDER PROFILE");
        return (
            <div>
                {this.props.task.map(u => 
                    <Taskmodal id={this.props.match.params.id} task={u.task} description={u.description} required={u.required}
                    chapter_id={u.chapter_id}
                    taskFinished={this.props.taskFinished}
                    updateTask={this.props.updateTask}
                    deleteTask={this.props.deleteTask}
                    getSubtaskCreator={this.props.getSubtaskCreator}
                    subtasks={this.props.subtasks}
                    getSubtaskFinished={this.props.getSubtaskFinished}
                    getUpdateSubtask={this.props.getUpdateSubtask}
                    getDeleteSubTask={this.props.getDeleteSubTask}
                    taskToday={this.props.taskToday}
                    />
                )}
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    //console.log('mapStateToProps PROFILE')
    return ({
        task: state.userData.modalData.task,
        subtasks: state.userData.modalData.subtasks,
        taskToday: state.userData.taskTodayCheck,
        // required: state.userData.modalData.task.required, 
    })
}

export default compose(
    connect(mapStateToProps, { getModalData, taskFinished, updateTask, deleteTask, 
        getSubtaskCreator, getSubtaskFinished, getUpdateSubtask, getDeleteSubTask,
    }),
    withRouter
)(TaskModalContainer);
