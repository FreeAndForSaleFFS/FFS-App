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
    $scope.userUID = "";
    $scope.myUserData.on('value', function (dataSnapshot) {
      $timeout(function () {
          $scope.user = dataSnapshot.val();
          $scope.userUID = $scope.user.userID;
      });
    });
    
    $scope.myBuyRequestData = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/BuyRequests");
    $scope.buyRequestData = {};
    
    $scope.myBuyRequestData.on('value', function (dataSnapshot) {
        $timeout(function () {
            $scope.buyRequestData = dataSnapshot.val();
        });
    });
    
    $scope.mySellRequestData = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/SellRequests");
    $scope.sellRequestData = {};
    
    $scope.mySellRequestData.on('value', function (dataSnapshot) {
        $timeout(function () {
            $scope.sellRequestData = dataSnapshot.val();
        });
    });
    $scope.deleteBuyPost = function () {
        $scope.items={};
        $scope.itemCategory = "";
        $scope.itemUID="";

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var e = window.event,
                    btn = e.target || e.srcElement;
                var itemID = btn.id,
                    myItemRef = "https://free-and-for-sale-8f8a4.firebaseio.com/posts/BuyRequests/"+itemID;
                $scope.myItemFirebase = new Firebase(myItemRef);
                $scope.myItemFirebase.on('value', function (dataSnapshot) {
                        $scope.itemCategory=dataSnapshot.child("category").val();
                        $scope.itemUID = dataSnapshot.child("userID").val();
                });
                if($scope.itemUID===user.uid){
                    var mySortedItemRef=new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/Buy/" +$scope.itemCategory+"/"+ itemID);
                    mySortedItemRef.remove();
                    $scope.myItemFirebase.remove();
                    location.reload();       
                }
                else{
                    alert("Action not allowed");
                }

            }
        });

    };
    $scope.deleteSellPost = function () {
        $scope.items={};
        $scope.itemCategory = "";
        $scope.itemUID="";

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var e = window.event,
                    btn = e.target || e.srcElement;
                var itemID = btn.id,
                    myItemRef = "https://free-and-for-sale-8f8a4.firebaseio.com/posts/SellRequests/"+itemID;
                $scope.myItemFirebase = new Firebase(myItemRef);
                $scope.myItemFirebase.on('value', function (dataSnapshot) {    
                        $scope.itemCategory=dataSnapshot.child("category").val();
                        $scope.itemUID = dataSnapshot.child("userID").val();

                   
                });
                if($scope.itemUID===user.uid){

                    var mySortedItemRef=new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/posts/Sell/" +$scope.itemCategory+"/"+ itemID);
                    mySortedItemRef.remove();
                    $scope.myItemFirebase.remove();
                    location.reload(); 
                }
                else{
                    alert("Action not allowed");
                }

                }
            });
    };
    $scope.updateSellPost = function () {
                var e = window.event,
                    btn = e.target || e.srcElement;
                var itemID = btn.id,
                    myItemRef = "https://free-and-for-sale-8f8a4.firebaseio.com/posts/SellRequests/"+itemID;
                $scope.myItemFirebase = new Firebase(myItemRef);
                $scope.myItemFirebase.on('value', function (dataSnapshot) {    
                        localStorage.setItem("checked", dataSnapshot.child("checked").val());
                        localStorage.setItem("itemName", dataSnapshot.child("itemName").val())
                        localStorage.setItem("itemPrice", dataSnapshot.child("itemPrice").val())
                        localStorage.setItem("itemDescription", dataSnapshot.child("itemDescription").val())

                });
            
        window.location.href = "updatePost.html";
    };

});