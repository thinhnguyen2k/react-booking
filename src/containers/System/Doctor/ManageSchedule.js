import React, { Component } from "react";
import { connect } from "react-redux";
import { dispatch } from "../../../redux";
import * as actions from '../../../store/actions';
import './ManageSchedule.scss';
import { getInfoBookingOneDoctor } from '../../../services/userService'
import HomeFooter from "../../HomePage/Section/HomeFooter";

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            listTimeOfDoctor: [],
            arrinfoBooking:[]
        }
    }
    async componentDidMount() {
        console.log(this.props.userInfo)
        await this.getinfoBooking();

    }

    getinfoBooking = async () => {
        let response = await getInfoBookingOneDoctor(this.props.userInfo[0].idStaff);
        console.log(response)
        if (response && response.success === true) {
            this.setState({
                arrinfoBooking: response.result
            })
        }
    }
    render() {
        let arrinfoBooking = this.state.arrinfoBooking
        return (
            <React.Fragment>
                <div className='doctor-workshift-container'>
                    <div className="row doctor-workshift-content ">
                        <div className="col-12">
                            <p><b> Lịch khám bệnh cá nhân</b></p>
                            <table id="customers">
                                <tbody>
                                    <tr >
                                        <th>Giờ khám</th>
                                        <th>Ngày khám</th>
                                        <th>Tên bệnh nhân</th>
                                    </tr>
                                    {
                                        arrinfoBooking && arrinfoBooking.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{item.slotTime}</td>
                                                    <td>{item.date}</td>
                                                    <td>{item.name}</td>
                                                
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
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
export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule)