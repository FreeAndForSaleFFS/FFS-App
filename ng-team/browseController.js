/*global alert,angular,Firebase*/
angular
.module('ngTeam')
.controller('browseController', function ($scope, $timeout) {

    'use strict';
    $scope.myBuyRequestData = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/BuyRequests");
    $scope.buyRequestData = {};
    $scope.negotiable = "";
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    $scope.searchBy = data.name;
    $scope.myBuyRequestData.on('value', function (dataSnapshot) {
      $timeout(function () {
        $scope.buyRequestData = dataSnapshot.val();
      });
    });
    $scope.saveMember = function() {
        alert('You have saved: ' + $scope.teammate.name);
    };


});