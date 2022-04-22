import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ROLE } from '../../utils';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, DoctorMenu,StaffMenu } from './menuApp';
import HomeHeader from '../../containers/HomePage/HomeHeader'
import './Header.scss';
import _ from 'lodash'
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }

    }
    componentDidMount(){
        let {userInfo} = this.props;
        let menu = [];
        console.log(userInfo)
        if(userInfo && !_.isEmpty(userInfo)){
            let role = userInfo[0].idRole;
            // console.log('check role',userInfo)
            if(role === USER_ROLE.ADMIN){
                menu = adminMenu
            } 
            if(role === USER_ROLE.DOCTOR){
                menu = DoctorMenu;
            }
            if(role === USER_ROLE.STAFF){
                menu = StaffMenu;
            }
        }
        this.setState({
            menuApp : menu
        })
    }
    render() {
        const { processLogout, userInfo } = this.props;
        // console.log('check',userInfo[0].name)
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                {/* nút logout */}
                <div className='account'>
                    <span className='welcom'>
                        {userInfo && userInfo[0].name ? userInfo[0].name : ''}
                    </span>
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>

                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
