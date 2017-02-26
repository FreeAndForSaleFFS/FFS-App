/*global alert,angular,Firebase*/
angular
    .module('ngteam')
    .controller('DeveloperController', function ($scope, $timeout) {
        "use strict";

        $scope.teammatesData = [
        {
            name: "Sahib Grover",
            image: "Images/Developers/Sahib.jpg",
            title: "Project Manager"
        },
        {
            name: "Douglas Pan",
            image: "Images/Developers/Douglas.jpg",
            title: "Deputy Project Manager"
        },
        {
            name: "Derek Tu",
            image: "Images/Developers/Derek.jpg",
            title: "Software Development Lead"
        },
        {
            name: "Erik Syu",
            image: "Images/Developers/Erik.jpg",
            title: "Software Architect"
        },
        {
            name: "Vincent Tsui",
            image: "Images/Developers/Vincent.jpg",
            title: "Database Specialist"
        },
        {
            name: "Sahir Kochhar",
            image: "Images/Developers/Sahir.jpg",
            title: "Algorithm Specialist"
        },
        {
            name: "Jack Cho",
            image: "Images/Developers/Jack.jpg",
            title: "Senior System Analyst"
        },
        {
            name: "Tae Ho Kim",
            image: "Images/Developers/TaeHo.jpg",
            title: "Quality Assurance Lead"
        },
        {
            name: "Jian Huang",
            image: "Images/Developers/Jian.jpg",
            title: "User Interface Specialist"
        },
        {
            name: "Rohit Vallumchetla",
            image: "Images/Developers/Rohit.jpg",
            title: "Business Analyst"
        }];
    
});