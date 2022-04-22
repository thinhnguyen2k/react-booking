import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService'
import ModelUser from './ModelUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
import HomeFooter from '../HomePage/Section/HomeFooter';
class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,

        })
    }
    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,

        })
    }
    getAllUserFromReact = async () => {
        let response = await getAllUsers();
        if (response && response.success === true) {
            this.setState({
                arrUsers: response.result 
            })
        }
        // console.log('get user from node.js', response.result)
    }
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            console.log(response)
            console.log(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e);
        }
    }
    handleDeleteUser = async (user) => {
        console.log(user)
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUserFromReact();
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }
    handleEditUser = (user) => {
        console.log('bdshdgsd', user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }
    doEditUser = async (user) => {
        try {
            let res = await editUserService(user)
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUserFromReact();
            } else {
                alert(res.errCode)
            }

        } catch (e) {
            console.log(e)
        }
    }
    render() {
        let arrUsers = this.state.arrUsers
        // console.log('check api',arrUsers);
        return (
            <div className="users-container"> 
                {/* <ModelUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                /> 
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                } */}
                <div className='title text-center'>
                    DANH SÁCH NGƯỜI DÙNG
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr >
                                <th>Email</th>
                                <th>Họ và Tên</th>
                                <th>Số Điện Thoại</th>
                                <th>Địa chỉ</th>
                                <th>Vị trí</th>
                                <th>Hinh Anh</th>
                                {/* <th>Quản lí</th> */}
                            </tr>
                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    let imageBase64 = '';
                                    imageBase64 = new Buffer(item.image,'base64').toString('binary')
                                    // console.log(imageBase64)
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.name}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{item.address}</td>
                                            <td>{

                                                item.idRole === 1 ? 'ADMIN' : '' ||
                                                    item.idRole === 3 ? 'BAC SI' : '' ||
                                                        item.idRole === 2 ? 'NHAN VIEN' : ''

                                            }</td>
                                            <td><img src = {imageBase64} style={{width:'50px' , height :'50px'}} /></td>
                                            {/* <td>
                                                <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className='fas fa-pencil-alt'></i></button>
                                                <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className='fas fa-trash'></i></button>
                                            </td> */}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <HomeFooter/>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
