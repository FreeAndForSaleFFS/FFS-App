/*global $, firebase ,Firebase,console,alert,confirm,admin*/
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
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var uid = user.uid,
                    newFirstName = document.getElementById('firstName').value,
                    myUserRef = "https://free-and-for-sale-8f8a4.firebaseio.com/users/" + uid,
                    myUserFirebase = new Firebase(myUserRef);
                myUserFirebase.update({"firstName": newFirstName});
            }
        });
        location.reload();
    }
    function updateLastName() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var uid = user.uid,
                    newLastName = document.getElementById('lastName').value,
                    myUserRef = "https://free-and-for-sale-8f8a4.firebaseio.com/users/" + uid,
                    myUserFirebase = new Firebase(myUserRef);
                myUserFirebase.update({"lastName": newLastName});
            }
        });
        location.reload();
    }

    function updateEmail() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var uid = user.uid,
                    newEmail = document.getElementById('contactEmail').value,
                    myUserRef = "https://free-and-for-sale-8f8a4.firebaseio.com/users/" + uid,
                    myUserFirebase = new Firebase(myUserRef);
                myUserFirebase.update({"contactEmail": newEmail});
            }
        });
        location.reload();
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
    function deleteAccount() {
        var confirmation = confirm("Are you sure you want to delete your account? (You must fill out your login credentials again)");
        if (confirmation === true) {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {

                    var uid = user.uid,
                        newEmail = document.getElementById('contactEmail').value,
                        myUserRef = "https://free-and-for-sale-8f8a4.firebaseio.com/users/" + uid,
                        myUserFirebase = new Firebase(myUserRef);

                    myUserFirebase.remove();
                    
                    var reLogin = firebase.auth().currentUser;
                    var credential;

                    // Prompt the user to re-provide their sign-in credentials

                    reLogin.reauthenticate(credential).then(function () {
                        // User re-authenticated.
                    }, function (error) {
                    // An error happened.
                    });
                    
                    
                    
                    var toDelete = firebase.auth().currentUser;


                    toDelete.delete().then(function () {
                        //Still need code to delete all posts associated with user
                        alert('You have deleted your account, new heading back to the login page...');
                        window.location.href = "index.html";
                    }, function (error) {
                    // An error happened.
                    });

                }
            });
        } else {
            alert('Account not deleted');
        }
    }
     function updateContactNumber() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var uid = user.uid,
                    newNumber = document.getElementById('contactPhone').value,
                    myUserRef = "https://free-and-for-sale-8f8a4.firebaseio.com/users/" + uid,
                    myUserFirebase = new Firebase(myUserRef);
                myUserFirebase.update({"contactNumber": newNumber});
            }
        });
        location.reload()
    }
    document.getElementById('updateContactNumberButton').addEventListener('click',updateContactNumber)
    document.getElementById('deleteAccountButton').addEventListener('click', deleteAccount);
    document.getElementById('resetPasswordButton').addEventListener('click', updatePassword);
    document.getElementById('updateFirstNameButton').addEventListener('click', updateFirstName);
    document.getElementById('updateLastNameButton').addEventListener('click', updateLastName);
    document.getElementById('updateEmailButton').addEventListener('click', updateEmail);
}());