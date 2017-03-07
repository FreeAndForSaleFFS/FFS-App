/*global alert,angular,Firebase,firebase*/
angular
    .module('ngTeam')
    .controller('settingsController', function ($scope, $timeout) {
    'use strict';
    var config = {
        apiKey: "AIzaSyAekAGq_S1BwZVq9pL-KXhmndvwpm1LyJI",
        authDomain: "free-and-for-sale-8f8a4.firebaseapp.com",
        databaseURL: "https://free-and-for-sale-8f8a4.firebaseio.com",
        storageBucket: "free-and-for-sale-8f8a4.appspot.com",
        messagingSenderId: "29173486724"
    };
    firebase.initializeApp(config);
    var uid;
    function logout() {
        if (firebase.auth().currentUser) {
            // [START signout]
            firebase.auth().signOut();
            // [END signout]
        }
    }
    $scope.logoutAndLink = function() {
        logout();
        //window.location.href = "index.html";
    };
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var uid = user.uid;
            $scope.uid = user.uid;
            console.log($scope.uid);
            var myUserRef = "https://free-and-for-sale-8f8a4.firebaseio.com/users/" + uid; 
            $scope.myCurrUserData = new Firebase(myUserRef);
            $scope.currUser = {};
            $scope.myCurrUserData.on('value',function(dataSnapShot) {
               $timeout(function () {
                   $scope.currUser = dataSnapShot.val();
               }); 
            });
        }
        else {
            window.location.href="index.html";
        }
    });  
});