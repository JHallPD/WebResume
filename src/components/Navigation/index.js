import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { SignUpLinkBtn } from '../SignUp';
import '../../index.css';

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

const NavigationAuth = ({ authUser }) => (
    <Navbar className="mainNav">
        <Navbar.Brand className="banner">BANNER IMAGE NEEDED</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
            <Nav >
                <Link className="links" href="#home" to={ROUTES.HOME}>Home</Link>
                <Link className="links" href="#link" to={ROUTES.LANDING}>Landing</Link>
                <NavDropdown title={"Signed In as: "+authUser.username} id="basic-nav-dropdown">
                    <NavDropdown.Item href="#Account">
                        <Link className="links" to={ROUTES.ACCOUNT}> Account </Link>
                    </NavDropdown.Item>
                    {authUser.roles.includes(ROLES.ADMIN) && (                   
                    <NavDropdown.Item href="#Admin">
                            <Link  to={ROUTES.ADMIN}>Admin</Link>
                    </NavDropdown.Item>)}
                    <NavDropdown.Divider />
                        <SignOutButton />

                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    </Navbar>

);

const NavigationNonAuth = () => (
    <Navbar className="mainNav">
        <Navbar.Brand className="banner">BANNER IMAGE NEEDED</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                TEST TEXT
            </Navbar.Text>
            <Nav className="linksDiv">
                <Link to={ROUTES.LANDING}>Landing</Link>
                <NavDropdown title={"Please Sign In"} alignRight id="basic-nav-dropdown">
                    <NavDropdown.Item href="#SignIn">
                        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#SignUp">
                        <Link variant="secondary">Sign Up Disabled</Link>
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
   
);

export default Navigation;