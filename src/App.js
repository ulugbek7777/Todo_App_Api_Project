import './App.css';
import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import Register from './components/Auth/Register'
import Login from './components/Auth/Login';
import LeftSidebar from './components/LeftSidebar/LeftSidebar';
import HeaderContainer from './components/Header/HeaderContainer';
import InboxContainer from './components/Inbox/InboxContainer';
import TaskModalContainer from './components/TaskModal/TaskModalContainer';
import TodayContainer from './components/Today/TodayContainer';
import CalendarContainer from './components/Calendar/CalendarContainer';
import { compose } from 'redux';
import {connect} from "react-redux";
class App extends Component {

    render() {
        console.log(this.props.taskTodayCheck);
        //debugger
        return (
            <div className = "App">
            <HeaderContainer />
            <div>
                <div style={{ position: 'relative' }}>
                <LeftSidebar />
                </div>
                <div className = "boss-container">  
                    <div className='container'>
                        <Route path = '/register' render = { () => <Register /> }/>
                        <Route path = '/login' render = { () => <Login /> }/>
                        <Route path = '/inbox' render = { () => <InboxContainer /> }/>
                        <Route path = '/today' render = { () => <TodayContainer /> }/>
                        <Route path = '/upcoming' render = { () => <CalendarContainer /> }/>
                    </div>        
                    
                </div>

                <Route path = { this.props.taskTodayCheck + '/task/:id?'} render = { () => <TaskModalContainer /> }/>
            </div>
        </div> 
        )
    }
}



const mapStateToProps = (state) => ({
    taskTodayCheck: state.userData.taskTodayCheck,
})
export default compose(
    withRouter,
    connect(mapStateToProps, {}))(App);