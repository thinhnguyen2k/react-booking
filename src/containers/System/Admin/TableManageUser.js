import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import HomeFooter from '../../HomePage/Section/HomeFooter';

const mdParser = new MarkdownIt();
function handleEditorChange({html,text}){
    console.log('check handleeditchange',html,text)
}
class TableManageUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usersRedux:[]
        }
    }
    componentDidMount(){
        this.props.fetUserRedux()
    }
    componentDidUpdate(prevProps,prevState,snapshot){
        if(prevProps.listusers !== this.props.listusers){
            this.setState({
                usersRedux: this.props.listusers
            })
        }
    }
    handleDeleteUser = (user) =>{
        this.props.deleteUserRedux(user.id);
    }
    handleEditUser = (user) =>{
        this.props.handleEditUserFromParentKey(user)
    }
    render() {
        let arrUsers = this.state.usersRedux;
        return (
            <React.Fragment>
                <table id="customers">
                    <tbody>
                        <tr >
                            <th>Email</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers && arrUsers.length >0 &&
                            arrUsers.map((item,index) => {
                                return( 
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className='fas fa-pencil-alt'></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className='fas fa-trash'></i></button>
                                        </td>
                                    </tr>

                                )
                            })
                        }
                    </tbody>
                </table>
                <MdEditor style={{height:'500px'}} renderHTML={text =>mdParser.render(text)}
                    onChange={handleEditorChange}
                />
                <HomeFooter/>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        listusers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),

     };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
