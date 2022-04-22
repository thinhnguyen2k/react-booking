import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import ManagaDoctor from '../containers/System/Admin/ManagaDoctor';
import ManageWorkshift from '../containers/System/Admin/ManageWorkShif/ManageWorkshift';
import ManageSpecialty from '../containers/System/Admin/ManageSpecialty/ManageSpecialty';
import ManageTime from '../containers/System/Admin/ManageTime/ManageTime';
import Dashboard from '../containers/System/Dashboard/Dashboard';
import ManageHistory from '../containers/System/Admin/ManageHistory/ManageHistory';
class System extends Component { 
    render() {
        const { systemMenuPath,isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />} 
                <div className="system-container"> 
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/dashboard" component={Dashboard} />
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/manage-doctor" component={ManagaDoctor} />
                            <Route path="/system/manage-workshift" component={ManageWorkshift} />
                            <Route path="/system/manage-specialty" component={ManageSpecialty} />
                            <Route path="/system/manage-time" component={ManageTime} />]
                            <Route path="/system/manage-history" component={ManageHistory}/>
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
