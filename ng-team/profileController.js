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
        //console.log("haha" + data.name);
        $scope.profileuid = data.name;
    }

    $scope.myUserData = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/users/"+$scope.profileuid);
    $scope.myUserReportData = new Firebase("https://free-and-for-sale-8f8a4.firebaseio.com/users/"+$scope.profileuid + "/reported");
    $scope.myUserReportData.on('value', function (dataSnapshot) {
      $timeout(function () {
          $scope.reportNum = dataSnapshot.numChildren();
      });
    });
    $scope.user = {};
    $scope.userUID = "";
    var userDataBase = null;
    $scope.myUserData.on('value', function (dataSnapshot) {
      $timeout(function () {
          $scope.user = dataSnapshot.val();
          $scope.userUID = $scope.user.userID;
          userDataBase = firebase.database().ref('users/'+ $scope.profileuid);
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
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
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
                        localStorage.setItem("category", dataSnapshot.child("category").val());
                        localStorage.setItem("firstName", dataSnapshot.child("firstName").val());
                        localStorage.setItem("imageLink", dataSnapshot.child("imageLink").val());
                        localStorage.setItem("lastName", dataSnapshot.child("lastName").val());
                        localStorage.setItem("type", dataSnapshot.child("sellRequest").val());
                        localStorage.setItem("userID", dataSnapshot.child("userID").val());
                        $scope.itemUID = dataSnapshot.child("userID").val();
                });
                if($scope.itemUID!==user.uid){
                    alert("Action not allowed");
                        localStorage.removeItem("checked");
                        localStorage.removeItem("itemName");
                        localStorage.removeItem("itemPrice");
                        localStorage.removeItem("itemDescription");
                        localStorage.removeItem("category");
                        localStorage.removeItem("firstName");
                        localStorage.removeItem("imageLink");
                        localStorage.removeItem("lastName");
                        localStorage.removeItem("type");
                        localStorage.removeItem("userID");

                    return;
                    
                } else{
                   window.location.href = "updateSellPost.html";            
                }
        

                }
            });   
    
    };
    
    $scope.updateBuyPost = function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var e = window.event,
                    btn = e.target || e.srcElement;
                var itemID = btn.id,
                    myItemRef = "https://free-and-for-sale-8f8a4.firebaseio.com/posts/BuyRequests/"+itemID;
                $scope.myItemFirebase = new Firebase(myItemRef);

                $scope.myItemFirebase.on('value', function (dataSnapshot) {    
                        localStorage.setItem("checked", dataSnapshot.child("checked").val());
                        localStorage.setItem("itemName", dataSnapshot.child("itemName").val())
                        localStorage.setItem("itemPrice", dataSnapshot.child("itemPrice").val())
                        localStorage.setItem("itemDescription", dataSnapshot.child("itemDescription").val())
                        localStorage.setItem("category", dataSnapshot.child("category").val());
                        localStorage.setItem("firstName", dataSnapshot.child("firstName").val());
                        localStorage.setItem("imageLink", dataSnapshot.child("imageLink").val());
                        localStorage.setItem("lastName", dataSnapshot.child("lastName").val());
                        localStorage.setItem("type", dataSnapshot.child("sellRequest").val());
                        localStorage.setItem("userID", dataSnapshot.child("userID").val());
                        $scope.itemUID = dataSnapshot.child("userID").val();
                });
                if($scope.itemUID!==user.uid){
                    alert("Action not allowed");
                        localStorage.removeItem("checked");
                        localStorage.removeItem("itemName");
                        localStorage.removeItem("itemPrice");
                        localStorage.removeItem("itemDescription");
                        localStorage.removeItem("category");
                        localStorage.removeItem("firstName");
                        localStorage.removeItem("imageLink");
                        localStorage.removeItem("lastName");
                        localStorage.removeItem("type");
                        localStorage.removeItem("userID");

                    return;
                    
                } else{
                    window.location.href = "updateBuyPost.html";
                }
                
                }
            });  
    };
    
    $scope.report = function(){
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var userReportData = null;
                $timeout(function () {
                    console.log(userDataBase);
                    userReportData = userDataBase.child("reported");
                    //var pushedData = userReportData.child(user.uid);
                    userReportData.child(user.uid).set(user.uid);
                    console.log(userReportData.key);
                });
            }
        });  
    }
    
});