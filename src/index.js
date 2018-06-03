import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { config } from './config/firebase';
import { Root } from './pages/root';
import './styles.css';

const app = firebase.initializeApp(config);
export const db = firebase.firestore(app);;
db.settings({ timestampsInSnapshots: true });

ReactDOM.render(<Root />, document.getElementById('root'));
