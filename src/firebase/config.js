import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyDbUucSBdgLh3OTwS0Gz4Bo__vs_Epgtu0",
  authDomain: "weatherapp-bc057.firebaseapp.com",
  projectId: "weatherapp-bc057",
  storageBucket: "weatherapp-bc057.appspot.com",
  messagingSenderId: "919545051892",
  appId: "1:919545051892:web:e18780c70d5dd4853ffca1",
  measurementId: "G-Z8B2FC0N1Y",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export default firebase;
export {auth, db, storage};
