/*global alert,angular,Firebase*/
angular
    .module('ngTeam')
    .controller('teamController', function ($scope, $timeout) {
        'use strict';
        $scope.myData = new Firebase("https://cse110project-1c2dc.firebaseio.com/");
        $scope.teammate = {};
        $scope.teammatesData = [
        {
            name: "Sahib Grover",
            image: "Images/Developers/Sahib.jpg",
            title: "Project Manager",
            comments: "This was undoubtably my favorite class at UCSD. I love cheesecake"
        },
        {
            name: "Douglas Pan",
            image: "Images/Developers/Douglas.jpg",
            title: "Deputy Project Manager",
            comments: "This was undoubtably my favorite class at UCSD."
        },
        {
            name: "Derek Tu",
            image: "Images/Developers/Derek.jpg",
            title: "Software Development Lead",
            comments: "This was undoubtably my favorite class at UCSD."
        },
        {
            name: "Erik Syu",
            image: "Images/Developers/Erik.jpg",
            title: "Software Architect",
            comments: "This was undoubtably my favorite class at UCSD."
        },
        {
            name: "Vincent Tsui",
            image: "Images/Developers/Vincent.jpg",
            title: "Database Specialist",
            comments: "This was undoubtably my favorite class at UCSD."
        },
        {
            name: "Sahir Kochhar",
            image: "Images/Developers/Sahir.jpg",
            title: "Algorithm Specialist",
            comments: "This was undoubtably my favorite class at UCSD."
        },
        {
            name: "Jack Cho",
            image: "Images/Developers/Jack.jpg",
            title: "Senior System Analyst",
            comments: "This was undoubtably my favorite class at UCSD."
        },
        {
            name: "Tae Ho Kim",
            image: "Images/Developers/TaeHo.jpg",
            title: "Quality Assurance Lead",
            comments: "This was undoubtably my favorite class at UCSD."
        },
        {
            name: "Jian Huang",
            image: "Images/Developers/Jian.jpg",
            title: "User Interface Specialist",
            comments: "This was undoubtably my favorite class at UCSD."
        },
        {
            name: "Rohit Vallumchetla",
            image: "Images/Developers/Rohit.jpg",
            title: "Business Analyst",
            comments: "This was undoubtably my favorite class at UCSD."
        }];
        /*$scope.myTeammateData = new Firebase("https://cse110project-1c2dc.firebaseio.com/teammates");
        $scope.myTeammateData.on('value', function (dataSnapshot) {
            $timeout(function () {
                $scope.teammatesData = dataSnapshot.val();
            });
        });*/
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
          