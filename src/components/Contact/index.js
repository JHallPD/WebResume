import React, { Component } from 'react';
import { Button,Image } from 'react-bootstrap';
import '../../index.css';
const ContactPage = () => (

    <div className="contactMain">
        <div className="formContainer">
            <div className="contactInfo">
                <div>
                    <Image className="contactImage" src='null' roundedCircle />
                </div>
                <div className="cInfo">
                    <h1>Contact Jeff Hall</h1>
                    <p className="pForm"><i class="fa fa-phone"></i> : 705-495-7298</p>
                    <p className="pForm"><i class="fa fa-envelope"></i> : hirejeffhall@gmail.com</p>
                </div>
            </div>
            
            <div className="contactForm">
                <h3>Email Directly</h3>
                <form>
            <p>
                        <label> Name </label>
                        <input className="emailInput" type="text" name="name" required />
            </p>
            <p>
                <label> Company </label>
                        <input className="emailInput" type="text" name="company" required/>
            </p>
            <p>
                        <label> Email Address </label>
                        <input className="emailInput" type="email" name="email" required />
            </p>
            <p>
                <label> Phone Number </label>
                        <input className="emailInput" type="text" name="phone" />
                    </p>
                    <p className="full">
                <label> Message </label>
                        <textarea className="emailInputMsg" name="meesage" rows="5" required></textarea>
            </p>
                    <p className="fullBtn">
                        <Button variant="success" className="submitBtnContact">Submit</Button>
            </p>
                </form>
            </div>
        </div>
     </div>
);
            
export default ContactPage;