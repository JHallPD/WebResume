import React, { Component } from 'react';
import { compose } from 'recompose';
import {
    AuthUserContext,
    withAuthorization,
    withEmailVerification,
} from '../Session';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import '../../index.css';
import { CardDeck, Card, Button} from 'react-bootstrap';
import Collapsible from 'react-collapsible';

//home page currently filled with resume text.
//logic will be added to pull the text from a resume stored on the back end
//cards will pull github repos to display
//will add a contact form at the bottom to allow for email/telephone contact
//potential for chat bot
const HomePage = () => (
    <div className="mDiv">
        <div className="BtnsDiv">
            <Button variant="warning" className="bgBtn" onClick={changeBackground}><i class="fas fa-magic "></i></Button>
            <Link className="links" href="#SignUp" to={ROUTES.CONTACT}>
                <Button variant="outline-light" className="contactBtn" onClick={changeBackground}><i class="fa fa-envelope"></i></Button>
            </Link>
        </div>
        <div className="mTitle">
        <h1 >JEFF HALL NEEDS A JOB</h1>
            <h4>jeffahall94@gmail.com | 76 Pinnacle Drive, Kitchener, ON N2P 1C5</h4>
            
        </div>
        <div className="summaryBox">

            <div className="sumBoxObj">
                <h5>Objective Summary</h5> 
           
                <p>Looking for fulltime employment where I can continue to improve my skills and abilities to grow as a developer while making an impact on the team.</p>
            </div>
            <div className="sumBoxSkills">
                <h5>Summary of Skills</h5> 
            
                <p>test test test test test test test test test test.
                    test test test test test test test test test test.
                    test test test test test test test test test test.</p>
            </div>
            <div className="sumBoxLang">                                             
                <h6>Programming Languages </h6>
                <p>Java, JavaScript, React-Native, Node.js, React,Python, C#, SQL, ASP.Net.</p>
            </div>
            </div>
        <div className="employmentBox">
            <h6>Employment History</h6>
            <div className="employmentGrid">
                <div className="firstJob">
                    <div className="jobGrid">
                        <p className="workTitle">Product Prototyper</p><p>Co-op</p>
                        <p className="companyLoc">CarFax Canada Kitchener, ON</p>
                        <p className="dateSpan"> Sept-Dec 2018</p>
                    </div>
                    <Collapsible trigger="Details">
                        
                        <div className="jobInfo">
                            <br />
                        <p>Co-op placement working at the CarFax Canada Product Lab developing full-stack web applications using React, React-Native, Node.js, and a Python API to allow customer to search for cars to look at based on their personal preferences.</p>
                        <p>Collaborated with Senior Product Manager and Senior UX Designer to create user stories before implementing product features.</p>
                        <p>Iterated versions on prototypes in 1 week agile sprints.</p>
                        <p>pivoted based on feedback and new stories which required small to large changes to the application</p>
                        <p>Gained exposure to design and DevOps principles while developing full-stack applications.</p>
                        <p>Worked with Data Science to leverage prediction models based on our review data.</p>
                        </div>
                    </Collapsible>
                </div>

                <div className="secondJob">
                    <div className="jobGrid">
                        <p className="workTitle">Research & Dev Engineer</p><p>Co-op</p>
                        <p className="companyLoc">Aerolytics Barrie, ON</p>
                        <p className="dateSpan"> Jan-April 2018</p>
                    </div>
                    <Collapsible trigger="Details">

                        <div className="jobInfo">
                            <br />
                            <p>Co-op placement working on a realistic Cessna 172 Flight Simulator with the goal of reducing overall flight training hours required for a license. Teensy boards programmed in simplified C++ to run a completely functional Cessna 172 cockpit with flight instruments.</p>
                            <p>Worked independently to fix and document 8 years worth of programming done prior to my hiring.</p>
                            <p>Completely re-positioned the simulator screens and their settings to provide a seamless viewing experience with an improved pilot viewpoint.</p>
                            <p>Created an accurate temperature modal for the flight sims onboard temperature gauges, as well as reprogrammed the flight sims pedals to allow for accurate turning feedback comparable to a real Cessna 172.</p>
                        </div>
                    </Collapsible>
                </div>
                <div className="thirdJob">
                    <div className="jobGrid">
                        <p className="workTitle">Materials Engineer</p><p>Co-op</p>
                        <p className="companyLoc">Dortec MAGNA Bradford, ON</p>
                        <p className="dateSpan"> Jan-Apr 2017</p>
                    </div>
                    <Collapsible trigger="Details">

                        <div className="jobInfo">
                            <br />
                            <p>Co-op placement at Dortec for Materials engineering focusing on packaging and efficiency.</p>
                            <p>Day to day office tasks, data aggregation using excel.</p>
                            <p>Learned and followed basic engineering principles to maintain and improve packaging for factory products.</p>
                            <p>Using industry data sets was able to find ways to improve packaging. It proved the packaging for the factory needed to be changed from expensive single use wood and cardboard to cheap reusable rental plastic with half the logistical costs.</p>
                            <p>Working with multiple departments to ensure that changes made in Materials is an improvement not negative for the others. </p>
                        </div>
                    </Collapsible>
                </div>
                <div className="fourthJob">
                    <div className="jobGrid">
                        <p className="workTitle">Fire Ranger</p><p>Seasonal</p>
                        <p className="companyLoc">MNR Sudbury, ON</p>
                        <p className="dateSpan"> Jul-Apr 2016</p>
                    </div>
                    <Collapsible trigger="Details">

                        <div className="jobInfo">
                            <br />
                            <p>Working as a crew member for an MNR forest fire crew.</p>
                            <p>Required to complete strenuous and dangerous crew tasks while containing than subduing forest fires.</p>
                        </div>
                    </Collapsible>
                </div>
            </div>
        </div>
        <div className="educationBox">
            <h6>Education </h6>
            <div className="educationGrid">
                <div className="firstDiploma">
                    <p>Computer Programming Diploma</p>
                    <p>Georgian College Barrie, ON 2016-2018</p>
                </div>
                <div className="secondDiploma">
                    <p>Business Diploma Canadore College</p>
                    <p>North Bay, ON 2013-2015</p>
                </div>
            </div>

        </div>
        {/** CardDeck for projects **/}
        <CardDeck className="hmDeck">
            <a  className="linkNoLine" href={"https://github.com/JHallPD/webResume"}>
                <Card className="bg-dark text-white">
                <Card.Img variant="top" src={"./././Flat-MountainsGit.svg"} alt="Jeff Facts 1" />
                <Card.Body>
                    <Card.Title>webResume</Card.Title>
                    <Card.Text>
                        This is my ever evolving webResume gitrepo.
                        It uses reactjs with npm to deliver node modules 
                        and firebase for the back end.
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Constantly being updated</small>
                </Card.Footer>
                </Card>
            </a>
            <a className="linkNoLine" href={"https://github.com/JHallPD/python-Top5-words-in-a-pdf/commits/master"}>
                <Card className="bg-dark text-white">
                    <Card.Img variant="top" src={"./././Flat-MountainsGit2.svg"} alt="Jeff Facts 2" />
                    <Card.Body>
                        <Card.Title>PDF Reader</Card.Title>
                        <Card.Text>
                            A simple python app that takes a submited pdf
                            and saves its title and top 5 most used words.
                            Returns stored values.
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 2019-06-15</small>
                    </Card.Footer>
                </Card>
            </a>
        </CardDeck>
        <div className="wideCard">
            <a className="linkNoLineFull" href={"https://github.com/JHallPD/Resume"}>
                <Card className="bg-dark text-white cardFull">
                    <Card.Img className="cardImg1" src="./././Spectrum-Gradient.svg" alt="Jeff Facts 3" />
                    <Card.ImgOverlay>
                        <Card.Title>Resume</Card.Title>
                        <Card.Text>
                            placeholder repo.
                    </Card.Text>
                        <Card.Text>Last updated 2019-06-28</Card.Text>
                    </Card.ImgOverlay>
                </Card>
            </a>
        </div>
        <div className="interestBox">
        <h5>Interests </h5>
        <p>Competitive Sports-Playing competitive basketball and volleyball is something I have enjoyed for most of my early life.</p>
        <p>Camping/Hiking-Growing up in Northern Ontario instilled a love for nature and discovery from a young age.</p>
        <p>Video Games- General love for video games especially the sim & management genres with the dream of starting my own development company.</p>
        <p>Personal Projects- Currently developing phone apps in my spare time, along with some blockchain research.</p>
        <br/>
            <h2>References Available up Request</h2>
        </div>
    </div>
);
let i = 0;
function changeBackground(e) {

    let background = ['./././Flat-Mountains.svg', './././Dragon-Scales.svg', './././Cornered-Stairs.svg', './././Vanishing-Stripes.svg', './././Hollowed-Boxes.svg','./././Large-Triangles.svg']

    if (i == 0) {
        
        document.querySelector('.mDiv').style.backgroundRepeat = 'no-repeat';
        document.querySelector('.mDiv').style.backgroundAttachment = 'fixed';
        document.querySelector('.mDiv').style.backgroundSize = 'cover';
        document.querySelector('.mDiv').style.backgroundImage = 'url(' + background[i] + ')';
        i++
    } else if (i == 1) {
        document.querySelector('.mDiv').style.backgroundImage = 'url(' + background[i] + ')';
        document.querySelector('.mDiv').style.backgroundRepeat = 'repeat-x';
        document.querySelector('.mDiv').style.backgroundAttachment = 'initial';
        document.querySelector('.mDiv').style.backgroundSize = 'contain';
        i++
    } else if (i == 2) {
        document.querySelector('.mDiv').style.backgroundImage = 'url(' + background[i] + ')';
        document.querySelector('.mDiv').style.backgroundRepeat = 'no-repeat';
        document.querySelector('.mDiv').style.backgroundAttachment = 'fixed';
        document.querySelector('.mDiv').style.backgroundSize = 'cover';
        i++
    } else if (i == 3) {
        document.querySelector('.mDiv').style.backgroundImage = 'url(' + background[i] + ')';
        document.querySelector('.mDiv').style.backgroundRepeat = 'initial';
        document.querySelector('.mDiv').style.backgroundAttachment = 'unset';
        document.querySelector('.mDiv').style.backgroundSize = 'initial';
        i++
    }
    else if (i == 4) {
        document.querySelector('.mDiv').style.backgroundImage = 'url(' + background[i] + ')';
        document.querySelector('.mDiv').style.backgroundRepeat = 'initial';
        document.querySelector('.mDiv').style.backgroundAttachment = 'unset';
        document.querySelector('.mDiv').style.backgroundSize = 'initial';
        i++
    }
    else if (i == 5) {
        document.querySelector('.mDiv').style.backgroundImage = 'url(' + background[i] + ')';
        document.querySelector('.mDiv').style.backgroundRepeat = 'initial';
        document.querySelector('.mDiv').style.backgroundAttachment = 'unset';
        document.querySelector('.mDiv').style.backgroundSize = 'initial';
        i = 0;
    }
    console.log(document.querySelector('.mDiv').style);
}

const condition = authUser => !!authUser;

export default compose(withEmailVerification,withAuthorization(condition),)(HomePage);