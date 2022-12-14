import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import {
    getDetailPatient,
    getDetailInfoDoctor,
    getOneExamination,
    getInfoBooking,
    getInfoBookingOnePatient,
    getHistoryBookingOnePatient,
    getInfoPayment,
    SendEmailConfirm,
    ProcessPayment
} from '../../../services/userService';
import * as actions from '../../../store/actions';
import { CRUD_ACTIONS, CommonUtils } from '../../../utils';
import './Booking.scss'
import HomeFooter from '../../HomePage/Section/HomeFooter';
import Select from 'react-select';
import { compareAsc, format } from 'date-fns'
import { result } from 'lodash';
var Buffer = require('buffer/').Buffer
class Booking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            detailPatient: {},
            slotTime: {},
            arrBooking: [],
            arrHistoryBooking: [],
            listPayment: [],
        }
    }

    async componentDidMount() {
        // console.log(this.props)
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailPatient(id);
            if (res && res.success === true) {
                this.setState({
                    detailPatient: res.result[0]
                })
            }
            if (this.props.match && this.props.match.params && this.props.match.params.idDoctor) {
                let idDoctor = this.props.match.params.idDoctor;
                let resDetailDoctor = await getDetailInfoDoctor(idDoctor);
                if (resDetailDoctor && resDetailDoctor.success === true) {
                    this.setState({
                        detailDoctor: resDetailDoctor.result[0]
                    })
                }
            }
            if (this.props.match && this.props.match.params && this.props.match.params.idTime) {
                let idTime = this.props.match.params.idTime;
                let resSlotTime = await getOneExamination(idTime);
                // console.log(resSlotTime)
                if (resSlotTime && resSlotTime.success === true) {
                    this.setState({
                        slotTime: resSlotTime.result[0]
                    })
                }
            }
        }
        await this.getBooking();
        await this.getHistoryBooking();
        this.props.fetAllPaymentRedux();

    }
    getBooking = async () => {
        let response = await getInfoBookingOnePatient(this.props.match.params.id);
        // console.log(response)
        if (response && response.success === true) {
            this.setState({
                arrBooking: response.result
            })
        }
    }
    buildDataInputSelectPayment = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.label = `${item.methodName}`
                object.value = item.idPayment;
                result.push(object)

            })
        }
        return result
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allPayment !== this.props.allPayment) {
            let dataSelectPayment = this.buildDataInputSelectPayment(this.props.allPayment)
            this.setState({
                listPayment: dataSelectPayment
            })
        }
    }
    getHistoryBooking = async () => {
        let response = await getHistoryBookingOnePatient(this.props.match.params.id);
        console.log(response)
        if (response && response.success === true) {
            this.setState({
                arrHistoryBooking: response.result
            })
        }
    }
    handlebooking = () => {
        let temp = this.state.arrHistoryBooking.length - 1
        // if(this.state.selectedPayment.value === 1){
        //     this.props.createNewBooking({
        //         idTime: this.props.match.params.idTime,
        //         idStaff: this.props.match.params.idDoctor,
        //         idPatient: this.props.match.params.id,
        //         idSpecialist: this.state.detailDoctor.idSpecialist,
        //         date: this.props.match.params.date,
        //         idPayment: this.state.selectedPayment.value
        //     },window.location.replace('http://localhost:8888/order/create_payment_url'))
        //     // window.location.replace('http://localhost:8888/order/create_payment_url')
        //     SendEmailConfirm(this.state.detailPatient.email,this.state.arrHistoryBooking[temp].idBooking)

        // }
        // else{
        //     this.props.createNewBooking({
        //         idTime: this.props.match.params.idTime,
        //         idStaff: this.props.match.params.idDoctor,
        //         idPatient: this.props.match.params.id,
        //         idSpecialist: this.state.detailDoctor.idSpecialist,
        //         date: this.props.match.params.date,
        //         idPayment: this.state.selectedPayment.value
        //     })
        // }
        this.props.createNewBooking({
            idTime: this.props.match.params.idTime,
            idStaff: this.props.match.params.idDoctor,
            idPatient: this.props.match.params.id,
            idSpecialist: this.state.detailDoctor.idSpecialist,
            date: this.props.match.params.date,
            idPayment: 1
        })
        console.log(this.state.detailDoctor.idSpecialist)
    }
    handleChangePayment = async (selectedPayment) => {
        this.setState({
            selectedPayment
        })
    }

handleHome = () => {
    this.props.history.push(`/home`)
}


