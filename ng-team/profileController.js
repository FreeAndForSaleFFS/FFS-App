/*global alert,angular,Firebase*/
angular
.module('ngTeam')
.controller('profileController', function ($scope, $timeout) {

    'use strict';
    var urlCheck = document.location.href;
    $scope.profileuid = "";
    if(urlCheck.includes("?")) {
       var url = document.location.href,
       params = url.split('?')[1].split('&'),
        data = {}, tmp;
        for (var i = 0, l = params.length; i < l; i++) {
            tmp = params[i].split('=');
            data[tmp[0]] = tmp[1];
        }
        console.log("haha" + data.name);
        $scope.profileuid = data.name;
    }

    $scope.myUserData = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/users/"+$scope.profileuid);
    $scope.user = {};
    
    $scope.myUserData.on('value', function (dataSnapshot) {
      $timeout(function () {
          $scope.user = dataSnapshot.val();
      });
    });

});