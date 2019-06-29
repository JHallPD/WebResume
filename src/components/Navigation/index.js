import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { SignUpLinkBtn } from '../SignUp';
import '../../index.css';
//navbar that renders based on user user authorization
const Navigation = () => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? (
                <NavigationAuth authUser={authUser} />
            ) : (
                    <NavigationNonAuth />
                )
        }
    </AuthUserContext.Consumer>
);
//simple navbar for AuthUsers
//added background image to css
const NavigationAuth = ({ authUser }) => (
    <Navbar className="mainNav" variant="dark">
        <Image src="./././favicon.ico" className="favicon"/>
        <Navbar.Brand className="banner">Jeff's Portfolio</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
            <Nav className="linksDiv">
                <NavDropdown title={"Signed In as: " + authUser.username} id="basic-nav-dropdown">
                    <NavDropdown.Item href="#Landing" >
                        <Link className="links" href="#Landing" to={ROUTES.LANDING}>Landing</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#Home">
                        <Link className="links" href="#Home" to={ROUTES.HOME}>Home</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#Account">
                        <Link className="links" href="#Account" to={ROUTES.ACCOUNT}> Account </Link>
                    </NavDropdown.Item>
                    {/** If the user is an Admin allow admin routing **/}
                    {authUser.roles.includes(ROLES.ADMIN) && (                   
                    <NavDropdown.Item href="#Admin">
                            <Link className="links" href="#Admin" to={ROUTES.ADMIN}>Admin</Link>
                    </NavDropdown.Item>)}
                    <NavDropdown.Divider />
                        <SignOutButton />

                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    </Navbar>

);
//simple navbar for nonAuthUsers
//no access to home page, I will need to change this
const NavigationNonAuth = () => (
    <Navbar className="mainNav" variant="dark">
        <Navbar.Brand className="banner">Jeff's Portfolio</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Nav className="linksDiv">
                <NavDropdown title={"Please Sign In"} alignRight id="basic-nav-dropdown">
                    <NavDropdown.Item href="#Landing" >
                        <Link className="links" href="#Landing" to={ROUTES.LANDING}>Landing</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#Home">
                        <Link className="links" href="#Home" to={ROUTES.HOME}>Home</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#SignIn">
                        <Link className="links" href="#SignIn" to={ROUTES.SIGN_IN}>Sign In</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#SignUp">
                        <Link className="links" href="#SignUp" to={ROUTES.SIGN_UP}>Sign Up</Link>
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
   
);

export default Navigation;