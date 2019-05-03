import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCON7En3HiWTxQ-y2EaW_rkP8PUvxu3Hm0",
    authDomain: "fir-demo-37a52.firebaseapp.com",
    databaseURL: "https://fir-demo-37a52.firebaseio.com",
    projectId: "fir-demo-37a52",
    storageBucket: "fir-demo-37a52.appspot.com",
    messagingSenderId: "266273339728"
};
firebase.initializeApp(config);
export default firebase;