/*global alert,angular,Firebase,console*/
angular
    .module('ngTeam')
    .controller('pricetrendController', function ($scope, $timeout) {

        'use strict';
    //maximum amount of posts per page at page start.

        $scope.averageValue = 0;
        var temp1;
        var temp2;
        var seriesName = "";
        var text = "";

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
                $scope.dataArray();
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
                    $scope.dataArray();
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
                    $scope.dataArray();
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
        };
        
        $scope.sortByPrice = function () {
            $scope.predicate = "-itemPrice";
        };
    
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
            average = Number((average).toFixed(2));
            $scope.averageValue = average;
            if(searchText != "") {
                searchText = searchText.toLowerCase();
                seriesName = searchText.toLowerCase();
                text = "Average price for items containing '" + searchText + "': $" + average;
            }
            else {
                seriesName = "All items";
                text = "Average price for all items: $" + average;
            }
        };

        $scope.dataArray = function () {
            console.log("checkDate");
            $scope.computeAverage();
            var count = 0,
                priceRet = [],
                dateRet = [],
                average = $scope.averageValue,
                searchText = $scope.searchBy;
            if (!searchText) {
                searchText = "";
                seriesName = "";
            }
            searchText = searchText.toUpperCase();
            console.log(searchText);

            angular.forEach($scope.requestData, function (requestData) {
                var dataName = requestData.itemName;
                dataName = dataName.toUpperCase();
                if (dataName.includes(searchText)) {
                    console.log(requestData.itemName);
                    priceRet.push(requestData.itemPrice);
                    dateRet.push(requestData.time.substring(0,10));
                }
            });

            console.log("priceRet is: " + priceRet.toString());
            console.log("dateRet is " + dateRet.toString());
    
            temp1 = priceRet;
            temp2 = dateRet;

            var myConfig = 
            {
                "background-color": "#def1f2",
                "type": "line",
                "utc": true,
                "title": {
                    "text": text,
                    "font-size": "24px",
                    "adjust-layout":true
                },
                "plotarea": {
                    "margin": "dynamic 45 60 dynamic",
                },
                "legend": {
                    "layout": "float",
                    "background-color": "none",
                    "border-width": 0,
                    "shadow": 0,
                    "align":"center",
                    "adjust-layout":true,
                    "item":{
                      "padding": 7,
                      "marginRight": 17,
                      "cursor":"hand"
                    }
                },
                "scale-x": {
                    "values" : dateRet,
                    "line-color": "#000000",
                    "label": {
                        "text": "Date",
                    },
                    /*
                    "min-value": 1383292800000,
                    "shadow": 0,
                    "step": 3600000,
                    "transform": {
                        "type": "date",
                        "all": "%D, %d %M<br />%h:%i %A",
                        "guide": {
                            "visible": false
                        },
                        "item": {
                            "visible": false
                        }
                    },
                    "label": {
                        "visible": false
                    },
                    "minor-ticks": 0
                    */
                },
                "scale-y": {
                    "auto-fit": "true",
                    "line-color": "#000000",
                    "shadow": 0,
                    "guide": {
                        "line-style": "dashed"
                    },
                    "label": {
                        "text": "Price in USD",
                    },
                    "minor-ticks": 0,
                    "thousands-separator": ","
                },
                "crosshair-x": {
                    "line-color": "#efefef",
                    "plot-label": {
                        "border-radius": "5px",
                        "border-width": "1px",
                        "border-color": "#f6f7f8",
                        "padding": "10px",
                        "font-weight": "bold"
                    },
                    "scale-label": {
                        "font-color": "#000",
                        "background-color": "#f6f7f8",
                        "border-radius": "5px"
                    }
                },
                "tooltip": {
                    "visible": false
                },
                "plot": {
                    "highlight":true,
                    "tooltip-text": "%t views: %v<br>%k",
                    "shadow": 0,
                    "line-width": "2px",
                    "marker": {
                        "type": "circle",
                        "size": 3
                    },
                    "highlight-state": {
                        "line-width":3
                    },
                    "animation":{
                      "effect":1,
                      "sequence":2,
                      "speed":100,
                    }
                },
                "series": [
                    {
                        "values": priceRet,
                        "text" : seriesName,
                        "legend-text" : seriesName
                    }
                ]
            };
 
            zingchart.render({ 
                id : 'myChart', 
                data : myConfig,
                height: '100%', 
                width: '100%' 
            });
        };
    });