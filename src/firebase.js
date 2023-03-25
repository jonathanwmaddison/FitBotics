import { initializeApp }from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyDqpJfa32BgY4WUP6_O-3436PQ7fb3lS78",
    authDomain: "fitbotics-230d2.firebaseapp.com",
    projectId: "fitbotics-230d2",
    storageBucket: "fitbotics-230d2.appspot.com",
    messagingSenderId: "896006300545",
    appId: "1:896006300545:web:bdb854c4269d3197dd3e80",
    measurementId: "G-1T3KXCQK3J"
  };
  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;