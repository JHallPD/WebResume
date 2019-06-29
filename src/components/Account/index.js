import React, { Component } from 'react';
import { AuthUserContext, withAuthorization, withEmailVerification, } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Button } from 'react-bootstrap';
import { FacebookLoginButton, GoogleLoginButton, TwitterLoginButton } from "react-social-login-buttons";
//functionality for account linking 
//all signIn methods can be linked to one account
//accounts need to be expanded on to allow for more use then just home page access
const SIGN_IN_METHODS = [
    {
        id: 'password',
        provider: null,
        type: 'passLink',
    },
    {
        id: 'google.com',
        provider: 'googleProvider',
        type: 'googleLink',
    },
    {
        id: 'facebook.com',
        provider: 'facebookProvider',
        type: 'facebookLink',
    },
    {
        id: 'twitter.com',
        provider: 'twitterProvider',
        type: 'twitterLink',
    },
];

const AccountPage = () => (
    <div className="mAccountDiv">

    <AuthUserContext.Consumer>
        {authUser => (
            <div className="accountBox">
                
                    <h1>Account: {authUser.email}</h1>
                    <p>Reset Your Password</p>
                    <PasswordForgetForm />
                    <p>Change Your Password</p>
                    <PasswordChangeForm />
                    <LoginManagement authUser={authUser} />
                </div>
            
        )}
            </AuthUserContext.Consumer>

    </div>
);

class LoginManagementBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSignInMethods: [],
            error: null,
        };
    }

    componentDidMount() {
        this.fetchSignInMethods();
    }

    fetchSignInMethods = () => {
        this.props.firebase.auth
            .fetchSignInMethodsForEmail(this.props.authUser.email)
            .then(activeSignInMethods =>
                this.setState({ activeSignInMethods, error: null }),
            )
            .catch(error => this.setState({ error }));
    };

    onSocialLoginLink = provider => {
        this.props.firebase.auth.currentUser
            .linkWithPopup(this.props.firebase[provider])
            .then(this.fetchSignInMethods)
            .catch(error => this.setState({ error }));
    };

    onDefaultLoginLink = password => {
        const credential = this.props.firebase.emailAuthProvider.credential(
            this.props.authUser.email,
            password,
        );

        this.props.firebase.auth.currentUser
            .linkAndRetrieveDataWithCredential(credential)
            .then(this.fetchSignInMethods)
            .catch(error => this.setState({ error }));
    };

    onUnlink = providerId => {
        this.props.firebase.auth.currentUser
            .unlink(providerId)
            .then(this.fetchSignInMethods)
            .catch(error => this.setState({ error }));
    };

    render() {
        const { activeSignInMethods, error } = this.state;

        return (
            <div >
                <p>Sign In Methods:</p>
                <ul className="socialBtns">
                    {SIGN_IN_METHODS.map(signInMethod => {
                        const onlyOneLeft = activeSignInMethods.length === 1;
                        const isEnabled = activeSignInMethods.includes(
                            signInMethod.id,
                        );

                        return (
                            <li key={signInMethod.id}>
                                {signInMethod.id === 'password' ? (
                                    <DefaultLoginToggle
                                        onlyOneLeft={onlyOneLeft}
                                        isEnabled={isEnabled}
                                        signInMethod={signInMethod}
                                        onLink={this.onDefaultLoginLink}
                                        onUnlink={this.onUnlink}
                                        btnType={signInMethod.type}
                                    />
                                ) : (
                                        <SocialLoginToggle
                                            onlyOneLeft={onlyOneLeft}
                                            isEnabled={isEnabled}
                                            signInMethod={signInMethod}
                                            onLink={this.onSocialLoginLink}
                                            onUnlink={this.onUnlink}
                                            btnType={signInMethod.type}
                                        />
                                    )}
                            </li>
                        );
                    })}
                </ul>
                {error && error.message}
            </div>
        );
    }
}
const SocialLoginToggle = ({
    onlyOneLeft,
    isEnabled,
    signInMethod,
    onLink,
    onUnlink,
    btnType
}) => 
    (isEnabled ? (

        (signInMethod.type == 'googleLink' ? (
            <GoogleLoginButton
                className='googleBtn'
                type="button"
                onClick={() => onUnlink(signInMethod.id)}
                disabled={onlyOneLeft}
            >
                Deactivate {signInMethod.id}
            </GoogleLoginButton>
        ) : (signInMethod.type == 'facebookLink' ? (
                <FacebookLoginButton
                className='facebookBtn'
                type="button"
                onClick={() => onUnlink(signInMethod.id)}
                disabled={onlyOneLeft}
            >
                Deactivate {signInMethod.id}
            </FacebookLoginButton>
            ) : (signInMethod.type == 'twitterLink' ? (
                    <TwitterLoginButton
                        className='twitterBtn'
                    type="button"
                    onClick={() => onUnlink(signInMethod.id)}
                    disabled={onlyOneLeft}
                >
                    Deactivate {signInMethod.id}
                </TwitterLoginButton>
            ) : (null))))

    ) : (
            (signInMethod.type == 'googleLink' ? (
                <GoogleLoginButton
                    className='googleBtn'
                    type="button"
                    onClick={() => onLink(signInMethod.provider)}
                >
                    Link {signInMethod.id}
                </GoogleLoginButton>
            ) : (signInMethod.type == 'facebookLink' ? (
                    <FacebookLoginButton
                    className='facebookBtn'
                    type="button"
                    onClick={() => onLink(signInMethod.provider)}
                >
                    Link {signInMethod.id}
                    </FacebookLoginButton>
            ) : (signInMethod.type == 'twitterLink' ? (
                        <TwitterLoginButton
                        className='twitterBtn'
                        type="button"
                        onClick={() => onLink(signInMethod.provider)}
                    >
                        Link {signInMethod.id}
                    </TwitterLoginButton>
            ): (null))))

        ));




class DefaultLoginToggle extends Component {
    constructor(props) {
        super(props);

        this.state = { passwordOne: '', passwordTwo: '' };
    }

    onSubmit = event => {
        event.preventDefault();

        this.props.onLink(this.state.passwordOne);
        this.setState({ passwordOne: '', passwordTwo: '' });
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            onlyOneLeft,
            isEnabled,
            signInMethod,
            onUnlink,
        } = this.props;

        const { passwordOne, passwordTwo } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '';

        return isEnabled ? (
            <Button variant="danger" className="turnOffPass"
                type="button"
                onClick={() => onUnlink(signInMethod.id)}
                disabled={onlyOneLeft}
            >
                Turn Off Password
            </Button>
        ) : (
                <form onSubmit={this.onSubmit} className="passResetForm">
                    <div className="changePassInputs">
                    <input
                        name="passwordOne"
                        value={passwordOne}
                        onChange={this.onChange}
                        type="password"
                        placeholder="New Password"
                    />
                    <input
                        name="passwordTwo"
                        value={passwordTwo}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Confirm New Password"
                        />
                    </div>
                    <Button className="changePassBtn" variant="outline-danger" disabled={isInvalid} type="submit">
                        <i class="fas fa-key"></i>
                    </Button>

                </form>
            );
    }
}

const LoginManagement = withFirebase(LoginManagementBase);

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(AccountPage);