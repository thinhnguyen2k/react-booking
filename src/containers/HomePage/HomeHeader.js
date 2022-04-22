import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import * as actions from "../../store/actions";
import { FormattedMessage } from 'react-intl';
import Login from '../Auth/Login';
import { withRouter } from 'react-router';
import _ from 'lodash'

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfoPatient: []
        }

    }
    handleShowLoginPage = () => {
        this.props.history.push(`/login`)
    }
    handleHome = () => {
        this.props.history.push(`/home`)

    }
    handleCategory = () => {
        this.props.history.push(`/category`)

    }
    handleShowProfile = (patient) => { 
        this.props.history.push(`/profile/${patient[0].idPatient ? patient[0].idPatient : patient[0].idPatient}`) 
    }
    handleListDoctor = () => {
        this.props.history.push(`/listdoctor`)

    }
    componentDidMount() {
        let {userInfo} = this.props;
        let user = [];
        if(userInfo && !_.isEmpty(userInfo)){

        }
        this.setState({
            userInfoPatient: user
        })
    }
    render() {       
        // console.log(this.props)
        const { processLogout, userInfo } = this.props;
        let infoPatient = userInfo?.[0]?.name;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            {/* <i className='fas fa-bars'></i> */}
                            <div onClick={() => this.handleHome()} className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div onClick={() => this.handleCategory()} className='child-content'>
                                <div><b>CHUYÊN KHOA</b></div>
                                <div className='sub-title'>TÌm chuyên khoa khám bệnh</div>
                            </div>
                            <div className='child-content'>
                                <div><b>DỊCH VỤ</b></div>
                                <div className='sub-title'>Chọn gói khám bệnh</div>
                            </div>
                            <div onClick={() => this.handleListDoctor()} className='child-content'>
                                <div><b>BÁC SĨ</b></div>
                                <div className='sub-title'>Chọn bác sĩ giỏi</div> 
                            </div>
                        </div>
                        <div onClick={infoPatient ? () => this.handleShowProfile(userInfo) : () => this.handleShowLoginPage()} className='right-content'>
                            {infoPatient ?
                                <div className='show-infor'>
                                    {infoPatient}
                                </div> :
                                <button
                                    className='btn-login'
                                    onClick={() => { this.handleShowLoginPage() }}
                                >ĐĂNG NHẬP
                                </button>
                            }
                            <div className={ infoPatient ? 'btn btn-logout btn-logout-patient' : 'btnoverlow'}
                            >
                                <i class="fas fa-user"></i>
                                <ul className='testshow'>
                                    <li onClick={() => this.handleShowProfile(userInfo)}>Trang cá nhân</li>
                                    <li onClick={processLogout} >Đăng xuất</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'>NỀN TẢNG Y TẾ</div>
                            <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                            <div className='search'>
                                <i className='fas fa-search'></i>
                                <input type='text' placeholder='Tìm kiếm bác sĩ' />
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div onClick={() => this.handleCategory()} className='option-child'>
                                    <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                    <div className='text-child'>Khám chuyên khoa</div>
                                </div>
                                <div onClick={() => this.handleCategory()} className='option-child'>
                                    <div className='icon-child'><i className='far fa-hospital'></i></div>
                                    <div className='text-child'>Khám tổng quát</div>
                                </div>
                                <div onClick={() => this.handleCategory()} className='option-child'>
                                    <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                    <div className='text-child'>Xét nghiệm y học</div>
                                </div>
                                <div onClick={() => this.handleCategory()} className='option-child'>
                                    <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                    <div className='text-child'>Phẩu thuật chỉnh hình</div>
                                </div>
                                {/* <div onClick={() => this.handleCategory()} className='option-child'>
                                    <div className='icon-child'><i className="fas fa-address-card"></i></div>
                                    <div className='text-child'>Tư vấn trực tiếp</div>
                                </div>
                                <div onClick={() => this.handleCategory()} className='option-child'>
                                    <div className='icon-child'><i className='far fa-hospital'></i></div>
                                    <div className='text-child'>Cơ sở hạ tầng</div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };

};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));