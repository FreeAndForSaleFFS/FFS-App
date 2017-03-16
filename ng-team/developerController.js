/*global alert,angular,Firebase*/
angular
    .module('ngTeam')
    .controller('teamController', function ($scope, $timeout) {
        'use strict';
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
            name: "Eric Syu",
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
        $scope.searchFunc = function () {
            var b = $scope.searchBy,
                url = 'Browse.html?name=' + encodeURIComponent(b);
            console.log(url);
            window.location.href = url;
        };
    });
          