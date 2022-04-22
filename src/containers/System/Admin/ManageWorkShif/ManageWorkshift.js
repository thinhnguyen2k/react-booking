import React, { Component } from "react";
import { connect } from "react-redux";
import { dispatch } from "../../../../redux";
import './ManageWorkshift.scss';
import * as actions from '../../../../store/actions';
import { CRUD_ACTIONS, CommonUtils } from '../../../../utils';
import DatePicker from "../../../../components/Input/DatePicker";
import { getAllDoctorTime,getOneDoctorTime } from "../../../../services/userService";
import Select from 'react-select';
import moment from "moment";
import HomeFooter from "../../../HomePage/Section/HomeFooter";
import { compareAsc, format } from 'date-fns'
class ManageWorkshift extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: '',
            selectedTime: '',
            selecteddate: '',
            listDoctors: [],
            listTime: [],
            listDate: [],
            hasOldData: false,
            currentDate: '',
            arrDoctorTime: [],
            currentDate:''
        }
    }
    async componentDidMount() {
        this.props.fetAllDoctorsRedux();
        this.props.fetchAllScheduleHoursRedux();
        this.props.fetAllExaminationRedux();
        this.props.fetAllDayRedux();
        this.props.fetAllSlotTimeRedux();
        await this.getAllDoctorTimeRedux();
    }


    getAllDoctorTimeRedux = async () => {
        let response = await getAllDoctorTime();
        if (response && response.success === true) {
            this.setState({
                arrDoctorTime: response.result
            })
        }
    }
    buildDataInputSelectDoctor = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.label = `${item.name}`;
                object.value = item.idStaff;
                result.push(object)
            })
        }
        return result
    }
    buildDataInputSelectExamination = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.label = `${item.slotTime}`;
                object.value = item.idTime;
                // object.date = `${item.currentDate}`
                result.push(object)

            })
        }
        return result
    }
    buildDataInputSelectDate = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.label = `${item.currentDate}`
                // object.value = item.idTime;
                result.push(object)

            })
        }
        return result
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelectDoctor = this.buildDataInputSelectDoctor(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelectDoctor
            })
        }
        if (prevProps.allSlotTime !== this.props.allSlotTime) {
            let dataSelectExamination = this.buildDataInputSelectExamination(this.props.allSlotTime)
            this.setState({
                listTime: dataSelectExamination,
            })
            console.log(dataSelectExamination);
        }
        if (prevProps.allDay !== this.props.allDay) {
            let dataSelectDate = this.buildDataInputSelectDate(this.props.allDay)
            this.setState({
                listDate: dataSelectDate
            })
        }
    }
    handleChangeDoctor = async (selectedDoctor) => {
        this.setState({
            selectedDoctor,
            
        })
        console.log(selectedDoctor)

    }
    handleChangeDoctorShow = async (selectedDoctor) =>{
        this.setState({
            selectedDoctor,
        })
        let response = await getOneDoctorTime(selectedDoctor.value);
        console.log(response)
        if (response && response.success === true) {
            this.setState({
                arrDoctorTime:response.result
            })
        }
    }
    handleChangeTime = async (selectedTime) => {
        this.setState({
            selectedTime,
        })
        console.log(selectedTime)
    }
    handleChangeDate = async (selecteddate) => {
        this.setState({
            selecteddate
        })

    }
    handleOnchageDatePicker = (date) =>{
        this.setState({
            currentDate: date[0]
        })
    }

    handleSaveUser = () => { 
        let dateTemp = this.state.currentDate;
    
        this.props.createNewDoctorTime({
            idStaff: this.state.selectedDoctor.value,
            idTime: this.state.selectedTime.value,
            date: format(new Date(dateTemp), 'yyyy-MM-dd')
        })
        console.log(this.props)
    }
    render() {
        let arrDoctorTime = this.state.arrDoctorTime
        console.log(this.props)
        return (
            <React.Fragment>
                <div className='user-redux-container'>
                    <div className="title" >
                        GIỜ KHÁM BỆNH BÁC SĨ
                    </div>
                    <div className='user-redux-body'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-4'> 
                                    <label>Bac si</label>
                                    <Select
                                        value={this.state.selectedDoctor}
                                        onChange={this.handleChangeDoctor}
                                        options={this.state.listDoctors}
                                    />
                                </div>
                                <div className='col-4'>
                                    <label>Gio Kham benh</label>
                                    <Select
                                        value={this.state.selectedTime}
                                        onChange={this.handleChangeTime}
                                        options={this.state.listTime}
                                    />
                                </div>
                                <div className='col-4'>
                                    <label>Ngay Kham benh</label>
                                    {/* <Select
                                        value={this.state.selecteddate}
                                        onChange={this.handleChangeDate}
                                        options={this.state.listDate}
                                    /> */}
                                    <DatePicker
                                        onChange={this.handleOnchageDatePicker}
                                        className='form-control'
                                        value={this.state.currentDate?.[0]}
                                        minDate={new Date()}
                                    />
                                </div>
                                <div className='col-12 mt-3'>
                                    <button onClick={() => this.handleSaveUser()} className='btn btn-primary'
                                    >
                                        Lưu
                                    </button>
                                </div>
                                <div className='col-12 mb-5'>
                                </div>
                            </div>
                            <div className="row doctor-workshift-content ">
                                <div className="col-12">
                                    <p><b>Lịch khám của bác sĩ</b></p>
                                    <p>Chọn bác sĩ</p>
                                    <Select
                                        value={this.state.selectedDoctor}
                                        onChange={this.handleChangeDoctorShow}
                                        options={this.state.listDoctors}
                                    />
                                    <br/>
                                    <table id="customers">
                                        <tbody>
                                            <tr >
                                                <th>Khung Gio</th>
                                                <th>Bac Si</th>
                                                <th>Ngay Kham</th>
                                                <th>Tac vu</th>
    
    
                                            </tr>
                                            {
                                                arrDoctorTime && arrDoctorTime.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{item.slotTime}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.date}</td>
                                                            <td>
                                                            <button className='btn-edit'><i className='fas fa-pencil-alt'></i></button>
                                                    <button className='btn-delete' ><i className='fas fa-trash'></i></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <HomeFooter/> */}
            </React.Fragment>
        )

    }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
        allExamination: state.admin.allExamination,
        allDay: state.admin.allDay,
        allSlotTime:state.admin.allSlotTime
    };
};
const mapDispatchToProps = dispatch => {
    return {
        createNewDoctorTime: (data) => dispatch(actions.createNewDoctorTime(data)),
        fetAllDoctorsRedux: () => dispatch(actions.fetchAllDoctor()),
        fetAllExaminationRedux: () => dispatch(actions.fetchAllExamination()),
        fetAllDayRedux: () => dispatch(actions.fetchAllDay()),
        fetAllSlotTimeRedux: () => dispatch(actions.fetchAllSlotTime()),
        saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailInfoDoctor(data)),
        fetchAllScheduleHoursRedux: () => dispatch(actions.fetchAllScheduleHours()),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageWorkshift)