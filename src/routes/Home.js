import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {
    
    render() {
        const { isLoggedIn } = this.props;
        console.log('kiem tra login',this.props)
        let linkToRedirect = isLoggedIn ? '/system/dashboard' : '/home';

        return (
            <Redirect to={linkToRedirect} />
        );
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
