/*global alert,angular,Firebase*/
angular
    .module('ngTeam')
    .controller('loginController', function ($scope, $timeout) {
        'use strict';
        var config = {
            apiKey: "AIzaSyAekAGq_S1BwZVq9pL-KXhmndvwpm1LyJI",
            authDomain: "free-and-for-sale-8f8a4.firebaseapp.com",
            databaseURL: "https://free-and-for-sale-8f8a4.firebaseio.com",
            storageBucket: "free-and-for-sale-8f8a4.appspot.com",
            messagingSenderId: "29173486724"
        };
        firebase.initializeApp(config);
        $scope.myData = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com");
        $scope.teammate = {};
        $scope.teammatesData = {};
        $scope.myTeammateData = new Firebase("https://cse110project-1c2dc.firebaseio.com/teammates");
        $scope.myTeammateData.on('value', function (dataSnapshot) {
            $timeout(function () {
                $scope.teammatesData = dataSnapshot.val();
            });
        });
        $scope.saveMember = function () {
            alert('You have saved: ' + $scope.teammate.name);
            var teammateRef, entryKey;
            /*Creates a ref to the teammates table of the database*/
            teammateRef = $scope.myData.child("teammates");
            /*Use this for your key to enter data*/
            entryKey = $scope.teammate.name;
            teammateRef.child(entryKey).set($scope.teammate);
            /*Will erase the fields on the screen containing the name and age*/
            $scope.teammate.name = "";
            $scope.teammate.full_name = "";
            $scope.teammate.age = 0;
        };
    });