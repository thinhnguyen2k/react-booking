import * as actions from '../../store/actions';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { getInfoBooking,SendEmailConfirm } from '../../services/userService';
import { emitter } from '../../utils/emitter';
import PDF from "./Staff/PDF/PDF"
class ModelUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            detailDoctor: {},
            detailPatient: {},
            slotTime: {},
            arrBooking: [],
            isOpenPDF: false,
            userInfo:{}
        }
        // this.listenEmitter();
    }
    // listenEmitter(){
    //     emitter.on('EVENT_CLEAR_MODAL_DATA',() =>{
    //         this.setState({
    //             email:'',
    //             password:'',
    //             firstName:'',
    //             lastName:'',
    //             address:''
    //         })
    //     })
    // }

    async componentDidMount() {
        console.log(this.props)
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    toggleUserModal = () => {
        this.setState({
            isOpenPDF: !this.state.isOpenPDF,
        })
    }
    handleAddNewUSer = (user) => { 
        this.setState({
            isOpenPDF:true,
            userInfo:user
        })
        this.props.createHistory(
            {
                idBooking: this.props.user.idBooking, 
                slotTime: this.props.user.idBooking,
                nameDoctor: this.props.user.nameDoctor,
                date: this.props.user.date,
                namePatient: this.props.user.namePatient
            }
        )
        console.log(this.props.user);
        SendEmailConfirm(this.props.user.email,this.props.user.idBooking);
    }
    render() { 
        let infoUser = this.props.user
        console.log(this.props)
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => { this.toggle() }}
                    className={'abcclassName'}
                    size='md'
                    centered
                >
                    <ModalHeader toggle={() => { this.toggle() }}> XÁC NHÂN THÔNG TIN ĐẶT LỊCH </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label for="inputEmail4"><b>Mã hồ sơ</b> :{infoUser.idBooking}</label>
                                    <label for="inputEmail4"></label>
                                </div>
                                <div className="form-group col-md-12">
                                    <label for="inputPassword4"><b>Ngày khám bệnh</b> :{infoUser.date}</label>
                                </div>
                                <div className="form-group col-md-12">
                                    <label for="inputEmail4"><b>Giờ khám bệnh</b> :{infoUser.slotTime}</label>
                                </div>
                                <div className="form-group col-md-12">
                                    <label for="inputPassword4"><b>Bác sĩ phụ trách</b> :{infoUser.nameDoctor}</label>
                                </div>
                                <div className="form-group">
                                    <label for="inputAddress"><b>Bệnh nhân</b> :{infoUser.namePatient}</label>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' className='px-3' onClick={() => { this.handleAddNewUSer(infoUser) }}>DUYỆT</Button>
                        <Button color='secondary' className='px-3' onClick={() => { this.toggle() }}>HỦY</Button>
                    </ModalFooter>
                    <br />
                </Modal>
                <PDF
                    isOpen={this.state.isOpenPDF}
                    user={this.state.userInfo}
                    toggleFromParent={this.toggleUserModal}
                />
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createHistory: (data) => dispatch(actions.createNewHistory(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelUser);