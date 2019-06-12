import React, { Component } from 'react';
import { compose } from 'recompose';
import {
    AuthUserContext,
    withAuthorization,
    withEmailVerification,
} from '../Session';
import { withFirebase } from '../Firebase';
import { BubbleLoader } from 'react-css-loaders';
import '../../index.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'

const HomePage = () => (
    <div className="mDiv">
        <h1 className="mTitle">Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <Messages />
    </div>
);
class MessagesBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            loading: false,
            messages: [],
            limit: 5,
        };
    }

    componentDidMount() {
        this.onListenForMessages();
    }

    onListenForMessages = () => {
        this.setState({ loading: true });

        this.props.firebase
            .messages()
            .orderByChild('createdAt')
            .limitToLast(this.state.limit)
            .on('value', snapshot => {
                const messageObject = snapshot.val();

                if (messageObject) {
                    const messageList = Object.keys(messageObject).map(key => ({
                        ...messageObject[key],
                        uid: key,
                    }));

                    this.setState({
                        messages: messageList,
                        loading: false,
                    });
                } else {
                    this.setState({ messages: null, loading: false });
                }
            });
    };

    componentWillUnmount() {
        this.props.firebase.messages().off();
    }

    onChangeText = event => {
        this.setState({ text: event.target.value });
    };

    onCreateMessage = (event, authUser) => {
        this.props.firebase.messages().push({
            text: this.state.text,
            userId: authUser.uid,
            userName: authUser.username,
            createdAt: this.props.firebase.serverValue.TIMESTAMP,
        });
        console.log(authUser.username);
        this.setState({ text: '' });

        event.preventDefault();
    };

    onEditMessage = (message, text) => {
        this.props.firebase.message(message.uid).set({
            ...message,
            text,
            editedAt: this.props.firebase.serverValue.TIMESTAMP,
        });
    };

    onRemoveMessage = uid => {
        this.props.firebase.message(uid).remove();
    };

    onNextPage = () => {
        this.setState(
            state => ({ limit: state.limit + 5 }),
            this.onListenForMessages,
        );
    };

    render() {
        const { users } = this.props;
        const { text, messages, loading } = this.state;

        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <div>
                        {!loading && messages && (
                            <Button type="button" variant="info" className="moreBtn" onClick={this.onNextPage}>
                                More
              </Button>
                        )}

                        {loading && <BubbleLoader size="20" className="bubbleLoad" />}

                        {messages && (
                            <MessageList className="hmMsgList"
                                messages={messages.map(message => ({
                                    ...message,
                                    user: users
                                        ? users[message.userName]
                                        : { userName: message.userName },
                                }))}
                                onEditMessage={this.onEditMessage}
                                onRemoveMessage={this.onRemoveMessage}
                            />
                        )}

                        {!messages && <div>There are no messages ...</div>}

                        <form className="msgBar"
                            onSubmit={event =>
                                this.onCreateMessage(event, authUser)
                            }
                        >
                            <input
                                className="msgTxtBar"
                                type="text"
                                value={text}
                                onChange={this.onChangeText}
                            />
                            <Button className="msgBarBtn" variant="light" type="submit">Send</Button>
                        </form>
                    </div>
                )}
            </AuthUserContext.Consumer>
        );
    }
}

const MessageList = ({
    messages,
    onEditMessage,
    onRemoveMessage,
}) => (
        <ul className="msgList">
            {messages.map(message => (
                <MessageItem
                    key={message.uid}
                    message={message}
                    onEditMessage={onEditMessage}
                    onRemoveMessage={onRemoveMessage}
                />
            ))}
        </ul>
    );
class MessageItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            editText: this.props.message.text,
        };
    }

    onToggleEditMode = () => {
        this.setState(state => ({
            editMode: !state.editMode,
            editText: this.props.message.text,
        }));
    };

    onChangeEditText = event => {
        this.setState({ editText: event.target.value });
    };

    onSaveEditText = () => {
        this.props.onEditMessage(this.props.message, this.state.editText);

        this.setState({ editMode: false });
    };

    render() {
        const { message, onRemoveMessage } = this.props;
        const { editMode, editText } = this.state;

        return (
            <li className="msgItem">
                {editMode ? (
                    <input
                        type="text"
                        value={editText}
                        onChange={this.onChangeEditText}
                    />
                ) : (
                        <span className ="msgTxt">
                            <strong>
                                {message.user.userName} : 
                            </strong>{' '}
                             {message.text} {message.editedAt && <span>(Edited)</span>}
                        </span>
                    )}

                {editMode ? (
                    <span className="msgBtns">
                        <Button className="msgSav" variant="warning" onClick={this.onSaveEditText}>Save</Button>
                        <Button className="msgRes" variant="warning" onClick={this.onToggleEditMode}>Reset</Button>
                    </span>
                ) : (
                        <Button className="msgEdt" variant="warning" onClick={this.onToggleEditMode}>Edit</Button>
                    )}

                {!editMode && (
                    <Button className="msgDel"
                        variant="danger"
                        type="button"
                        onClick={() => onRemoveMessage(message.uid)}
                    >
                        Delete
          </Button>
                )}
            </li>
        );
    }
}

const Messages = withFirebase(MessagesBase);
const condition = authUser => !!authUser;

export default compose(withEmailVerification,withAuthorization(condition),)(HomePage);