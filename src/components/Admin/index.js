import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { BubbleLoader } from 'react-css-loaders';
import '../../index.css';
//admin page to display user database
//requires more functionality to interact with created users
const AdminPage = () => (
    <div>
        <h1>Admin</h1>
        <p>Unless you are Jeff Hall you should not be seeing this</p>

        <Switch>
            <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
            <Route exact path={ROUTES.ADMIN} component={UserList} />
            
        </Switch>
        <Messages />
    </div>
);

class UserListBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            users: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();

            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));

            this.setState({
                users: usersList,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render() {
        const { users, loading } = this.state;

        return (
            <div>
                <h2>Users</h2>
                {loading && <BubbleLoader size="20" className="bubbleLoad"/>}
                <ul>
                    {users.map(user => (
                        <li key={user.uid}>
                            <span>
                                <strong>ID:</strong> {user.uid}
                            </span>
                            <span>
                                <strong>E-Mail:</strong> {user.email}
                            </span>
                            <span>
                                <strong>Username:</strong> {user.username}
                            </span>
                            <span>
                                <Link
                                    to={{
                                        pathname: `${ROUTES.ADMIN}/${user.uid}`,
                                        state: { user },
                                    }}
                                >
                                    Details
                </Link>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

class UserItemBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            user: null,
            ...props.location.state,
        };
    }

    componentDidMount() {
        if (this.state.user) {
            return;
        }

        this.setState({ loading: true });

        this.props.firebase
            .user(this.props.match.params.id)
            .on('value', snapshot => {
                this.setState({
                    user: snapshot.val(),
                    loading: false,
                });
            });
    }

    componentWillUnmount() {
        this.props.firebase.user(this.props.match.params.id).off();
    }

    onSendPasswordResetEmail = () => {
        this.props.firebase.doPasswordReset(this.state.user.email);
    };

    render() {
        const { user, loading } = this.state;

        return (
            <div>
                <h2>User ({this.props.match.params.id})</h2>
                {loading && <BubbleLoader size="20" className="bubbleLoad"/>}

                {user && (
                    <div>
                        <span>
                            <strong>ID:</strong> {user.uid}
                        </span>
                        <span>
                            <strong>E-Mail:</strong> {user.email}
                        </span>
                        <span>
                            <strong>Username:</strong> {user.username}
                        </span>
                        <span>
                            <button
                                type="button"
                                onClick={this.onSendPasswordResetEmail}
                            >
                                Send Password Reset
              </button>
                        </span>
                    </div>
                )}
            </div>
        );
    }
}

class MessagesBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            messages: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.props.firebase.messages().on('value', snapshot => {
            const messageObject = snapshot.val();

            if (messageObject) {
                const messageList = Object.keys(messageObject).map(key => ({
                    ...messageObject[key],
                    uid: key,
                }));

                this.setState({
                    messages: messageList,
                    loading: false
                });
            } else {
                this.setState({ messages: null, loading: false });
            }
        });
    }

    componentWillUnmount() {
        this.props.firebase.messages().off();
    }

    render() {
        const { messages, loading } = this.state;

        return (
            <div>
                <h2>Messages</h2>
                {loading && <BubbleLoader size="20" className="bubbleLoad" />}

                {messages ? (
                    <MessageList messages={messages} />
                ) : (
                        <div>There are no messages ...</div>
                    )}
            </div>
        );
    }
}
const MessageList = ({ messages }) => (
    <ul>
        {messages.map(message => (
            <MessageItem key={message.uid} message={message} />
        ))}
    </ul>
);

const MessageItem = ({ message }) => (
    <li>
        <strong>{message.name}:{message.company}</strong> :{message.email}/{message.phone} : {message.message}
    </li>
);

const Messages = withFirebase(MessagesBase);
const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

const condition = authUser =>
    authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(AdminPage);