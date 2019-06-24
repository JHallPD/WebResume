import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';
//index.js used to connect App+components to the index.html root container
ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>,
    document.getElementById('root'),
);

serviceWorker.unregister();