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
import { CardDeck,Card } from 'react-bootstrap';



const HomePage = () => (
    <div className="mDiv">
        <div className="mTitle">
        <h1 >JEFF HALL NEEDS A FUCKING JOB</h1>
            <p>THIS IS WHERE ALL THE RESUME INFORMATION WILL BE</p>
        </div>
        <CardDeck className="hmDeck">
            <Card>
                <Card.Img variant="top" src="holder.js/100px160" alt="Please hire me oh god the pain" />
                <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
      </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">I beg you</small>
                </Card.Footer>
            </Card>
            <Card>
                <Card.Img variant="top" src="holder.js/100px160" alt="Please hire me oh god the pain" />
                <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                        This card has supporting text below as a natural lead-in to additional
        content.{' '}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Please</small>
                </Card.Footer>
            </Card>
            <Card>
                <Card.Img variant="top" src="holder.js/100px160" alt="Please hire me oh god the pain" />
                <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This card has even longer content than the first to
                        show that equal height action.
      </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Oh God</small>
                </Card.Footer>
            </Card>
        </CardDeck>
        
    </div>
);
const condition = authUser => !!authUser;

export default compose(withEmailVerification,withAuthorization(condition),)(HomePage);