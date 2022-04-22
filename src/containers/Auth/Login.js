import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { CRUD_ACTIONS, CommonUtils } from '../../utils';
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { createNewPatient, handleLogin,handleLoginPatient } from '../../services/userService';
import $ from 'jquery';
import { emitter } from '../../utils/emitter';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            passwordlog: '',
            isShowpass: false,
            errMessage: '',
            name:'',
            email:'',
            password:'',
            phoneNumber:'',
            address:'',
            gender:'',
            date:''

        }
    }
    componentDidMount() {
        $(document).ready(function () {
            $('.login-info-box').fadeOut();
            $('.login-show').addClass('show-log-panel');



            $('input[type="radio"]').on('change', function () {


                if ($('#log-reg-show').is(':checked')) {
                    $('.register-info-box').fadeIn();
                    $('.login-info-box').fadeOut();

                    $('.white-panel').removeClass('right-log');

                    $('.login-show').addClass('show-log-panel');
                    $('.register-show').removeClass('show-log-panel');
                }
                if ($('#log-login-show').is(':checked')) {
                    $('.register-info-box').fadeOut();
                    $('.login-info-box').fadeIn();

                    $('.white-panel').addClass('right-log');
                    $('.register-show').addClass('show-log-panel');
                    $('.login-show').removeClass('show-log-panel');

                }
            });
        });
        $(document).keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                handleLogin();
                // alert('Bạn vừa nhấn phím "enter" trên trang web');
            }
            });
        
    }
    handleOnChangeUserName = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    handleOnChangePassWord = (e) => {
        this.setState({
            passwordlog: e.target.value
        })
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLogin(this.state.username, this.state.passwordlog);
            console.log(data)
            if(data && data.message !== 'email invalid'){
                if (data && data.success !== true) {
                    this.setState({
                        errMessage: data.message
                    }) 
                }
                if (data && data.success === true && data.message ==='login success') {
                    this.props.userLoginSuccess(data.user);
                }
                if (data && data.success === true && data.message ==='password false') {
                    this.setState({
                        errMessage: data.message
                    }) 
                }
                if (data && data.success === true && data.message ==='password empty') {
                    this.setState({
                        errMessage: data.message
                    }) 
                }
            }
            if((data && data.message === 'email invalid')){
                let dataPatient = await handleLoginPatient(this.state.username, this.state.passwordlog);
                console.log(dataPatient) 
                if (dataPatient && dataPatient.success !== true) {
                    this.setState({
                        errMessage: data.message
                    })
                }
                if (dataPatient && dataPatient.success === true && dataPatient.message === 'login success') {
                    this.props.userLoginSuccess(dataPatient.user);
                    console.log(dataPatient)
                    window.location.replace('http://localhost:3000/home')
                }
                if (dataPatient && dataPatient.success === true && dataPatient.message ==='password false') {
                    this.setState({
                        errMessage: data.message
                    })
                }
                if (dataPatient && dataPatient.success === true && dataPatient.message ==='email invalid') {
                    this.setState({
                        errMessage:'Không tìm thấy thông tin tài khoản'
                    })
                }
            }
        } 
        catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log(error)
        }

    }
    handleShowPass = () => {
        this.setState({
            isShowpass: !this.state.isShowpass
        })
    }

    onChangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }
    handleregister = async (data) => {
        this.props.createNewUserPatient({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender,
            date : this.state.date,
        })
        // window.location.reload();
    }
    
    render() {
        let { password, email, name, phoneNumber, address, gender, date } = this.state;
        return (
            <div class="login-reg-panel">
                <div class="login-info-box">
                    <div className='logo'></div>
                    <h2 style={{fontSize:'22px'}}>Bạn đã có tài khoản</h2>
                    <p>Đăng nhập tại đây</p>
                    <label id="label-register" for="log-reg-show">Đăng Nhập</label>
                    <input type="radio" name="active-log-panel" id="log-reg-show" value="log-reg-show" />
                </div>
                <div class="register-info-box">
                    <div className='logo'></div>
                    <h2 style={{fontSize:'22px'}}>Bạn chưa có tài khoản</h2>
                    <p>Đăng kí tài khoản mới tại đây</p>
                    <label id="label-login" for="log-login-show">Đăng kí</label>
                    <input type="radio" name="active-log-panel" value="log-login-show" id="log-login-show" />
                </div>

                <div class="white-panel">
                    <div class="login-show">
                        <h2>Đăng nhập</h2>
                        <input
                            type='text'
                            className='form-control '
                            placeholder='enter your username'
                            value={this.state.username}
                            onChange={(e) => { this.handleOnChangeUserName(e) }}
                        />
                        <input

                            type={this.state.isShowpass ? 'text' : 'password'}
                            placeholder='enter your password'
                            onChange={(e) => { this.handleOnChangePassWord(e) }}

                        />
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <input type="button" value="Đăng Nhập"
                            // onKeyDown={() => this.onkeyEnter()}
                            onClick={() => this.handleLogin()}
                        />

                    </div>
                    <div class="register-show">
                        <h2>Đăng kí</h2>
                        <input type="text" placeholder="Email"
                            value={email}
                            onChange={(e) => { this.onChangeInput(e, 'email') }}
                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                        />
                        <input type="password" placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => { this.onChangeInput(e, 'password') }}
                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                        />
                        <input type="text" placeholder="Họ và tên"
                            value={name}
                            onChange={(e) => { this.onChangeInput(e, 'name') }}
                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                        />
                        <input type="text" placeholder="Số điện thoại"
                            value={phoneNumber}
                            onChange={(e) => { this.onChangeInput(e, 'phoneNumber') }}
                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                        />
                        <input type="text" placeholder="Địa chỉ"
                            value={address}
                            onChange={(e) => { this.onChangeInput(e, 'address') }}
                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                        />
                        <input type="text" placeholder="Giới tính"
                            value={gender}
                            onChange={(e) => { this.onChangeInput(e, 'gender') }}
                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                        />
                        <input type="text" placeholder="Ngày sinh"
                            value={date}
                            onChange={(e) => { this.onChangeInput(e, 'date') }}
                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                        />
                        <input type="button" value="Đăng kí"
                            onClick={() => this.handleregister()}
                            
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        createNewUserPatient: (data) => dispatch(actions.createNewUserPatient(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);