import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

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
        <Navbar.Brand className="banner">Navbar with text</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                
            </Navbar.Text>
            <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title={"Sign In as: "+authUser.username} id="basic-nav-dropdown">
                    <NavDropdown.Item href="#Account">
                        <Link to={ROUTES.ACCOUNT}> Account </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    </Navbar>

);

/*
      <div className = "mainNav">
        <div className="banner">
            <p>BANNER IMAGE NEEDED</p>
        </div>
        <div className="linksDiv">
            <div className="userNav">
                <li>
                    
                </li>
                <p>
                    {authUser.username}
                </p>

            </div>
        <ul className = "lNav">
        <li>
                    <Link to={ROUTES.LANDING}>
                        <Button type="Button"  className="lndBtn">
                            Landing</Button>
                    </Link>
        </li>
        <li>
                    <Link to={ROUTES.HOME}>
                        <Button type="button" className="homeBtn">
                            Home</Button>
                    </Link>
        </li>
                {authUser.roles.includes(ROLES.ADMIN) && (
                    <li>
                        <Link to={ROUTES.ADMIN}>
                            <Button type="button" variant="success" className="adminBtn">
                                Admin</Button>
                        </Link>
                    </li>
                )}
        <li>
            <SignOutButton />
        </li>
        </ul>
        </div>
    </div>
 */
const NavigationNonAuth = () => (
    <div className="mainNav">
        <div className="banner">
            <p>BANNER IMAGE NEEDED</p>
        </div>
        <div className="linksDiv">
        <div className="userNav">
            <li>
                <Link to={ROUTES.ACCOUNT}> Account </Link>
            </li>
            <p>
                Please Sign In
            </p>

        </div>
    <ul className="lNav">
        <li>
            <Link to={ROUTES.LANDING}>
                <button type="button" className="lndBtn">
                    Landing</button>
            </Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>
                <button type="button" className="signInBtn">
                    Sign In</button>
            </Link>
        </li>
            </ul>
            </div>
        </div>
);

export default Navigation;