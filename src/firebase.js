import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAq5jDKekAgD2lcrJWGLzyATQ7TOr3YrIg",
    authDomain: "cryptoinn-7ad89.firebaseapp.com",
    projectId: "cryptoinn-7ad89",
    storageBucket: "cryptoinn-7ad89.appspot.com",
    messagingSenderId: "287142823636",
    appId: "1:287142823636:web:cb7318f653ac7917c59d41"
  };

firebase.initializeApp(firebaseConfig)

const auth=firebase.auth()
const googleProvider=new firebase.auth.GoogleAuthProvider()

export {auth,googleProvider}