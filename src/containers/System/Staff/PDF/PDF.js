import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
} from "@react-pdf/renderer";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { connect } from "react-redux";
import React, { Component } from 'react';
import * as actions from "../../../../store/actions";
// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: "white",
        color: "black",
    },
    section: {
        margin: 10,
        padding: 10,
    },
    viewer: {
        width: "500px", //the pdf viewer will take up all of the width and height
        height: "500px",
    },
    textheader:{
        textAlign:"center",
        fontSize:"34px",
        fontWeight:"600"
    },
    text:{
        margin:"24px"
    }
});

// Create Document Component
class PDF extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenPDF: false
        }
    }
    async componentDidMount() {
        console.log(this.props)
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    render() {
        let infoUser = this.props.user
        console.log(this.props)
        return ( 
            <React.Fragment>
                <Modal
                     isOpen={this.props.isOpen}
                     toggle={() => { this.toggle() }}
                     centered
                >
                    <PDFViewer style={styles.viewer}>
                        {/* Start of the document*/}
                        <Document>
                            {/*render a single page*/}
                            <Page size="A4" style={styles.page}>
                                <View style={styles.section}>
                                    <Text style={styles.textheader}>DON KHAM BENH</Text>
                                </View>
                                <View style={styles.section}>
                                    
                                    <Text> Ma Ho So : {infoUser.idBooking}</Text>
                                    <Text> Ngay Kham : {infoUser.date}</Text>
                                    <Text> Gio Kham : {infoUser.slotTime}</Text>
                                    <Text> Ten Bac Si Phu Trach : {infoUser.nameDoctor}</Text>
                                    <Text> Ten benh nhan : {infoUser.namePatient}</Text>
                                </View>
                            </Page>
                        </Document>
                    </PDFViewer>
                </Modal>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createHistory: (data) => dispatch(actions.createNewHistory(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PDF);