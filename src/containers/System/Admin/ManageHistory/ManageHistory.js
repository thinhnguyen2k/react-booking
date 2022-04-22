import React, { Component } from "react";
import { connect } from "react-redux";
import './Managehistory.scss';
import { getInfoBooking } from '../../../../services/userService'
import HomeFooter from "../../../HomePage/Section/HomeFooter";
class ManageHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            detailPatient: {},
            slotTime: {},
            arrBooking: [],
            isOpenModalUser: false,
            infoUser: {}
        }
    }
    async componentDidMount() {
        await this.getBooking();
    }
    getBooking = async () => {
        let response = await getInfoBooking();
        console.log(response)
        if (response && response.success === true) {
            this.setState({
                arrBooking: response.result
            })
        }
    }
    handleProcess = (user) => {

    }
    toggleUserModal = () => {

    }
    render() {
        let arrBooking = this.state.arrBooking;
        console.log(arrBooking)
        return (
            <React.Fragment>
                <div className='doctor-workshift-container'>
                    <div className="row doctor-workshift-content ">
                        <div className="col-12">
                            <p style={{color:'#4CAF50'}}><b> Hồ Sơ bệnh án </b></p>
                            <table id="customers">
                                <tbody>
                                    <tr >
                                        <th>Mã hồ sơ</th>
                                        <th>Bác sĩ</th>
                                        <th>Chuyên khoa</th>
                                        <th>Giờ khám bệnh</th>
                                        <th>Ngày khám bệnh</th>
                                        <th>Tên bệnh nhân</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                    {
                                        arrBooking && arrBooking.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{item.idBooking}</td>
                                                    <td>{item.nameDoctor}</td>
                                                    <td>{item.departmentName }</td>
                                                    <td>{item.slotTime}</td>
                                                    <td>{item.date}</td>
                                                    <td>{item.namePatient}</td>
                                                    <td>{item.active === 1 ? 'Đang xử lí' : 'Đã khám xong'}</td>
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
        isLoggedIn: state.user.isLoggedIn
    };
};
const mapDispatchToProps = dispatch => {
    return {

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageHistory)