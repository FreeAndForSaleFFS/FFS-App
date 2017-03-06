/*global $,firebase,Firebase,console,alert*/
$(document).ready(function () {
    "use strict";
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAekAGq_S1BwZVq9pL-KXhmndvwpm1LyJI",
        authDomain: "free-and-for-sale-8f8a4.firebaseapp.com",
        databaseURL: "https://free-and-for-sale-8f8a4.firebaseio.com",
        storageBucket: "free-and-for-sale-8f8a4.appspot.com",
        messagingSenderId: "29173486724"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    function updateFirstName() {
        alert('Hi');
    }
    function updateLastName() {
        alert('Hi');
    }

    function updateEmail() {
        alert('Hi');

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var uid = user.uid;
                var newEmail = document.getElementById('contactEmail').value;
                firebase.child("users").child(uid).updateChildValues(["email": newEmail]);
                
            }
        });
    }
    function updateContact() {
        alert('Hi');
    }
    function updatePassword() {
        var email = localStorage.getItem("email");
        if (email !== null) {
            firebase.auth().sendPasswordResetEmail(email).then(function () {
                alert('Password Reset Email Sent To ' + email + '!');
            }).catch(function (error) {
            // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            // [START_EXCLUDE]
                if (errorCode === 'auth/invalid-email') {
                    alert(errorMessage);
                } else if (errorCode === 'auth/user-not-found') {
                    alert(errorMessage);
                }
                console.log(error);
        // [END_EXCLUDE]
            });
        }
      
      // [START sendpasswordemail]

      // [END sendpasswordemail];
    }
    document.getElementById('resetPasswordButton').addEventListener('click', updatePassword);
    document.getElementById('updateFirstNameButton').addEventListener('click', updateFirstName);
    document.getElementById('updateLastNameButton').addEventListener('click', updateLastName);
    document.getElementById('updateContactButton').addEventListener('click', updateContact);
    document.getElementById('updateEmailButton').addEventListener('click', updateEmail);
}());