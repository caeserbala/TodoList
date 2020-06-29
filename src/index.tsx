import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Board } from './Board/Board';

var firebaseConfig = {
  apiKey: "AIzaSyAg8_dLUzL4HNwM3avLPIkasHEvEppNkyM",
  authDomain: "todolist-c1bd4.firebaseapp.com",
  databaseURL: "https://todolist-c1bd4.firebaseio.com",
  projectId: "todolist-c1bd4",
  storageBucket: "todolist-c1bd4.appspot.com",
  messagingSenderId: "264821125333",
  appId: "1:264821125333:web:23475af2ca76d70767f25c"
};


ReactDOM.render(
  <React.StrictMode>
    <Board />
  </React.StrictMode>,
  document.getElementById('root')
);

