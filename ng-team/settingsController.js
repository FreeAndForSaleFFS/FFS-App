/*global alert,angular,Firebase*/
angular
    .module('ngTeam')
    .controller('settingsController', function ($scope, $timeout) {
        'use strict';
        $scope.myUserData = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/users");
        $scope.usersData = {};
        $scope.myUserData.on('value', function (dataSnapShot) {
            $timeout(function () {
                $scope.usersData = dataSnapShot.val();
            });
        });
    });