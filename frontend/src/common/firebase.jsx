// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDP9aLj9uJSIT368BO7CM3YYUMzB0dFdug",
  authDomain: "mernblogb.firebaseapp.com",
  projectId: "mernblogb",
  storageBucket: "mernblogb.appspot.com",
  messagingSenderId: "391650620433",
  appId: "1:391650620433:web:223412fa1b2013bb01edb0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// google auth 
const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () =>{
  let user = null;

  await signInWithPopup(auth, provider)
  .then((result) => {
    user = result.user

  })
  .catch((err) =>{
    console.log(err)
  })

  return user;
}