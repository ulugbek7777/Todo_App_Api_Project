import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import { getAuthUser } from "../../redux/auth-reducer";
import { getSearchingData } from '../../redux/data-reducer'
class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthUser();
    }

    render() {
        debugger
        return <Header {...this.props} getSearchingData={this.props.getSearchingData} searchingData={this.props.searchingData} 
        taskTodayCheck={this.props.taskTodayCheck}
        />
    }
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    name: state.auth.name,
    searchingData: state.userData.searchingData,
    taskTodayCheck: state.userData.taskTodayCheck,
});

export default connect(mapStateToProps, {getAuthUser, getSearchingData})(HeaderContainer);