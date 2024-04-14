// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, setDoc, doc, updateDoc} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxTTNnEB1cRkaxkpEPaUxsPWDZm4L0mOU",
  authDomain: "devopia04.firebaseapp.com",
  projectId: "devopia04",
  storageBucket: "devopia04.appspot.com",
  messagingSenderId: "339215465781",
  appId: "1:339215465781:web:d26e287b58a14dfa2e607c",
  measurementId: "G-01DXVVV1KC"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const SignUpp = async (name, email, password) => {
    try {
        const data = await createUserWithEmailAndPassword(auth, email, password);
        const id = data.user.uid
        console.log(id)
        try {
            const docRef = doc(db,"users", id);
            await setDoc(docRef, {
              name, 
              email
            })
            console.log(docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    } catch (error) {
        console.error(error)
    }
}

export const SignInn = async (email, password) => {
    try {
        const data = await signInWithEmailAndPassword(auth, email, password);
        return data.user.uid;
    } catch (error) {
        console.error(error)
        alert(error)
    }
}


