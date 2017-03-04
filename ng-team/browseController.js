/*global alert,angular,Firebase*/
angular
.module('ngTeam')
.controller('browseController', function ($scope, $timeout) {

    'use strict';
    $scope.myBuyRequestData = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/BuyRequests");
    $scope.buyRequestData = {};
    $scope.negotiable = "";

    $scope.myBuyRequestData.on('value', function (dataSnapshot) {
      $timeout(function () {
        $scope.buyRequestData = dataSnapshot.val();
      });
    });

    $scope.saveMember = function() {
        alert('You have saved: ' + $scope.teammate.name);
    };


});