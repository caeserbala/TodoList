import * as firebase from "firebase" // doing import firebase from 'firebase' or import * as firebase from firebase is not good practice.

// Initialize Firebase
let firebaseConfig = {
    apiKey: "AIzaSyAg8_dLUzL4HNwM3avLPIkasHEvEppNkyM",
    authDomain: "todolist-c1bd4.firebaseapp.com",
    databaseURL: "https://todolist-c1bd4.firebaseio.com",
    projectId: "todolist-c1bd4",
    storageBucket: "todolist-c1bd4.appspot.com",
    messagingSenderId: "264821125333",
    appId: "1:264821125333:web:23475af2ca76d70767f25c",
    enableRedirectHandling: false
  };

let firebaseDb =  firebase.initializeApp(firebaseConfig)
let fireDatabase = firebaseDb.database();
export default fireDatabase


