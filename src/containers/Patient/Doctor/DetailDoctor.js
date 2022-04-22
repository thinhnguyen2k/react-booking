import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import * as actions from '../../../store/actions';
import { getDetailInfoDoctor } from '../../../services/userService'
import HomeFooter from '../../HomePage/Section/HomeFooter';
import Booking from '../Booking/Booking';
import { getAllExamination, getOneDoctorTime,getAllDayDoctor,getAllTimeInDayDoctor } from '../../../services/userService'
import { withRouter } from 'react-router';
import Select from 'react-select';
import { compareAsc, format } from 'date-fns'
class DetailDoctor extends Component {

    constructor(props) { 
        super(props);
        this.state = {
            id: '',
            selecteDay:'',
            detailDoctor: {},
            listTimeOfDoctor: [],
            listAllDayDoctor:[]
        }
    }
    handleShow = async (patient,id,idTime,date,status) => {
        if(status === 0){
            return
        }
        if(status === 1){
            await this.props.history.push(`/booking/${patient[0].idPatient ? patient[0].idPatient : patient[0].idPatient}/${id}/${idTime}/${date}`)
        }

    }
    handleShowLoginPage = () => {
        this.props.history.push(`/login`)
    }
    async componentDidMount() {
        this.props.fetAllDayDoctorRedux(this.props.match.params.id);
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInfoDoctor(id);
            if (res && res.success === true) {
                this.setState({
                    detailDoctor: res.result[0]
                })
            }
            let resOneDoctorTime = await getOneDoctorTime(id);
            if (resOneDoctorTime && resOneDoctorTime.success === true) {
                this.setState({
                    listTimeOfDoctor: resOneDoctorTime.result,
                    id: resOneDoctorTime.result[0]?.idStaff
                })
            }
        } 
        console.log(this.props)
    }
    buildDataInputAllDayDoctor = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                // object.label = `${format(new Date(item.date), 'yyyy-MM-dd')}`;
                object.label = `${format(new Date(item.day), 'yyyy-MM-dd')}`;

                result.push(object)

            })
        }
        return result
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDayDoctors !== this.props.allDayDoctors) {
            let dataSelectDate = this.buildDataInputAllDayDoctor(this.props.allDayDoctors)
            this.setState({
                listAllDayDoctor: dataSelectDate
            })
            console.log(dataSelectDate);
        }
    }
    handleDay = async (selecteDay) =>{
        this.setState({
            selecteDay
        })
        console.log(selecteDay.label)
        let response = await getAllTimeInDayDoctor(this.props.match.params.id,selecteDay.label);
        console.log(response)
        if (response && response.success === true) {
            this.setState({
                listTimeOfDoctor:response.result
            })
        }
    }
    render() {
        let { detailDoctor, listTimeOfDoctor,listAllDayDoctor } = this.state;
        let userInfo = this.props.userInfo;
        console.log(listTimeOfDoctor)
        let id = this.state.id
        let imageBase64 = '';
        if (detailDoctor.image) {
            imageBase64 = new Buffer(detailDoctor.image, 'base64').toString('binary')
        }
        console.log(listTimeOfDoctor)
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className='doctor-detail-container'>
                    {detailDoctor && detailDoctor && detailDoctor.contentHTML
                        &&
                        <div className='intro-doctor'>
                            <div
                                className='content-left'
                                style={{ backgroundImage: `url(${imageBase64})` }}
                            >
                            </div>
                            <div className='content-right'>
                                <div className='up'>
                                    {detailDoctor.name}
                                </div>
                                <div className='down'>
                                    {
                                        <span>
                                            {detailDoctor.description}
                                        </span>
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    <div className='schedule-doctor'>
                    </div>
                    <div className='row'>
                        <div className=' col-6 '>
                            <div className='detail-infor-doctor'>
                                {detailDoctor && detailDoctor && detailDoctor.contentHTML
                                    &&
                                    <div dangerouslySetInnerHTML={{ __html: detailDoctor.contentHTML }}>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='col-6 detail-info-celendar'>
                            <div className='detail-infor-day'>
                                <p>Chọn ngày khám bệnh</p>
                                <Select
                                    value={this.state.selecteDay}
                                    onChange={this.handleDay}
                                    options={this.state.listAllDayDoctor}
                                />
                            </div>
                            <br/>
                            <div className='row specialty-content-item-celender-content'>
                                <p>Chọn giờ khám bệnh</p>
                                {
                                    listTimeOfDoctor && listTimeOfDoctor.map((item, index) => {
                                        return (
                                            <div className='col-3' onClick={ userInfo ?   () => this.handleShow(userInfo, id,item.idTime,item.date,item.active) : () => this.handleShowLoginPage()}>
                                                <div  className={ item.active === 1 ? 'specialty-content-item-celender-content' : 'specialty-content-item-celender-content-disable'}>
                                                    <p>{item.slotTime}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='detail-info-address'>
                                <span> ĐỊA CHỈ PHÒNG KHÁM </span>
                                <p>Trường DHCT, 3/2 phường Xuân Khánh,quận Ninh Kiều, Thành phố Cần Thơ</p>
                                <p>Email: medicalbooking@gmail.com</p>
                                <p>SDT:038943476344</p>

                            </div>
                            <div className='detail-info-price'>
                                <span>GIÁ KHÁM BỆNH:</span>
                                <p>{detailDoctor.price} VND</p>
                            </div>
                        </div>
                    </div>
                </div>
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        allDayDoctors: state.admin.allDayDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetAllDayDoctorRedux: (id) => dispatch(actions.fetchAllDayDoctor(id)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailDoctor));