import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './Profile.scss'
import HomeFooter from '../../HomePage/Section/HomeFooter';
import { getDetailPatient, getInfoBookingOnePatient, getHistoryBookingOnePatient } from '../../../services/userService'
import { compareAsc, format } from 'date-fns'
class Booking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailPatient: {},
            arrBooking: [],
            arrHistory: [],
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.idPatient) {
            let id = this.props.match.params.idPatient;
            let res = await getDetailPatient(id);
            console.log(res)
            if (res && res.success === true) {
                this.setState({
                    detailPatient: res.result[0]
                })
            }
            console.log(res.result[0])
        }
        await this.getBooking();
        await this.getHistoryBooking();
    }
    getBooking = async () => {
        let response = await getInfoBookingOnePatient(this.props.match.params.idPatient);
        console.log(response)
        if (response && response.success === true) {
            this.setState({
                arrBooking: response.result
            })
        }
    }
    getHistoryBooking = async () => {
        let res = await getHistoryBookingOnePatient(this.props.match.params.idPatient)
        if (res && res.success === true) {
            console.log(res)
            this.setState({
                arrHistory: res.result
            })
        }
    }
    render() {
        let detailPatient = this.state.detailPatient;
        let arrBooking = this.state.arrBooking
        let arrHistory = this.state.arrHistory
        console.log(this.state.arrHistory)
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className='booking-container'>
                    <div className='row booking-intro'>
                        <span className='booking-intro-item'>
                            TH??NG TIN C?? NH??N
                        </span>
                        <div className='border'></div>
                    </div>
                    <div className='row'>
                        <div className='col-5 patient-container'>
                            <div className='patient-container-header'>
                                <b>S?? Y???U L?? L???CH</b>
                            </div>
                            <div className='row patient-container-booking'>
                                <div className='patient-container-booking-info'>
                                    <p><b>T??n b???nh nh??n</b>: {detailPatient.name}</p>
                                    <p><b>Email</b>: {detailPatient.email}</p>
                                    <p><b>Gi???i t??nh</b>: {detailPatient.gender}</p>
                                    <p><b>S??? ??i???n Tho???i</b>: {detailPatient.phoneNumber}</p>
                                    <p><b>Ng??y sinh</b>: {detailPatient.date}</p>
                                    <p><b>?????a ch???</b>:{detailPatient.address}</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-7 patient-container-header'>
                            <b>H??? S?? B???NH ??N</b>
                            <div className='row patient-container-information'>
                                <p>L???ch kh??m b???nh</p>
                                <table class="table table-striped patient-container-information-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Ng??y kh??m</th>
                                            <th scope="col">Gi???</th>
                                            <th scope="col">B??c s?? ph??? tr??ch</th>
                                            <th scope="col">Tr???ng th??i</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {arrBooking && arrBooking.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{format(new Date(item.date), 'dd-MM-yyyy')}</td>
                                                    <td>{item.slotTime}</td>
                                                    <td>{item.nameDoctor}</td>
                                                    <td>{item.active === 1 ? '??ang ch??? x??? l??' : '???? x??? l??'}</td>
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
                                            {/* <th scope="col">M?? t???</th> */}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {arrHistory && arrHistory.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{item.nameDoctor}</td>
                                                    <td>{item.slotTime}</td>
                                                    <td>{format(new Date(item.date), 'dd-MM-yyyy')}</td>
                                                    {/* <td>{item.active}</td> */}
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);