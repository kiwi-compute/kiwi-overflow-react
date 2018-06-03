import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { config } from './config/firebase';
import { Root } from './pages/root';
import './styles.css';

const app = firebase.initializeApp(config);
export const db = firebase.firestore(app);;

ReactDOM.render(<Root />, document.getElementById('root'));
