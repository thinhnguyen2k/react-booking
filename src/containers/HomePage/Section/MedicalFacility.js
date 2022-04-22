import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import  './MedicalFacility.scss';
import Slider from 'react-slick';

class MedicalFacility extends Component {

    render() {
        return (
            <div className='section-share section-medical-facilty'>
               <div className='section-container'>
                   <div className='section-header'>
                       <span className='title-section'>Co So Y Te noi bat</span>
                       <button className='btn-section'>Xem Them</button>
                   </div>
                   <div className='section-body'>
                        <Slider {...this.props.settings} >
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facilty'/>
                                <div>Tieu Hoa</div>
                            </div >
                            <div className='section-customize'>
                                 <div className='bg-image section-medical-facilty'/>
                                <div>Tieu Hoa1</div>
                            </div >
                            <div className='section-customize'>
                                 <div className='bg-image section-medical-facilty'/>
                                <div>Tieu Hoa2</div>
                            </div >
                            <div className='section-customize'>
                                 <div className='bg-image section-medical-facilty'/>
                                <div>Tieu Hoa3</div>
                            </div >
                            <div className='section-customize'>
                                 <div className='bg-image section-medical-facilty'/>
                                <div>Tieu Hoa4</div>
                            </div >
                            <div className='section-customize'>
                                 <div className='bg-image section-medical-facilty'/>
                                <div>Tieu Hoa4</div>
                            </div >
                        </Slider>
                   </div>
               </div>
           </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
