import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
export default class Footer extends Component {
    render() {
       
        return (
            <footer className="mainFooter">
                <div className="row">
                    <div className="column">
                        <ul className="footer-links">                      
                            <li className="git-link">
                                <a href={"https://github.com/JHallPD"}>
                                    <Image src="./././Git-Mark.png"  />
                                </a>
                            </li>
                        
                            
                        </ul>
                        <p>Created By Jeff Hall</p>
                    </div>
                </div>
            </footer>
        );
    }
}


// WEBPACK FOOTER //
// ./src/components/footer/footer.js