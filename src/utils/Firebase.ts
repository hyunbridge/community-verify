import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAH4dywRTLSK61N32Q8R9lgY5AvraJow58",
  authDomain: "hdmeal-verify.firebaseapp.com",
  projectId: "hdmeal-verify",
  storageBucket: "hdmeal-verify.appspot.com",
  messagingSenderId: "768253403236",
  appId: "1:768253403236:web:591fa2dd19c2d973ed7f71",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
