import React from 'react';
import { Image} from 'react-bootstrap';
import '../../index.css';
//Needs a lot of work
const Landing = () => (
    <div className="lndMain">
        <header className="lndHeader">
            <div className='hdTxt'>
                <h1>Jeff Hall's Portfolio</h1>
                <p>New Grad | Passionate About Programming | Seeking Junior Positions</p>

                <h6 className='lndH6'>A few things I bring to the table</h6>

                <p>Front-end Programming<br /> Critical Thinking & Problem Solving<br />A never give up attitude</p>

            <h6>Current Programming Languages</h6>
                <p>Reactjs, JavaScript, React-Native, Node.js, Python, SQL</p>
                <p>Log In or click<a href="https://github.com/JHallPD/Resume"> here </a>to look at my resume</p>
            </div>
        </header>
        </div>
);

export default Landing;
