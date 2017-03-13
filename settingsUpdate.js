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
        var TIME_OUT = 3000;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var uid = user.uid,
                    newFirstName = document.getElementById('firstName').value,
                    myUserRef = "https://free-and-for-sale-8f8a4.firebaseio.com/users/" + uid,
                    myUserFirebase = new Firebase(myUserRef);
                myUserFirebase.update({"firstName": newFirstName});
                
                var sellRequest = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/SellRequests/"),
                    buyRequest = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/BuyRequests/");
        
                sellRequest.on('value', function (posts) {
                    posts.forEach(function (snapshot) {
                        var obj = snapshot.val();
                        if (obj.userID === user.uid) {
                            var toChangeRequest = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/SellRequests/" + obj.itemName),
                                toChangePost = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/Sell/" + obj.category + "/" + obj.itemName);
                            
                            toChangeRequest.update({"firstName" : newFirstName});
                            toChangePost.update({"firstName" : newFirstName});
                        }
                    });
                });
                buyRequest.on('value', function (posts) {
                    posts.forEach(function (snapshot) {
                        var obj = snapshot.val();
                        if (obj.userID === user.uid) {
                            var toChangeRequest = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/BuyRequests/" + obj.itemName),
                                toChangePost = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/Buy/" + obj.category + "/" + obj.itemName);

                            toChangeRequest.update({"firstName" : newFirstName});
                            toChangePost.update({"firstName" : newFirstName});

                            
                        }
                    });
                });
                
            }
        });
        window.setTimeout(location.reload.bind(location), TIME_OUT);
    }
    function updateLastName() {
        var TIME_OUT = 3000;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var uid = user.uid,
                    newLastName = document.getElementById('lastName').value,
                    myUserRef = "https://free-and-for-sale-8f8a4.firebaseio.com/users/" + uid,
                    myUserFirebase = new Firebase(myUserRef);
                myUserFirebase.update({"lastName": newLastName});
                var sellRequest = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/SellRequests/"),
                    buyRequest = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/BuyRequests/");
        
                sellRequest.on('value', function (posts) {
                    posts.forEach(function (snapshot) {
                        var obj = snapshot.val();
                        if (obj.userID === user.uid) {
                            var toChangeRequest = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/SellRequests/" + obj.itemName),
                                toChangePost = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/Sell/" + obj.category + "/" + obj.itemName);
                            
                            toChangeRequest.update({"lastName" : newLastName});
                            toChangePost.update({"lastName" : newLastName});
                        }
                    });
                });
                buyRequest.on('value', function (posts) {
                    posts.forEach(function (snapshot) {
                        var obj = snapshot.val();
                        if (obj.userID === user.uid) {
                            var toChangeRequest = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/BuyRequests/" + obj.itemName),
                                toChangePost = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/Buy/" + obj.category + "/" + obj.itemName);
                            toChangeRequest.update({"lastName" : newLastName});
                            toChangePost.update({"lastName" : newLastName});
                        }
                    });
                });
            }
        });
        window.setTimeout(location.reload.bind(location), TIME_OUT);
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
        var confirmation = confirm("Are you sure you want to delete your account? (You must fill out your login credentials again)"),
            USER = window.prompt("enter your email"),
            PASS = window.prompt("enter your password");
        if (confirmation === true) {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {

                    var uid = user.uid,
                        myUserRef = "https://free-and-for-sale-8f8a4.firebaseio.com/users/" + uid,
                        myUserFirebase = new Firebase(myUserRef);

                    
                    
                    var reLogin = firebase.auth().currentUser,


                        credential = firebase.auth.EmailAuthProvider.credential(
                            USER,
                            PASS
                        );       
                    reLogin.reauthenticate(credential).then(function () {
                        var toDelete = firebase.auth().currentUser;

                        myUserFirebase.remove();
                        toDelete.delete().then(function () {                            
                            
                            var sellRequest = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/SellRequests/"),
                                buyRequest = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/BuyRequests/");
        
                            sellRequest.on('value', function (posts) {
                                posts.forEach(function (snapshot) {
                                    var obj = snapshot.val();
                                    if (obj.userID === user.uid) {
                                        var toChangeRequest = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/SellRequests/" + obj.itemName),
                                            toChangePost = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/Sell/" + obj.category + "/" + obj.itemName);
                            
                                        toChangeRequest.remove();
                                        toChangePost.remove();
                                    }
                                });
                            });
                            buyRequest.on('value', function (posts) {
                                posts.forEach(function (snapshot) {
                                    var obj = snapshot.val();
                                    if (obj.userID === user.uid) {
                                        var toChangeRequest = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/BuyRequests/" + obj.itemName),
                                            toChangePost = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/Buy/" + obj.category + "/" + obj.itemName);
                                        toChangeRequest.remove();
                                        toChangePost.remove();
                                    }
                                });
                            });
            
                            alert('You have deleted your account, new heading back to the login page...');
                            window.location.href = "index.html";
                        
                        }, function (error) {
                    // An error happened.
                        });
                
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
        location.reload();
    }
    document.getElementById('updateContactNumberButton').addEventListener('click', updateContactNumber);
    document.getElementById('deleteAccountButton').addEventListener('click', deleteAccount);
    document.getElementById('resetPasswordButton').addEventListener('click', updatePassword);
    document.getElementById('updateFirstNameButton').addEventListener('click', updateFirstName);
    document.getElementById('updateLastNameButton').addEventListener('click', updateLastName);
    document.getElementById('updateEmailButton').addEventListener('click', updateEmail);
}());