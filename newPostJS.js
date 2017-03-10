/*global $,Firebase,firebase,console,alert,signup_success, writeUserData,prompt*/
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
    
    var postImage = "https://pbs.twimg.com/profile_images/730145978590867460/ZFbNoKhD.jpg";
    var file ="";
    var userId = "";
    var userFirstName = "";
    var userLastName = "";
    
    function writeBuyPost() { 
        var postRef, categoryRef, entryKey;
        var post = {};
        if (file != "") {
            var imgLink = "";
            var storagelink = firebase.storage().ref('postImages/' + file.name);
            var uploadTask = storagelink.put(file);
            uploadTask.on('state_changed', function(snapshot){
            }, function(error) {
            }, function() {
                post.imageLink = uploadTask.snapshot.downloadURL;
                post.itemName = document.getElementById('newItemName').value;
                post.itemPrice = document.getElementById('newItemPrice').value;
                post.checked = false;
                if(document.getElementById('negotiableCheck').checked) {
                    post.checked = true;
                }
                post.itemDescription = document.getElementById('newItemDescription').value;
                post.category = document.getElementById('newItemCategory').value;
                post.type = "BuyRequest";
                post.userID = userId;
                post.firstName = userFirstName;
                post.lastName = userLastName;
                entryKey = post.itemName;
                console.log(post.itemName);
                firebase.database().ref('posts/BuyRequests/' + entryKey).set(
                    post,
                    function (onComplete) {
                        firebase.database().ref('posts/Buy/' + post.category + '/' +  entryKey).set(
                            post,
                            function (onComplete) {
                                window.location.href = "Browse.html?";
                            }
                        );
                    }
                );
            });
        }
        else {
            post.imageLink = postImage;
            post.itemName = document.getElementById('newItemName').value;
            post.itemPrice = document.getElementById('newItemPrice').value;
            post.checked = false;
            if(document.getElementById('negotiableCheck').checked) {
                post.checked = true;
            }
            post.itemDescription = document.getElementById('newItemDescription').value;
            post.category = document.getElementById('newItemCategory').value;
            post.type = "BuyRequest";
            post.userID = userId;
            post.firstName = userFirstName;
            post.lastName = userLastName;
            entryKey = post.itemName;
            console.log(post.itemName);
            firebase.database().ref('posts/BuyRequests/' + entryKey).set(
                post,
                function (onComplete) {
                    firebase.database().ref('posts/Buy/' + post.category + '/' +  entryKey).set(
                        post,
                        function (onComplete) {
                            window.location.href = "Browse.html?";
                        }
                    );
                }
            );
        }
    }
    function writeSellPost() {
        var postRef, categoryRef, entryKey;
        var post = {};
        if (file != "") {
            var imgLink = "";
            var storagelink = firebase.storage().ref('postImages/' + file.name);
            var uploadTask = storagelink.put(file);
            uploadTask.on('state_changed', function(snapshot){
            }, function(error) {
            }, function() {
                post.imageLink = uploadTask.snapshot.downloadURL;
                post.itemName = document.getElementById('newItemName').value;
                post.itemPrice = document.getElementById('newItemPrice').value;
                post.checked = false;
                if(document.getElementById('negotiableCheck').checked) {
                    post.checked = true;
                }
                post.itemDescription = document.getElementById('newItemDescription').value;
                post.category = document.getElementById('newItemCategory').value;
                post.type = "SellRequest";
                post.userID = userId;
                post.firstName = userFirstName;
                post.lastName = userLastName;
                entryKey = post.itemName;
                console.log(post.itemName);
                firebase.database().ref('posts/SellRequests/' + entryKey).set(
                    post,
                    function (onComplete) {
                        firebase.database().ref('posts/Sell/' + post.category + '/' +  entryKey).set(
                            post,
                            function (onComplete) {
                                window.location.href = "Browse.html?";
                            }
                        );
                    }
                );
            });
        }
        else {
            post.imageLink = postImage;
            post.itemName = document.getElementById('newItemName').value;
            post.itemPrice = document.getElementById('newItemPrice').value;
            post.checked = false;
            if(document.getElementById('negotiableCheck').checked) {
                post.checked = true;
            }
            post.itemDescription = document.getElementById('newItemDescription').value;
            post.category = document.getElementById('newItemCategory').value;
            post.type = "SellRequest";
            post.userID = userId;
            post.firstName = userFirstName;
            post.lastName = userLastName;
            entryKey = post.itemName;
            console.log(post.itemName);
            firebase.database().ref('posts/SellRequests/' + entryKey).set(
                post,
                function (onComplete) {
                    firebase.database().ref('posts/Sell/' + post.category + '/' +  entryKey).set(
                        post,
                        function (onComplete) {
                            window.location.href = "Browse.html?";
                        }
                    );
                }
            );
            
        }
    }
    function logout() {
        if (firebase.auth().currentUser) {
            // [START signout]
            firebase.auth().signOut();
            // [END signout]
        }
    }
    function profileLink() {
        window.location.href = "profile.html?name=" + userId;
    }
    function logoutAndLink() {
        logout();
        //window.location.href = "index.html";
    }
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            window.location.href = "index.html";
        }
        else {
            userId = user.uid;
            var myUserData = firebase.database().ref('users/'+userId);
            var userProperties = {};
            myUserData.on('value', function (dataSnapshot) {
                userProperties = dataSnapshot.val();
                console.log("lol");
                userFirstName = userProperties.firstName;
                userLastName = userProperties.lastName;
                console.log(userFirstName);
                console.log(userLastName);
            });
        }
    });
    document.getElementById('logoutLink').addEventListener('click', logoutAndLink);
    document.getElementById('profileLink').addEventListener('click',profileLink);
    
    var buyButton = document.getElementById('newBuyButton');
    var sellButton = document.getElementById('newSellButton');
    buyButton.addEventListener('click', writeBuyPost);
    sellButton.addEventListener('click', writeSellPost);
    
    var uploader = document.getElementById('uploader');
    var fileButton = document.getElementById('fileButton');
    
    fileButton.addEventListener('change', function(e){
        //Get File
        file = e.target.files[0];
    });
    
}());