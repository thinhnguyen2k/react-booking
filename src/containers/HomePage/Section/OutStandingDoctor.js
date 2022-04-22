import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router';
import { getAllDoctors } from '../../../services/userService'

class OutStandingDoctor extends Component {
    constructor(props){
        super(props)
        this.state ={
            arrDoctors: [],
            selectedDoctor:'',
            listDoctors:[],

        } 
    }

    async componentDidMount (){
        // this.props.loadTopDotors();
        await this.getAllListDoctor(); 
    }
    componentDidUpdate(prevProps,prevState,snapshot){
        // if(prevProps.topDoctorsRedux !== this.props.topDoctorsRedux){
        //     this.setState({
        //         arrDoctors: this.props.topDoctorsRedux
        //     })
        // }

    }

    getAllListDoctor = async () => {
        let response = await getAllDoctors();
        // console.log('kiem tra danh sach bac si', response)
        if (response && response.success === true) {
            this.setState({
                listDoctors: response.result
            })
        }
    } 
    handleViewDetailDoctor = (staff) =>{
        this.props.history.push(`/detail-doctor/${staff.idStaff}`) 
    } 
    handleListDoctor = () => {
        this.props.history.push(`/listdoctor`)

    }
    render() {
        // let allDoctors = this.state.arrDoctors;
        let listDoctors = this.state.listDoctors;
        
        return (
            <div  className='section-share section-outstanding-doctor'>
               <div className='section-container'>
                   <div className='section-header'>
                       <span className='title-section'>Bác sĩ nổi bậc</span>
                       <button className='btn-section' onClick={() => this.handleListDoctor()}>Xem thêm</button>
                   </div>
                   <div className='section-body'>
                        <Slider {...this.props.settings} >
                            {listDoctors && listDoctors.length > 0 
                            && listDoctors.map((item,index) =>{
                                let imageBase64 = '';

                                if(item.image){
                                    imageBase64 = new Buffer(item.image,'base64').toString('binary')
                                }
                                
                                return(
                                    <div 
                                        className='section-customize' key ={index}
                                        onClick={() =>this.handleViewDetailDoctor(item)}
                                    >
                                        <div className='customize-border'>
                                            <div className='outer-bg'>
                                            <div className='bg-image section-outstanding-doctor'
                                                style={{ backgroundImage: `url(${imageBase64})`}}
                                            />
                                            </div>
                                            <div className='position text-center'>
                                                <div style={{fontSize:'20px',color:'#4caf50'}}>{item.name}</div>
                                                <div>{item.departmentName}</div>
                                            </div>             
                                        </div>
                                    </div >         
                                )
                            })}
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
        topDoctorsRedux: state.admin.topDoctors

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetAllDoctorsRedux: () => dispatch(actions.fetchAllDoctor()),
        // loadTopDotors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));