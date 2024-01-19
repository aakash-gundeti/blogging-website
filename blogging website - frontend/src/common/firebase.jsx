// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-ZyY5rIneh6pHptjCB-Aoxf2KwK4Sw-I",
  authDomain: "blogging-website-2c39e.firebaseapp.com",
  projectId: "blogging-website-2c39e",
  storageBucket: "blogging-website-2c39e.appspot.com",
  messagingSenderId: "383828800771",
  appId: "1:383828800771:web:69469cb54fff8049bd6536"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;
  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user
    })
    .catch((err) => {
      console.log(err)      
    })

    return user
}