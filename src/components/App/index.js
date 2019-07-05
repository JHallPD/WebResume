import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import Footer from '../Footer';
import contactPageFirebase from '../Contact';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { CardDeck, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../index.css';
//app file to bring components together and create routing
const App = () => (
    <Router>

        <div className="mainDiv">

            <Navigation />
            <div className="BtnsDiv">
                <Button variant="warning" className="bgBtn" onClick={changeBackground}><i class="fas fa-magic "></i></Button>
                <Link className="links" href="#SignUp" to={ROUTES.CONTACT}>
                    <Button variant="outline-light" className="contactBtn"><i class="fa fa-envelope"></i></Button>
                </Link>
            </div>
           


            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route
                path={ROUTES.PASSWORD_FORGET}
                component={PasswordForgetPage}
            />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.CONTACT} component={contactPageFirebase} />
            <Footer/>
        </div>
    </Router>
);


let i = 0;
function changeBackground(e) {

    let background = ['./././Flat-Mountains.svg', './././Dragon-Scales.svg', './././Cornered-Stairs.svg', './././Vanishing-Stripes.svg', './././Hollowed-Boxes.svg', './././Large-Triangles.svg']

    if (i == 0) {

        document.querySelector('.mainDiv').style.backgroundRepeat = 'no-repeat';
        document.querySelector('.mainDiv').style.backgroundAttachment = 'fixed';
        document.querySelector('.mainDiv').style.backgroundSize = 'cover';
        document.querySelector('.mainDiv').style.backgroundImage = 'url(' + background[i] + ')';
        i++
    } else if (i == 1) {
        document.querySelector('.mainDiv').style.backgroundImage = 'url(' + background[i] + ')';
        document.querySelector('.mainDiv').style.backgroundRepeat = 'repeat-x';
        document.querySelector('.mainDiv').style.backgroundAttachment = 'initial';
        document.querySelector('.mainDiv').style.backgroundSize = 'contain';
        i++
    } else if (i == 2) {
        document.querySelector('.mainDiv').style.backgroundImage = 'url(' + background[i] + ')';
        document.querySelector('.mainDiv').style.backgroundRepeat = 'no-repeat';
        document.querySelector('.mainDiv').style.backgroundAttachment = 'fixed';
        document.querySelector('.mainDiv').style.backgroundSize = 'cover';
        i++
    } else if (i == 3) {
        document.querySelector('.mainDiv').style.backgroundImage = 'url(' + background[i] + ')';
        document.querySelector('.mainDiv').style.backgroundRepeat = 'initial';
        document.querySelector('.mainDiv').style.backgroundAttachment = 'unset';
        document.querySelector('.mainDiv').style.backgroundSize = 'initial';
        i++
    }
    else if (i == 4) {
        document.querySelector('.mainDiv').style.backgroundImage = 'url(' + background[i] + ')';
        document.querySelector('.mainDiv').style.backgroundRepeat = 'initial';
        document.querySelector('.mainDiv').style.backgroundAttachment = 'unset';
        document.querySelector('.mainDiv').style.backgroundSize = 'initial';
        i++
    }
    else if (i == 5) {
        document.querySelector('.mainDiv').style.backgroundImage = 'url(' + background[i] + ')';
        document.querySelector('.mainDiv').style.backgroundRepeat = 'initial';
        document.querySelector('.mainDiv').style.backgroundAttachment = 'unset';
        document.querySelector('.mainDiv').style.backgroundSize = 'initial';
        i = 0;
    }
    console.log(document.querySelector('.mainDiv').style);
}

export default withAuthentication(App);