render() {
    let detailPatient = this.state.detailPatient;
    let detailDoctor = this.state.detailDoctor;
    let slotTime = this.state.slotTime.slotTime;
    let arrBooking = this.state.arrBooking;
    let arrHistoryBooking = this.state.arrHistoryBooking;
    let imageBase64 = '';
    console.log(detailDoctor)
    if (detailDoctor.image) {
        imageBase64 = new Buffer(detailDoctor.image, 'base64').toString('binary')
    }
    return (
        <>
            <HomeHeader
                isShowBanner={false}
            />
            <div className='booking-container'>
                <div className='row booking-intro'>
                    <span className='booking-intro-item'>
                        X??c nh???n th??ng tin ?????t l???ch
                    </span>
                    <div className='border'></div>
                </div>
                <div className='row'>
                    <div className='col-3 booking-left-overlay'>
                        <div className='booking-info-doctor'>
                            <div className='booking-info-doctor-avt'
                                style={{ backgroundImage: `url(${imageBase64})` }}
                            ></div>
                            <div className='booking-info-doctor-desc'>
                                <div className='booking-info-doctor-desc-name'>
                                    <span>BS.{detailDoctor.name}</span>
                                    <p>Chuy??n {detailDoctor.departmentName}</p>
                                </div>
                            </div>
                        </div>
                        <div className='booking-info-booking'>
                            <div className='booking-info-booking-time'>
                                <p>{format(new Date(this.props.match.params.date), 'dd-MM-yyyy')}</p>
                                <span>{slotTime}</span>
                            </div>
                            <div className='booking-info-booking-price'>
                                <span>{detailDoctor.price} VND</span>
                            </div>
                        </div>
                        <div className='booking-info-payment'>
                                <span>Ch???n ph????ng th???c thanh to??n</span>
                                <Select
                                    value={this.state.selectedPayment}
                                    onChange={this.handleChangePayment}
                                    options={this.state.listPayment}
                                />
                               
                            </div>
                            
                        <br />
                        <div className='booking-info-booking-btn'>
                            <button className='btnsucces'
                                onClick={() => this.handlebooking()}
                            > ?????t l???ch
                            </button>
                            <button className='btncancel'
                                onClick={() => this.handleHome()}
                            > H???y </button>
                        </div>
                    </div>
                    <div className='col-9 patient-container'>
                        <div className='patient-container-header'>
                            <b>TH??NG TIN KH??M B???NH</b>
                        </div>
                        <div className='row patient-container-booking'>
                            <div className='col-7 patient-container-booking-info'>
                                <p><b>T??n b???nh nh??n</b>: {detailPatient.name}</p>
                                <p><b>Email</b>: {detailPatient.email}</p>
                                <p><b>Gi???i t??nh</b>: {detailPatient.gender}</p>
                                <p><b>?????a ch???</b>: {detailPatient.address}</p>
                                <p><b>Kh??m b???nh</b>: Kh??m th???n kinh</p>
                                <p><b>Ng??y kh??m b???nh</b>: {format(new Date(this.props.match.params.date), 'dd-MM-yyyy')}</p>
                                <p><b>?????a ch??? kh??m b??nh</b>: 3-2, Xu??n Kh??nh, Ninh Ki???u, C???n Th??, Vi???t Nam</p>
                                <p><b>Ghi ch??</b>: Qu?? b???nh nh??n ?????n kh??m theo gi??? tr??n l???ch ???? ????ng k?? s??? c?? nh??n vi??n t?? v???n h??? tr???</p>
                            </div>
                            <div className='col-5 patient-container-booking-img'>

                            </div>
                        </div>
                        <div className='patient-container-header'><b>H??? S?? B???NH ??N</b></div>
                        <div className='row patient-container-information'>
                            <p>L???ch kh??m b???nh</p>
                            <table class="table table-striped patient-container-information-table">
                                <thead>
                                    <tr>
                                        <th scope="col">Ng??y kh??m</th>
                                        <th scope="col">Gi??? kh??m</th>
                                        <th scope="col">B??c s??</th>
                                        <th scope="col">Tr???ng th??i</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {arrBooking && arrBooking.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{item.date}</td>
                                                <td>{item.slotTime}</td>
                                                <td>{item.nameDoctor}</td>
                                                <td>{item.active === 1 ? '??ang ch??? x??c nh???n' : '???? x??c nh???n'}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className='row patient-container-information'>
                            <p>L???ch s??? kh??m b???nh</p>
                            <table class="table table-striped patient-container-information-table">
                                <thead>
                                    <tr>
                                        <th scope="col">B??c s?? ph??? tr??ch</th>
                                        <th scope="col">Gi??? kh??m b???nh</th>
                                        <th scope="col">Ng??y kh??m b???nh</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {arrHistoryBooking && arrHistoryBooking.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{item.nameDoctor}</td>
                                                <td>{item.slotTime}</td>
                                                <td>{item.date}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
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
        allPayment: state.admin.allPayment
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewBooking: (data) => dispatch(actions.createNewBooking(data)),
        fetAllPaymentRedux: () => dispatch(actions.fetchAllPayment()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);