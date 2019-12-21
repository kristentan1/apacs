import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyAnDPR1_QDrw5pKKxi17yzv9PJplzrf-Ww",
    authDomain: "rnfirebase-d80d9.firebaseapp.com",
    databaseURL: "https://rnfirebase-d80d9.firebaseio.com",
    projectId: "rnfirebase-d80d9",
    storageBucket: "rnfirebase-d80d9.appspot.com",
    messagingSenderId: "401684256760",
    appId: "1:401684256760:web:6b7b4638c1c588fed4680d",
    measurementId: "G-ZFVDNZS9R9"
};
let app = Firebase.initializeApp(config);
export const db = app.database();