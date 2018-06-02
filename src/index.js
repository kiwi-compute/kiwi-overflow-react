import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { config } from './config/firebase';
import { Root } from './pages/root';

firebase.initializeApp(config);

ReactDOM.render(<Root />, document.getElementById('root'));
