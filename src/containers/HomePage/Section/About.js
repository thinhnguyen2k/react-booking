import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import './About.scss';
import { Zoom } from 'react-slideshow-image'; 
import 'react-slideshow-image/dist/styles.css'
import ab1 from '../../../assets/about/ab1.jpeg';
import ab2 from '../../../assets/about/ab2.jpeg';
import ab3 from '../../../assets/about/ab3.jpeg';
import ab4 from '../../../assets/about/ab4.jpeg';
const images = [
  ab1,ab2,ab3,ab4
];
  
  const About = () => {
    return (
      <div className="about-container">
        <Zoom scale={0.4}>
          {
            images.map((each, index) => <img key={index} style={{width: "100%",height:'300px',objectFit:'cover'}} src={each} />)
          }
        </Zoom>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(About);