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

                <p className='hdTxt'>Front-end Programming<br /> Critical Thinking & Problem Solving<br />A never give up attitude</p>

                <h6 className='lndH6'>Current Programming Languages</h6>
                <p className='hdTxt'>Reactjs, JavaScript, React-Native, Node.js, Python, SQL</p>
                <div className='btnRow'>
                    <a className="links" href={"https://github.com/JHallPD/Resume"}>
                    <Button type="button" variant="outline-info">
                        Resume
                        </Button>
                    </a>
                    {!firebase.auth().currentUser && (
                    <Link className="links" href="#SignUp" to={ROUTES.SIGN_IN}>
                    <Button type="button" variant="outline-success" >
                        Sign In
                        </Button>
                    </Link>)}
                    <Link className="links" href="#SignUp" to={ROUTES.CONTACT}>
                    <Button type="button" variant="outline-success">
                        Contact
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
        </div>
);

export default Landing;
