
/*global alert,angular,Firebase,firebase,confirm,console*/
angular
    .module('ngTeam')
    .controller('updatePostController', function ($scope, $timeout) {
        'use strict';
        var config = {
            apiKey: "AIzaSyAekAGq_S1BwZVq9pL-KXhmndvwpm1LyJI",
            authDomain: "free-and-for-sale-8f8a4.firebaseapp.com",
            databaseURL: "https://free-and-for-sale-8f8a4.firebaseio.com",
            storageBucket: "free-and-for-sale-8f8a4.appspot.com",
            messagingSenderId: "29173486724"
        };
        firebase.initializeApp(config, "Tertiary");

        function logout() {
            if (firebase.auth().currentUser) {
                // [START signout]
                firebase.auth().signOut();
                // [END signout]
            }
        }
        $scope.logoutAndLink = function () {
            logout();
            //window.location.href = "index.html";
        };

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var itemName = localStorage.getItem("itemName");
                console.log(itemName);
                var myUserRef = "https://free-and-for-sale-8f8a4.firebaseio.com/posts/Sell/" + itemName;
                $scope.myItemData = new Firebase(myUserRef);
                console.log($scope.myItemData);
                console.log(myUserRef);
                $scope.item = {};
                $scope.myItemData.on('value', function (dataSnapShot) {
                    $timeout(function () {
                        $scope.item = dataSnapShot.val();
                    });
                });
            } else {
                window.location.href = "index.html";
            }
        });
    });