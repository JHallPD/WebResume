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


//home page currently filled with resume text.
//logic will be added to pull the text from a resume stored on the back end
//cards will pull github repos to display
//will add a contact form at the bottom to allow for email/telephone contact
//potential for chat bot
const HomePage = () => (
    <div className="mDiv">
        <div className="mTitle">
        <h1 >JEFF HALL NEEDS A JOB</h1>
            <p>THIS IS WHERE ALL THE RESUME INFORMATION WILL BE</p>
        </div>
        <div>
            <h3>JEFF HALL</h3>
 
            <h4>(705)495-7298 | jeffahall94@gmail.com | 76 Pinnacle Drive, Kitchener, ON N2P 1C5</h4>
            
            <h5>Objective Summary</h5> 
            
                <p>Looking for fulltime employment where I can continue to improve my skills and abilities to grow as a developer while making an impact on the team.</p>
            
            <h5>Summary of Skills</h5> 

            <p>•	Leadership- Ability to keep a group organized and focused. Able to encourage others to work together and complete tasks on time with effective strategy. Not afraid to talk about and solve issues or speak up when I think something is being overlooked.</p>
            <p>•	Group & Independent Work- Work well in varying group sizes and contributes willingly to achieve goals. Relying on critical thinking and analytical ability.</p>
            <p>•	IT- basic networking capabilities, troubleshooting and repair.</p>
            <p>•	Organization & Planning- The ability and desire to plan for the future and look ahead for potential roadblocks with the priority of efficiency and quality.</p> 
                                                            
            <h6>Programming Languages </h6>
            <p>Java, JavaScript, React-Native, Node.js, React,Python, C#, SQL, ASP.Net.</p>
                                                                            
            <h6>Employment History</h6>
                                                                                    
            <p>Product Prototyper Co-op                         September 2018-December 2018</p>
            <p>CarFax Canada                                                  Kitchener, ON</p>
                                                        
            <p>Co-op placement working at the CarFax Canada Product Lab developing full-stack web applications using React, React-Native, Node.js, and a Python API to allow customer to search for cars to look at based on their personal preferences.</p>
                                                            	
            <p>•	Collaborated with Senior Product Manager and Senior UX Designer to create user stories before implementing product features.</p>
            <p>•	Iterated versions on prototypes in 1 week agile sprints.</p>
            <p>•	pivoted based on feedback and new stories which required small to large changes to the application</p>
            <p>•	Gained exposure to design and DevOps principles while developing full-stack applications.</p>
            <p>•	Worked with Data Science to leverage prediction models based on our review data.</p>
                                                                                
            <p>Research & Development Engineer Co-op                    January 2018-April 2018</p>
            <p>Aerolytics                                                          Barrie, ON</p>
            <p>Co-op placement working on a realistic Cessna 172 Flight Simulator with the goal of reducing overall flight training hours required for a license. Teensy boards programmed in simplified C++ to run a completely functional Cessna 172 cockpit with flight instruments.</p>

            <p>•	Worked independently to fix and document 8 years worth of programming done prior to my hiring.</p>
            <p>•	Completely re-positioned the simulator screens and their settings to provide a seamless viewing experience with an improved pilot viewpoint.</p>
            <p>•	Created an accurate temperature modal for the flight sims onboard temperature gauges, as well as reprogrammed the flight sims pedals to allow for accurate turning feedback comparable to a real Cessna 172.</p>

            <p>Materials Engineer Co-op                                  January 2017- April2017</p>
            <p>Dortec MAGNA                                                   Bradford, ON</p>
            <p>Co-op placement at Dortec for Materials engineering focusing on packaging and efficiency.</p>
            <p>Day to day office tasks, data aggregation using excel.</p>
            <p>•	Learned and followed basic engineering principles to maintain and improve packaging for factory products.</p>
            <p>•	Using industry data sets was able to find ways to improve packaging. It proved the packaging for the factory needed to be changed from expensive single use wood and cardboard to cheap reusable rental plastic with half the logistical costs.</p>
            <p>•	Working with multiple departments to ensure that changes made in Materials is an improvement not negative for the others. </p>

            <p>Fire Ranger                                               July 2015-August 2016</p>
            <p>Ministry of Natural Resources                                        Sudbury, ON</p>
            <p>Working as a crew member for an MNR forest fire crew.</p>
            <p>Required to complete strenuous and dangerous crew tasks while containing than subduing forest fires.</p>

            <h6>Education </h6>

            <p>Computer Programming Diploma                                       2016-2018</p>
            <p>Georgian College                                                     Barrie, ON</p>

            <p>Business Diploma                                                   2013-2015</p>
            <p>Canadore College                                                 North Bay, ON</p>


        </div>
        {/** CardDeck for projects **/}
        <CardDeck className="hmDeck">
            <Card>
                <Card.Img variant="top" src={"./././286x180.svg"} alt="Jeff Facts 1" />
                <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
      </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Place holder</small>
                </Card.Footer>
            </Card>
            <Card>
                <Card.Img variant="top" src="./././286x180.svg" alt="Jeff Facts 2" />
                <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                        This card has supporting text below as a natural lead-in to additional
        content.{' '}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Place holder</small>
                </Card.Footer>
            </Card>
            <Card className="bg-dark text-white">
                <Card.Img src="./././286x180.svg" alt="Jeff Facts 3" />
                <Card.ImgOverlay>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                        Information
                    </Card.Text>
                    <Card.Text>Last updated 3 mins ago</Card.Text>
                </Card.ImgOverlay>
            </Card>
        </CardDeck>
        <p>Interests </p>
        <p>•	Competitive Sports-Playing competitive basketball and volleyball is something I have enjoyed for most of my early life.</p>
        <p>•	Camping/Hiking-Growing up in Northern Ontario instilled a love for nature and discovery from a young age.</p>
        <p>•	Video Games- General love for video games especially the sim & management genres with the dream of starting my own development company.</p>
        <p>•	Personal Projects- Currently developing phone apps in my spare time, along with some blockchain research.</p>
        <br/>
        <h2>References Available up Request</h2>
    </div>
);
const condition = authUser => !!authUser;

export default compose(withEmailVerification,withAuthorization(condition),)(HomePage);