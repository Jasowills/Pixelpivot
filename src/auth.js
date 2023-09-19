import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Import other Firebase services you need...
const firebaseConfig = {
    apiKey: "AIzaSyAlfafpOVfd4j5sJgYnP93M5m1ufuELdnU",
    authDomain: "pixelspivot.firebaseapp.com",
    projectId: "pixelspivot",
    storageBucket: "pixelspivot.appspot.com",
    messagingSenderId: "779782260708",
    appId: "1:779782260708:web:96a17672db0d701ba0e9f1",
    measurementId: "G-E149L54GSW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize other Firebase services you need...
export { auth }; 
