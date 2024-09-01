// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDe6M8I0Yo0eTSZI-WOKI6_rtB4CsvIFog",
    authDomain: "linkedin-clone-tieson.firebaseapp.com",
    projectId: "linkedin-clone-tieson",
    storageBucket: "linkedin-clone-tieson.appspot.com",
    messagingSenderId: "1014878053881",
    appId: "1:1014878053881:web:9fbc481c4010dc3aeec928"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, provider, storage }
export default db