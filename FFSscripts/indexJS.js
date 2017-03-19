/*global $,firebase,console,alert,signup_success, writeUserData,prompt*/
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
    var file = "";
    firebase.initializeApp(config);
    function toggleSignIn() {
        if (firebase.auth().currentUser) {
            // [START signout]
            firebase.auth().signOut();
            // [END signout]
        } else {
            var email = document.getElementById('signInEmail').value;
            console.log(email);
            var password = document.getElementById('signInPassword').value;
            if (email.length < 4) {
                alert('Please enter an email address.');
                return;
            }
            if (password.length < 4) {
                alert('Please enter a valid password.');
                return;
            }
            // Sign in with email and pass.
            // [START authwithemail]
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function (user) {
                    if (!user.emailVerified) {
                        alert("Please verify e-mail");
                        return;
                    }
                    window.location.href = "Browse.html?";
                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // [START_EXCLUDE]
                    if (errorCode === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                // [END_EXCLUDE]
                });
                // [END authwithemail]
        }
    }
    
    /**
     * Sends an email verification to the user.
     */
    function sendEmailVerification() {
      // [START sendemailverification]
        firebase.auth().currentUser.sendEmailVerification().then(function () {
        // Email Verification sent!
        // [START_EXCLUDE]
            alert('Email Verification Sent!');
        // [END_EXCLUDE]
        });
      // [END sendemailverification]
    }
    
    function handleSignUp() {
        var firstname = document.getElementById('signUpFirstName').value;
        var lastname = document.getElementById('signUpLastName').value;
        var email = document.getElementById('signUpEmail').value;
        var contactemail = document.getElementById('signUpContactEmail').value;
        var contactnumber = document.getElementById('signUpContactNumber').value;
        var password = document.getElementById('signUpPassword').value;
        var confirmpassword = document.getElementById('signUpConfirmPassword').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (!email.endsWith("ucsd.edu")) {
            alert('Please enter a valid UCSD email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        if (firstname.length < 1) {
            alert('Please enter a first name.');
            return;
        }
        if (lastname.length < 1) {
            alert('Please enter a last name.');
            return;
        }
        if (contactemail.length < 4) {
            alert('Please enter a valid contact email.');
            return;
        }
        if (contactnumber.length < 4) {
            alert('Please enter a valid contact number.');
            return;
        }
        if (confirmpassword != password) {
            alert('The two passwords input are not the same!');
            return;
        }
        var userimage = "http://www.murketing.com/journal/wp-content/uploads/2009/04/vimeo.jpg";
        // Sign in with email and pass.
        // [START createwithemail]
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (user) {
                //signup_success = true;
                alert('A link has been sent to your e-mail to verify your account');
                sendEmailVerification();
                if (file != "") {
                    var imgLink = "";
                    var storagelink = firebase.storage().ref('userImages/' + file.name);
                    var uploadTask = storagelink.put(file);
                    uploadTask.on('state_changed', function(snapshot){
                    }, function(error) {
                    }, function() {
                        userimage = uploadTask.snapshot.downloadURL;
                        console.log("haha" + userimage);
                        writeUserData(user.uid, firstname, lastname, email,contactemail,contactnumber,userimage);
                    });
                }
                else {
                    writeUserData(user.uid, firstname, lastname, email,contactemail,contactnumber,userimage);
                }
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            // [END_EXCLUDE]
            });
            // [END createwithemail]
    }
    
    function sendPasswordReset() {
        var email = document.getElementById('forgotEmail').value;
      
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
    
    function writeUserData(userId, firstname, lastname, email,contactemail,contactnumber,userImage) {
        firebase.database().ref('users/' + userId).set(
            {
                firstName: firstname,
                lastName: lastname,
                email: email,
                contactEmail: contactemail,
                contactNumber: contactnumber,
                userImageLink: userImage              
            },
            function (onComplete) {
                window.location.href = "index.html";
            }
        );
    }
    
    
    document.getElementById('signInButton').addEventListener('click', toggleSignIn);
    document.getElementById('signUpButton').addEventListener('click', handleSignUp);
    document.getElementById('forgotButton').addEventListener('click', sendPasswordReset);
    var fileButton = document.getElementById('fileButton');
    fileButton.addEventListener('change', function(e){
        //Get File
        file = e.target.files[0];
    });
    
}());
