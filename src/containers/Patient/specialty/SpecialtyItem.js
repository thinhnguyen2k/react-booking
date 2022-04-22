import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './SpecialtyItem.scss'
import HomeFooter from '../../HomePage/Section/HomeFooter';
import { getAllSpecialist, getAllDoctorofSpecialty, getDetailSpecialist } from '../../../services/userService';
import { withRouter } from 'react-router';
import { times } from 'lodash';

class CategorySelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listAllDoctorofSpecialty: [],
            listSpecialty: [],
            detailSpecialty: {}
        }
    }
    handlShowdetail = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.idStaff}`)
    }
    async componentDidMount() {
        await this.getAllListDoctorOfSpecialty();
        if (this.props.match && this.props.match.params && this.props.match.params.idSpecilist) {
            let id = this.props.match.params.idSpecilist;
            let res = await getAllDoctorofSpecialty(id);
            if (res && res.success === true) {
                this.setState({
                    listAllDoctorofSpecialty: res.result
                })
            }
            let resSpecialty = await getDetailSpecialist(id);
            if (res && res.success === true) {
                this.setState({
                    detailSpecialty: resSpecialty.result[0]
                })
            }
        }
    }
    getAllListDoctorOfSpecialty = async () => {
        let response = await getAllSpecialist();
        if (response && response.success === true) {
            this.setState({
                listSpecialty: response.result
            })


        }
    }

    render() {
        console.log(this.state.listAllDoctorofSpecialty)
        let listAllDoctorofSpecialty = this.state.listAllDoctorofSpecialty;
        let detailSpecialty = this.state.detailSpecialty
        console.log(detailSpecialty)
        let imageBase64 = '';
        if (detailSpecialty.image) {
            imageBase64 = new Buffer(detailSpecialty.image, 'base64').toString('binary')
        }
        return ( 
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className='specialty-container'>
                    <div className='specialty-banner'
                        style={{ backgroundImage: `url(${imageBase64})` }}
                    >
                        <div className='specialty-banner-opacity'>
                            <div className='specialty-intro'>
                                <div className='specialty-title'>
                                    <span>{detailSpecialty.departmentName}</span>
                                </div>
                                <div className='specialty-description'>
                                    <p>
                                        {detailSpecialty.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='specialty-content'>
                        <div className='specialty-content-intro'>
                            <p>DANH SÁCH BÁC SĨ</p>
                        </div>
                        {
                            listAllDoctorofSpecialty && listAllDoctorofSpecialty.map((item, index) => {
                                let imageBase64Doctor = '';
                                if (item.image) {
                                    imageBase64Doctor = new Buffer(item.image, 'base64').toString('binary')
                                }
                                return (

                                    <div className='row specialty-content-item'>
                                        <div className='col-6 specialty-content-item-info'>
                                            <div className='specialty-content-item-info-avt'
                                             style={{ backgroundImage: `url(${imageBase64Doctor})` }}
                                            >
                                            </div>
                                            <div className='specialty-content-item-info-description'>
                                                <span>{item.name}</span>
                                                <p>{item.description} </p>
                                            </div>
                                        </div>
                                        <div className='col-6 specialty-content-item-celender'>
                                            <div className='row'>
                                                <div className='col-6'>
                                                    <div className='specialty-content-item-celender-price'>
                                                        <span>GIÁ DỊCH VỤ: </span>
                                                        <p>{detailSpecialty.price} VND</p>
                                                    </div>
                                                </div>
                                                <div className='col-6'>
                                                    <div className='medical_logo'></div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => this.handlShowdetail(item)}
                                                className='specialty-content-item-celender-btn-detail'>
                                                Xem chi tiết
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategorySelect));