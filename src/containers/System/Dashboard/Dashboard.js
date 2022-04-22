import React, { Component } from "react";
import { connect } from "react-redux";
import { dispatch } from "../../../redux";
import * as actions from '../../../store/actions';
import './Dashboard.scss';
import { getAllExamination, getOneDoctorTime } from '../../../services/userService'
import HomeFooter from "../../HomePage/Section/HomeFooter";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listTimeOfDoctor: []
        }
    }
    async componentDidMount() {

    }


    render() {
        let listTimeOfDoctor = this.state.listTimeOfDoctor
        console.log(listTimeOfDoctor)
        return (
            <React.Fragment>
                <div className='doctor-workshift-container'>
                            <p><b>DASHBOARD</b></p>
                    <div className="row doctor-workshift-content ">
                        <div className="col-12">
                            <div className="row">
                            <div className="col-12 dashboard_logo_right"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <HomeFooter/>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
        userInfo: state.user.userInfo
    };
};
const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleHours: () => dispatch(actions.fetchAllScheduleHours()),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)