import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import {
    AuthUserContext,
    withAuthorization,
    withEmailVerification,
} from '../Session';
import '../../index.css';
import { setTimeout } from 'timers';


class contactPageBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            name: '',
            company: '',
            email: '',
            phone: '',
            message: '',

        };
    }

    onChangeText = event => {
        this.setState({ [event.target.id]: event.target.value })
        console.log(this.state.name, this.state.company, this.state.email, this.state.phone, this.state.message);
        
    };
    handleSubmit =(e) => {
        e.preventDefault();
        this.props.firebase.messages().push({
            name: this.state.name,
            company: this.state.company,
            email: this.state.email,
            phone: this.state.phone,
            message: this.state.message,
        });;

        this.setState({
            name: '',
            company: '',
            email: '',
            phone: '',
            message: '',
        });
        document.getElementById('contactForm').reset();
        //message alert
        document.querySelector('.alert').style.display = "block";

        setTimeout(function () {
            document.querySelector('.alert').style.display = "none";
        },3000);
     
}

    render() {
        const { error } = this.state;

        return (

            <div className="contactMain">   
                <div className="alert">Your message has been sent</div>
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

                    {/* TODO : validation */}
                    <div className="contactForm">
                        
                        <h3>Email Directly</h3>
                        
                        <form id="contactForm" onSubmit={this.handleSubmit}>
                            <p>
                                <label> Name </label>
                                <input className="emailInput" type="text" name="name" id="name" required onChange={this.onChangeText}/>
                            </p>
                            <p>
                                <label> Company </label>
                                <input className="emailInput" type="text" name="company" id="company" required onChange={this.onChangeText}/>
                            </p>
                            <p>
                                <label> Email Address </label>
                                <input className="emailInput" type="email" name="email" id="email" required onChange={this.onChangeText}/>
                            </p>
                            <p>
                                <label> Phone Number </label>
                                <input className="emailInput" type="text" name="phone" id="phone" onChange={this.onChangeText}/>
                            </p>
                            <p className="full">
                                <label> Message </label>
                                <textarea className="emailInputMsg" name="message" rows="5" id="message" required onChange={this.onChangeText}></textarea>
                            </p>
                            <p className="fullBtn">
                                <Button variant="success" type="submit" className="submitBtnContact">Submit</Button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


const condition = authUser => !!authUser;

const contactPageFirebase = compose(
    withRouter,
    withFirebase,
)(contactPageBase);

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(contactPageFirebase);