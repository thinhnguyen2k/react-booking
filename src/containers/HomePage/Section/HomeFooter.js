import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import './HomeFooter.scss';
 
class HomeFooter extends Component {
    render() {
        return (
           <div className='home-footer'>
               <div className='row footer-contanier'>
                    <div className='col-4 footer-title'>
                        <span>Liên hệ</span>
                        <div className='footer-desc'>
                            <p>MEDICAL BOOKING</p>
                            <p>3-2,Xuân Khánh,Ninh Kiều,TP Cần Thơ</p>
                            <p>Hotline: +84 948874763</p>
                            <p>Email: medicalbooking@gmail.com</p>
                        </div>
                    </div>
                    <div className='col-4 footer-title'>
                        <span>Về chúng tôi</span>
                        <div className='footer-desc'>
                            <p>Hệ thống MEDICAL BOOKING</p>
                            <p>Đội ngũ bác sĩ</p>
                            <p>Danh sách chuyên khoa</p>
                            <p>Chính sách và quyền riêng tư</p>
                        </div>
                    </div>
                    <div className='col-4 footer-title'>
                        <span>Đối tác</span>
                        <div className='row footer-desc display-logo '>
                            <div className='col-7'>
                                <p>
                                    Website được phát triển bởi 
                                    đội ngũ kỹ sư phần mềm
                                    thực hiện niên luận ngành
                                    Kỹ thuật phần mềm Khoa CNTT
                                    Trường Đại Học Cần Thơ

                                </p>
                            </div>
                            <div className=' col-5 footer-desc-img'>
                                <div className='footer-desc-logo-medical'></div>
                                <div className='footer-desc-logo-dhct'></div>
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
