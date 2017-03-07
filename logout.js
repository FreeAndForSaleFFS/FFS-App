/*global $,firebase,console*/
$(document).ready(function () {
    'use strict';
    var config = {
            apiKey: "AIzaSyAekAGq_S1BwZVq9pL-KXhmndvwpm1LyJI",
            authDomain: "free-and-for-sale-8f8a4.firebaseapp.com",
            databaseURL: "https://free-and-for-sale-8f8a4.firebaseio.com",
            storageBucket: "free-and-for-sale-8f8a4.appspot.com",
            messagingSenderId: "29173486724"
        };
    firebase.initializeApp(config);
    function logout() {
        if (firebase.auth().currentUser) {
            // [START signout]
            firebase.auth().signOut();
            // [END signout]
        }
    }
    function logoutAndLink() {
        logout();
        //window.location.href = "index.html";
    }
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            window.location.href = "index.html";
        }
    });
    document.getElementById('logoutLink').addEventListener('click', logoutAndLink);
});