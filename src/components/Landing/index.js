import React from 'react';
import { Image, Button} from 'react-bootstrap';
import '../../index.css';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import firebase from 'firebase'
require('firebase/auth')

//Needs a lot of work
const Landing = () => (
    <div className="lndMain">
        <header className="lndHeader">
            <div >
                <h1>Jeff Hall's Portfolio</h1>
                <p>New Grad | Passionate About Programming | Seeking Junior Positions</p>

                <h6 className='lndH6'>A few things I bring to the table</h6>

                <p className='hdTxt'>Front-End Programming<br /> Critical Thinking & Problem Solving<br />A Relentless Attitude</p>

                <h6 className='lndH6'>Current Site Functionality</h6>
                <p className='hdTxt'>You must log in to use the contact form.</p>
                <p className='hdTxt'>In a rush? Click Resume + Supporting Docs</p>

                    <div className="signInContactRow">
                    {!firebase.auth().currentUser && (
                    <Link className="links" href="#SignIn" to={ROUTES.SIGN_IN}>
                            <Button className="lndSignIn" type="button" variant="outline-success" >
                        Sign In
                        </Button>
                        </Link>)}
                    {firebase.auth().currentUser && (
                    <Link className="links" href="#Contact" to={ROUTES.CONTACT}>
                        <Button className="lndContact" type="button" variant="outline-success">
                        Contact
                        </Button>
                            </Link>)}
                        </div>
                <div className='btnRow'>
                    <a className="links" href={"https://github.com/JHallPD/Resume/raw/master/ResumeJHall.pdf"} >
                        <Button className="resumeBtn" type="button" variant="outline-info">
                            Resume
                        </Button>
                    </a>
                    <a className="links" href={"https://github.com/JHallPD/Resume/raw/master/Jeff%20Hall%20-%20EmployerEvaluation%202018.pdf"} >
                        <Button className="resumeDocsBtn" type="button" variant="outline-info">
                            +Docs
                        </Button>
                    </a>
                </div>
            </div>
        </header>
        </div>
);

export default Landing;
