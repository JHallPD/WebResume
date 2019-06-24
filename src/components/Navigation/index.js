import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar, Nav, NavDropdown } from 'react-bootstrap';
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
                    {/** If the user is an Admin allow admin routing **/}
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
//simple navbar for nonAuthUsers
//no access to home page, I will need to change this
const NavigationNonAuth = () => (
    <Navbar className="mainNav">
        <Navbar.Brand className="banner">BANNER IMAGE NEEDED</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                TEST TEXT
            </Navbar.Text>
            <Nav className="linksDiv">
                <Link className="links" to={ROUTES.LANDING}>Landing</Link>
                <NavDropdown title={"Please Sign In"} alignRight id="basic-nav-dropdown">
                    <NavDropdown.Item href="#SignIn">
                        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#SignUp">
                        <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
   
);

export default Navigation;