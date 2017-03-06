/*global $,firebase,console,alert,atob*/
$(document).ready(function () {
    /*$scope.myBuyRequestData = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/BuyRequests");*/

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
    function escapeEmailAddress(email) {
        if (!email) {
            return false;
        }
        // Replace '.' (not allowed in a Firebase key) with ',' (not allowed in an email address)
        email = email.toLowerCase();
        email = email.replace(/\./g, ',');
        return email;
    }
    function updateEmail() {


        alert(localStorage.getItem('currentUser'));
       
    }
    function updateContact() {
        
    }


    document.getElementById('updateFirstNameButton').addEventListener('click', updateFirstName);
    document.getElementById('updateLastNameButton').addEventListener('click', updateLastName);
    document.getElementById('updateContactButton').addEventListener('click', updateContact);
    document.getElementById('updateEmailButton').addEventListener('click', updateEmail);
}());