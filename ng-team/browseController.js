/*global alert,angular,Firebase,console*/
angular
    .module('ngTeam')
    .controller('browseController', function ($scope, $timeout) {

        'use strict';
    //maximum amount of posts per page at page start.

        $scope.averageValue = 0;
        var postsLimit = 5,
            urlCheck = document.location.href;
        if (urlCheck.includes("?")) {
            var url = document.location.href,
                params = url.split('?')[1].split('&'),
                data = {},
                tmp,
                i = 0,
                l = params.length;
            for (i; i < l; i++) {
                tmp = params[i].split('=');
                data[tmp[0]] = tmp[1];
            }
            console.log("haha" + data.name);
            $scope.searchBy = data.name;
        }
        $scope.predicate = '-time';

        $scope.myRequestData = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/BuyRequests");
        $scope.requestData = {};
    
        $scope.myRequestData.on('value', function (dataSnapshot) {
            $timeout(function () {
                $scope.requestData = dataSnapshot.val();
                angular.forEach($scope.requestData, function (requestData) {
                    requestData.itemPrice = parseFloat(requestData.itemPrice);
                });
                $scope.computeAverage();
            });
        });
    
        $scope.buy = function () {
            $scope.limit = postsLimit;
            $scope.myRequestData = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/BuyRequests");
            console.log("buy");
            $scope.myRequestData.on('value', function (dataSnapshot) {
                $timeout(function () {
                    $scope.requestData = dataSnapshot.val();
                    angular.forEach($scope.requestData, function (requestData) {
                        requestData.itemPrice = parseFloat(requestData.itemPrice);
                    });
                    $scope.computeAverage();
                });
            });
        };
        $scope.sell = function () {
            $scope.limit = postsLimit;
            $scope.myRequestData = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/SellRequests");
            console.log("sell");
            $scope.myRequestData.on('value', function (dataSnapshot) {
                $timeout(function () {
                    $scope.requestData = dataSnapshot.val();
                    angular.forEach($scope.requestData, function (requestData) {
                        requestData.itemPrice = parseFloat(requestData.itemPrice);
                    });
                    $scope.computeAverage();
                });
            });
        };
        $scope.amazonPrice = function () {
            var e = window.event,
                btn = e.target || e.srcElement;
 
            $scope.itemName = btn.id;
            $scope.amazonUrl = "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=" + $scope.itemName;
            window.open($scope.amazonUrl);
        };


        $scope.limit = postsLimit;

        $scope.incrementLimit = function () {
            $scope.limit += postsLimit;
            console.log(postsLimit);
        };
    
        $scope.sortByDate = function () {
            $scope.predicate = "-time";
        }
        
        $scope.sortByPrice = function () {
            $scope.predicate = "-itemPrice";
        }
    
        $scope.computeAverage = function () {
            console.log("check");
            var count = 0,
                average = $scope.averageValue,
                searchText = $scope.searchBy;
            if (!searchText) {
                searchText = "";
            }
            searchText = searchText.toUpperCase();
            console.log(searchText);
            angular.forEach($scope.requestData, function (requestData) {
                var dataName = requestData.itemName;
                dataName = dataName.toUpperCase();
                if (dataName.includes(searchText)) {
                    console.log(requestData.itemName);
                    average = (count * average + requestData.itemPrice) / (count + 1);
                    count = count + 1;
                }
            });
            console.log(average);
            $scope.averageValue = average;
        };
    });
