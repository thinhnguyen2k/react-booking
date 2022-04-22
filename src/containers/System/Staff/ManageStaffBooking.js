import React, { Component } from "react";
import { connect } from "react-redux";
import { dispatch } from "../../../redux";
import { getDetailPatient, getDetailInfoDoctor, getOneExamination, getInfoBooking } from '../../../services/userService';
import './ManageStaffBooking.scss'
import ModelUser from '../ModelUser';
import ModalEditUser from '../ModalEditUser';
import HomeFooter from "../../HomePage/Section/HomeFooter";
class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            detailPatient: {},
            slotTime: {},
            arrBooking: [],
            isOpenModalUser: false,
            infoUser:{}
        }
    }
    async componentDidMount() { 
        console.log(this.props)
        await this.getBooking();
    }
    getBooking = async () => {
        let response = await getInfoBooking();
        if (response && response.success === true) {
            this.setState({
                arrBooking: response.result
            })
        }
        // console.log('get user from node.js', response.result)
    }
    handleProcess = (user,active) =>{
        if(active === 0){
            return
        }else{
            this.setState({
                isOpenModalUser:true,
                infoUser:user
            })
        }
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    render() {
        let arrBooking = this.state.arrBooking;
        console.log(this.state.infoUser)
        return (
            <React.Fragment>
                <ModelUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    user={this.state.infoUser}
                /> 
                <div className='doctor-workshift-container'>
                    <div className="row doctor-workshift-content ">
                        <div className="col-12">
                            <p><b> Lich kham benh </b></p>
                            <table id="customers">
                                <tbody>
                                    <tr >
                                        <th>Ma ho so</th>
                                        <th>Gio Kham</th>
                                        <th>Ngay Kham</th>
                                        <th>Ten Benh Nhan</th>
                                        <th>Bac Si</th>
                                        <th>Trang thai</th> 
                                    </tr>

                                    {arrBooking && arrBooking.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{item.idBooking}</td>
                                                <td>{item.slotTime}</td> 
                                                <td>{item.date}</td>
                                                <td>{item.namePatient}</td>
                                                <td>{item.nameDoctor}</td>
                                                <td>
                                                    <button onClick={() => this.handleProcess(item,item.active)}  className='btn-edit' > {item.active === 1 ? <i className='fas fa-pencil-alt'></i> : <i class="fas fa-check"></i> }</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
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
export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule)