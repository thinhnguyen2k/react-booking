import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from 'react-slick';
import sectionImg from "../../../assets/specialty/tieuhoa.jpg"
import { withRouter } from 'react-router';
import { getAllSpecialist } from '../../../services/userService'
class section extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            detailDoctor: {},
            arrSpecialty: [],
        }
    }
    handleShow = (specialist) => {
        this.props.history.push(`/specialty/${specialist.idSpecialist}`)

    } 
    async componentDidMount() {
        await this.getAllSpecialist();
    }
    getAllSpecialist = async () => {
        let response = await getAllSpecialist();
        // console.log('kiem tra', response)
        if (response && response.success === true) {
            this.setState({
                arrSpecialty: response.result
            })


        }
    }
    handleCategory = () => {
        this.props.history.push(`/category`)

    }
    render() {
        let arrSpecialty = this.state.arrSpecialty
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section' onClick={() => this.handleCategory()}>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings} >
                            {
                                arrSpecialty && arrSpecialty.map((item, index) => {
                                    let imageBase64 = '';
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    return (
                                        <div className='section-customize' onClick={() => this.handleShow(item)}>
                                            <div className='bg-image section-specialty'
                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                            />
                                            <div className='specialty-title-popular'>{item.departmentName}</div>
                                        </div >
                                    )
                                })
                            }






                            {/* <div className='section-customize' onClick={() => this.handleShow()}>
                                 <div className='bg-image section-specialty'/>
                                <div className='specialty-title-popular'>Tim mạch</div> 
                            </div >
                            <div className='section-customize' onClick={() => this.handleShow()}>
                                 <div className='bg-image section-specialty'/>
                                <div className='specialty-title-popular'>Thần kinh</div>
                            </div >
                            <div className='section-customize' onClick={() => this.handleShow()}>
                                 <div className='bg-image section-specialty'/>
                                <div className='specialty-title-popular'>Nội tổng hợp</div>
                            </div >
                            <div className='section-customize' onClick={() => this.handleShow()}>
                                <div className='bg-image section-specialty'/>
                                <div className='specialty-title-popular'>Xương khớp</div>
                            </div >
                            <div className='section-customize' onClick={() => this.handleShow()}>
                                 <div className='bg-image section-specialty'/>
                                <div className='specialty-title-popular'>Vật lí trị liệu</div>
                            </div > */}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(section));
