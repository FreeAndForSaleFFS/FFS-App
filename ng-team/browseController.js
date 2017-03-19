/*global alert,angular,Firebase,console*/
angular
    .module('ngTeam')
    .controller('browseController', function ($scope, $timeout) {

        'use strict';
    //maximum amount of posts per page at page start.
        $scope.averageValue = 0;
    //initial category
        $scope.dataType = "All";
    //initial choice between buy or sell requests
        $scope.buyOrSell = "buy";
        $scope.lookingFor = "> Looking For <";
        $scope.forSale = "For Sale";
        
        
        var postsLimit = 5, //number of posts per page
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
            $scope.searchBy = data.name; //when coming from another page, we parse link and store it in search bar
        }
        $scope.predicate = '-time'; //initially data sorted by date
    
    //initial firebase database is set to buyrequests
        $scope.myRequestData = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/BuyRequests");
        $scope.requestData = {};
    //Method: checks if current database in use is changed, then take screenshot
        $scope.myRequestData.on('value', function (dataSnapshot) {
            $timeout(function () {
                $scope.requestData = dataSnapshot.val();
                angular.forEach($scope.requestData, function (requestData) {
                    requestData.itemPrice = parseFloat(requestData.itemPrice);
                });//change itemprice from string to int
                $scope.computeAverage(); //compute average
            });
        });
    
    //change database to the buy one, with respective category with any
        $scope.buy = function () {
            $scope.buyOrSell = "buy";
            $scope.lookingFor = "> Looking For <";
            $scope.forSale = "For Sale";
            $scope.limit = postsLimit;
            if($scope.dataType == "All") {  
                $scope.myRequestData = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/BuyRequests");
            }
            else {
                $scope.myRequestData = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/Buy/" + $scope.dataType )
            }
            console.log("buy");
            $scope.myRequestData.on('value', function (dataSnapshot) {
                $timeout(function () {
                    $scope.requestData = dataSnapshot.val();
                    angular.forEach($scope.requestData, function (requestData) {
                        requestData.itemPrice = parseFloat(requestData.itemPrice);
                    }); //change itemprice from string to int
                    $scope.computeAverage();//compute average
                });
            });
        };
    //change database to the sell one, with respective category with any
        $scope.sell = function () {
            $scope.buyOrSell = "sell";
            $scope.lookingFor = "Looking For";
            $scope.forSale = "> For Sale <";
            $scope.limit = postsLimit;
            if($scope.dataType == "All") {
                $scope.myRequestData = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/SellRequests");
            }
            else {
                $scope.myRequestData = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/Sell/" + $scope.dataType )
            }
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
    //takes us to amazon current itemName data
        $scope.amazonPrice = function () {
            var e = window.event,
                btn = e.target || e.srcElement;
 
            $scope.itemName = btn.id;
            $scope.amazonUrl = "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=" + $scope.itemName;
            window.open($scope.amazonUrl);
        };


        $scope.limit = postsLimit; //initialize posts per page

        $scope.incrementLimit = function () {
            $scope.limit += postsLimit; //changing posts per page
            console.log(postsLimit);
        };
        
    //methods below are for changing databases according to category chosen
        $scope.setAll = function () {
            $scope.dataType = "All";
            if ($scope.buyOrSell == "buy") {
                $scope.buy();
            }
            else {
                $scope.sell();
            }
        };    
    
        $scope.setBooks = function () {
            $scope.dataType = "Books";
            if ($scope.buyOrSell == "buy") {
                $scope.buy();
            }
            else {
                $scope.sell();
            }
        };
    
        $scope.setNotes = function () {
            $scope.dataType = "Notes";
            if ($scope.buyOrSell == "buy") {
                $scope.buy();
            }
            else {
                $scope.sell();
            }
        };
    
        $scope.setFurniture = function () {
            $scope.dataType = "Furniture";
            if ($scope.buyOrSell == "buy") {
                $scope.buy();
            }
            else {
                $scope.sell();
            }
        };
    
        $scope.setClothes = function () {
            $scope.dataType = "Clothes";
            if ($scope.buyOrSell == "buy") {
                $scope.buy();
            }
            else {
                $scope.sell();
            }
        };
    
        $scope.setFood = function () {
            $scope.dataType = "Food";
            if ($scope.buyOrSell == "buy") {
                $scope.buy();
            }
            else {
                $scope.sell();
            }
        };
    
        $scope.setServices = function () {
            $scope.dataType = "Services";
            if ($scope.buyOrSell == "buy") {
                $scope.buy();
            }
            else {
                $scope.sell();
            }
        };
    
        $scope.setTechnology = function () {
            $scope.dataType = "Technology";
            if ($scope.buyOrSell == "buy") {
                $scope.buy();
            }
            else {
                $scope.sell();
            }
        };
    
        $scope.setOther = function () {
            $scope.dataType = "Other";
            if ($scope.buyOrSell == "buy") {
                $scope.buy();
            }
            else {
                $scope.sell();
            }
        };
    
    
    //changes predicate with is used as an orderBy filter in ng-Repeat so data is sorted
        $scope.sortByDate = function () {
            $scope.predicate = "-time";
        };
        
        $scope.sortByPrice = function () {
            $scope.predicate = "-itemPrice";
        };
    
    //method to compute Average
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
