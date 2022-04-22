import React,{Component} from "react";
import { connect } from "react-redux";
import { Redirect,Route,Switch } from "react-router-dom";
import Header from "../containers/Header/Header";
import ManageStaffBooking from "../containers/System/Staff/ManageStaffBooking";
class Doctor extends Component{
    render(){
        const {isLoggedIn} = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header/>}
                <div className="system-container"> 
                    <div className="system-list">
                        <Switch>
                            <Route path="/staff/manage-staff-booking" component={ManageStaffBooking}/>
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state =>{
    return {
        isLoggedIn: state.user.isLoggedIn,
        systeMenuPath: state.app.systeMenuPath
    };
};
const mapDispatchToProps = dispatch =>{
    return{

    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Doctor)