import React from 'react';
import { Link } from 'react-router-dom';

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
    <div className = "mainNav">
        <div className="banner">
            <p>BANNER IMAGE NEEDED</p>
        </div>
        <div className="linksDiv">
            <div className="userNav">
                <p>
                    {authUser.username}
                </p>
            </div>
        <ul className = "lNav">
        <li>
                    <Link to={ROUTES.LANDING}>
                        <button type="button" className="lndBtn">
                            Landing</button>
                    </Link>
        </li>
        <li>
                    <Link to={ROUTES.HOME}>
                        <button type="button" className="homeBtn">
                            Home</button>
                    </Link>
        </li>
                    <li>
                    <Link to={ROUTES.ACCOUNT}>
                        <button type="button" className="accountBtn">
                            Account</button>
                        </Link>
                    </li>
                {authUser.roles.includes(ROLES.ADMIN) && (
                    <li>
                        <Link to={ROUTES.ADMIN}>
                            <button type="button" className="adminBtn">
                                Admin</button>
                        </Link>
                    </li>
                )}
        <li>
            <SignOutButton />
        </li>
        </ul>
        </div>
    </div>
);

const NavigationNonAuth = () => (
    <ul className="nlNav">
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
);

export default Navigation;