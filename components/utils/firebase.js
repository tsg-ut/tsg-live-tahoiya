const firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');

if (firebase.apps.length === 0) {
	firebase.initializeApp({
		apiKey: "AIzaSyAv8gwowPR5VHSeXRmXWYtzD2foxbAYz1g",
		authDomain: "tsg-live-5.firebaseapp.com",
		databaseURL: "https://tsg-live-5.firebaseio.com",
		projectId: "tsg-live-5",
		storageBucket: "tsg-live-5.appspot.com",
		messagingSenderId: "907358007884",
		appId: "1:907358007884:web:ba91a22a93f9d7c04efae9",
		measurementId: "G-LX3SGDLC6X",
	});
}

module.exports = firebase.apps[0];
