import React, { Component } from "react";
import { connect } from "react-redux";
import { dispatch } from "../../../../redux";
import * as actions from '../../../../store/actions';
import { CRUD_ACTIONS,CommonUtils } from '../../../../utils';
import DatePicker from "../../../../components/Input/DatePicker";
import { getAllExamination } from '../../../../services/userService'
import HomeFooter from "../../../HomePage/Section/HomeFooter";
import './ManageTime.scss'
class ManageTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
          slotTime:'',
          date:'',
          currentDate: '',
          arrExamanition:[]
        }
    }
    async componentDidMount() {
        await this.getAllExamination();
    }
    componentDidUpdate(preProps, preState, snapshot) {
       
    }
    handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log('check img',base64)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImg: objectUrl,
                avatar: base64
            })
        }
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
            this.props.createNewExamination({
                slotTime: this.state.slotTime,
                // currentDate: this.state.currentDate,
            })
            console.log('kiem tra trang thai',this.state)
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['slotTime']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('nhap day du thong tin')
                break
            }
        }
        return isValid
    }

    onChangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }
    handleEditUserFromParent = (user) =>{
        let imageBase64 = '';
        if(user.image){
            imageBase64 = new Buffer(user.image,'base64').toString('binary');
        }
        this.setState({
            password: 'hashcode',
            name: user.name,
            price: user.price,
            desc: user.desc,
            avatar:'' ,
            previewImg:imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id

        })
    }

    handleOnchageDatePicker = (date) =>{
        this.setState({
            currentDate: date[0]
        })
    }


    getAllExamination = async () => {
        let response = await getAllExamination();
        console.log('kiem tra',response)
        if (response && response.success === true) {
            this.setState({
                arrExamanition: response.result
            })


        }
        // console.log('get user from node.js', response.result)
    }
    render() {
        let { slotTime,date } = this.state
        let arrExamanition = this.state.arrExamanition
        console.log(typeof(this.state.currentDate))
        return (
            <div className='user-redux-container'>
                <div className="title" > 
                    THÊM MỚI GiỜ KHÁM BỆNH
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <label>Giờ khám bệnh</label>
                                <input className='form-control' type='text'
                                    value={slotTime}
                                    onChange={(e) => { this.onChangeInput(e, 'slotTime') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div> 
                            {/* <div className='col-6'>
                                <label>Ngày khám bệnh</label>
                                <DatePicker
                                    onChange={this.handleOnchageDatePicker}
                                    className='form-control'
                                    value={this.state.currentDate?.[0]}
                                    minDate={new Date()}
                                />
                            </div>                   */}
                            <div className='col-12 mt-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ? 'Save Change' : 'LƯU THÔNG TIN'}
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                
                            </div>
                        </div>
                        <div className="row doctor-workshift-content ">
                        <div className="col-12">
                            <p><b>Các khung giờ khám bệnh</b></p>
                            <table id="customers">
                                <tbody>
                                    <tr >
                                        <th>Mã</th>
                                        <th>Khung giờ</th>
                                        {/* <th>Ngày khám</th> */}
                                        {/* <th>Tac vu</th> */}
                                    </tr>
                                    {
                                            arrExamanition && arrExamanition.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.idTime}</td>
                                                        <td>{item.slotTime}</td>
                                                        {/* <td>{item.currentDate}</td> */}
                                                        
{/* 
                                                        <td>
                                                            <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className='fas fa-pencil-alt'></i></button>
                                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className='fas fa-trash'></i></button>
                                                        </td> */}
                                                    </tr>
                                                )
                                            })
                                        }
                                </tbody>
                            </table>
                            <br/>
                        </div>
                    </div>
                    </div>
                </div>
                <HomeFooter/>
            </div>
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
        createNewExamination: (data) => dispatch(actions.createNewExaminationHour(data)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageTime)