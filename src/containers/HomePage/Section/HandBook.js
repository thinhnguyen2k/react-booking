import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from 'react-slick';
class HandBook extends Component {
    render() {
        return (
           <div className='section-share section-handbook'>
               <div className='section-container'>
                   <div className='section-header'>
                       <span className='title-section'>Cam Nang</span>
                       <button className='btn-section'>Xem Them</button>
                   </div>
                   <div className='section-body'>
                        <Slider {...this.props.settings} >
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'/>
                                <div>Tieu Hoa</div>
                            </div >
                            <div className='section-customize'>
                                 <div className='bg-image section-handbook'/>
                                <div>Tieu Hoa1</div>
                            </div >
                            <div className='section-customize'>
                                 <div className='bg-image section-handbook'/>
                                <div>Tieu Hoa2</div>
                            </div >
                            <div className='section-customize'>
                                 <div className='bg-image section-handbook'/>
                                <div>Tieu Hoa3</div>
                            </div >
                            <div className='section-customize'>
                                 <div className='bg-image section-handbook'/>
                                <div>Tieu Hoa4</div>
                            </div >
                            <div className='section-customize'>
                                 <div className='bg-image section-handbook'/>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
    
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
