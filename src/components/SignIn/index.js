import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { isNewExpression } from '@babel/types';
import { Button } from 'react-bootstrap';
import { FacebookLoginButton, GoogleLoginButton, TwitterLoginButton } from "react-social-login-buttons";
const SignInPage = () => (
    <div className="mSignIn">
        <div className="signInBox">
        <h1>SignIn</h1>
        <SignInForm />
        <div className="socialLogIns">
            <SignInGoogle />
            <SignInFacebook />
            <SignInTwitter />
        </div>
        <PasswordForgetLink />
            <SignUpLink />
        </div>
    </div>
);
const ERROR_CODE_ACCOUNT_EXISTS =
    'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;
const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};
//basic sign up form using email and password
//very basic error handling
//all forms requires unit testing
class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <form onSubmit={this.onSubmit} className="basicSignIn">
                <div className="inputBasic">
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                    />
                </div>
                <Button variant="outline-success" disabled={isInvalid} type="submit">
                    Sign In
        </Button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}
//google sign in, 
class SignInGoogleBase extends Component {
    constructor(props) {
        super(props);

        this.state = { error: null };
    }
    onSubmit = event => {
        this.props.firebase
            .doSignInWithGoogle()
            .then(socialAuthUser => {
                //if the user is new create an account
                //otherwise log in
                let isNewU = socialAuthUser.additionalUserInfo.isNewUser;
                console.log(isNewU)
                if (isNewU== true) {
                    // Create a user in your Firebase Realtime Database too
                    this.props.firebase
                        .user(socialAuthUser.user.uid)
                        .set({
                            username: socialAuthUser.user.displayName,
                            email: socialAuthUser.user.email,
                            roles: [],
                        })
                        .then(() => {
                            this.setState({ error: null });
                            this.props.history.push(ROUTES.HOME);
                        })
                        .catch(error => {
                            this.setState({ error });
                        });
                }
            }).then(() => {
                this.setState({ error: null });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }
                this.setState({ error });
            });

        
    };

    render() {
        const { error } = this.state;

        return (
            <form >
                <GoogleLoginButton onClick={this.onSubmit}>Sign In with Google</GoogleLoginButton>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}
//facebook sign in similar to the google sign in
class SignInFacebookBase extends Component {
    constructor(props) {
        super(props);

        this.state = { error: null };
    }

    onSubmit = event => {
        this.props.firebase
            .doSignInWithFacebook()
            .then(socialAuthUser => {
                let isNewU = socialAuthUser.additionalUserInfo.isNewUser;
                console.log(isNewU)
                if (isNewU == true) {
                    // Create a user in your Firebase Realtime Database too
                    this.props.firebase
                        .user(socialAuthUser.user.uid)
                        .set({
                            username: socialAuthUser.additionalUserInfo.profile.name,
                            email: socialAuthUser.additionalUserInfo.profile.email,
                            roles: [],
                        })
                        .then(() => {
                            this.setState({ error: null });
                            this.props.history.push(ROUTES.HOME);
                        })
                        .catch(error => {
                            this.setState({ error });
                        });
                }
            }).then(() => {
                this.setState({ error: null });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }
                this.setState({ error });
            });

     
    };

    render() {
        const { error } = this.state;

        return (
            <form >
                <FacebookLoginButton onClick={this.onSubmit}>Sign In with Facebook</FacebookLoginButton>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}
//twitter sign in similar to the google sign in
class SignInTwitterBase extends Component {
    constructor(props) {
        super(props);

        this.state = { error: null };
    }

    onSubmit = event => {
        this.props.firebase
            .doSignInWithTwitter()
            .then(socialAuthUser => {
                let isNewU = socialAuthUser.additionalUserInfo.isNewUser;
                console.log(isNewU)
                if (isNewU == true) {
                    // Create a user in your Firebase Realtime Database too
                    this.props.firebase
                        .user(socialAuthUser.user.uid)
                        .set({
                            username: socialAuthUser.additionalUserInfo.profile.name,
                            email: socialAuthUser.additionalUserInfo.profile.email,
                            roles: [],
                        })
                        .then(() => {
                            this.setState({ error: null });
                            this.props.history.push(ROUTES.HOME);
                        })
                        .catch(error => {
                            this.setState({ error });
                        });
                }
            }).then(() => {
                this.setState({ error: null });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }
                this.setState({ error });
            });

       
    };

    render() {
        const { error } = this.state;

        return (
            <form >
                <TwitterLoginButton onClick={this.onSubmit}>Sign In with Twitter</TwitterLoginButton>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}
//composing the form components
const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

const SignInGoogle = compose(
    withRouter,
    withFirebase,
)(SignInGoogleBase);

const SignInFacebook = compose(
    withRouter,
    withFirebase,
)(SignInFacebookBase);

const SignInTwitter = compose(
    withRouter,
    withFirebase,
)(SignInTwitterBase);

export default SignInPage;

export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter };
