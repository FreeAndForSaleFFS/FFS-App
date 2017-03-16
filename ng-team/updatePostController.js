
/*global alert,angular,Firebase,firebase,confirm,console*/
angular
    .module('ngTeam')
    .controller('updatePostController', function ($scope, $timeout) {
        'use strict';
        var config = {
            apiKey: "AIzaSyAekAGq_S1BwZVq9pL-KXhmndvwpm1LyJI",
            authDomain: "free-and-for-sale-8f8a4.firebaseapp.com",
            databaseURL: "https://free-and-for-sale-8f8a4.firebaseio.com",
            storageBucket: "free-and-for-sale-8f8a4.appspot.com",
            messagingSenderId: "29173486724"
        };
        firebase.initializeApp(config, "Tertiary");

        function logout() {
            if (firebase.auth().currentUser) {
                // [START signout]
                firebase.auth().signOut();
                // [END signout]
            }
        }
        $scope.logoutAndLink = function () {
            logout();
            //window.location.href = "index.html";
        };

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var itemName = localStorage.getItem("itemName"),
                    myUserRef = "https://free-and-for-sale-8f8a4.firebaseio.com/posts/SellRequests/" + itemName;
                $scope.myItemData = new Firebase(myUserRef);
                $scope.itemSell = {};
                $scope.myItemData.on('value', function (dataSnapShot) {
                    $timeout(function () {
                        $scope.itemSell = dataSnapShot.val();
                    });
                });
            } else {
                window.location.href = "index.html";
            }
        });
    
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var itemName = localStorage.getItem("itemName"),
                    myUserRef = "https://free-and-for-sale-8f8a4.firebaseio.com/posts/BuyRequests/" + itemName;
                $scope.myItemData = new Firebase(myUserRef);
                $scope.itemBuy = {};
                $scope.myItemData.on('value', function (dataSnapShot) {
                    $timeout(function () {
                        $scope.itemBuy = dataSnapShot.val();
                    });
                });
            } else {
                window.location.href = "index.html";
            }
        });
    
    
    
        $scope.cancelPost = function (){
            window.location.href = "Browse.html";
        };
    
        $scope.updateSellPost = function () {
            

            var e = window.event,
                btn = e.target || e.srcElement,
                itemID = btn.id,
                myItemRefSRQ = "https://free-and-for-sale-8f8a4.firebaseio.com/posts/SellRequests/" + itemID,
                myItemRefSell = "https://free-and-for-sale-8f8a4.firebaseio.com/posts/Sell/" + localStorage.getItem("category") + "/" + itemID,
                newItemName = document.getElementById('newItemName').value,
                newItemPrice = document.getElementById('newItemPrice').value,
                newItemDescription = document.getElementById('newItemDescription').value,
                myItemFirebaseSell = new Firebase(myItemRefSell),
                myItemFirebaseSRQ = new Firebase(myItemRefSRQ);
            
                  
            
            if (itemID === "") {
                console.log("problem");
                return;
            }
            if (newItemName === "") {
                newItemName = localStorage.getItem("itemName");
            }
            if (newItemPrice === "") {
                newItemPrice = localStorage.getItem("itemPrice");

            }
            if (newItemDescription === "") {
                newItemDescription = localStorage.getItem("itemDescription");

            }
               
            
            myItemFirebaseSell.remove();
            myItemFirebaseSRQ.remove();
            
            var file = "";
            var postRef, categoryRef, entryKey;
            var post = {};
        var today = new Date();
        post.time = today.toJSON();
        if (file != "") {
            var imgLink = "";
            var storagelink = firebase.storage().ref('postImages/' + file.name);
            var uploadTask = storagelink.put(file);
            uploadTask.on('state_changed', function(snapshot){
            }, function(error) {
            }, function() {
                post.imageLink = uploadTask.snapshot.downloadURL;
                post.itemName = newItemPrice;
                post.itemPrice = newItemName;
                post.checked = false;
                if(document.getElementById('negotiableCheck').checked) {
                    post.checked = true;
                }
                post.itemDescription = newItemDescription;
                post.category = document.getElementById('newItemCategory').value;
                post.type = "SellRequest";
                post.userID = localStorage.getItem("userID");
                post.firstName = localStorage.getItem("firstName");
                post.lastName = localStorage.getItem("lastName");
                entryKey = post.itemName;
                console.log(post.itemName);
                firebase.database().ref('posts/SellRequests/' + entryKey).set(
                    post,
                    function (onComplete) {
                        firebase.database().ref('posts/Sell/' + post.category + '/' +  entryKey).set(
                            post,
                            function (onComplete) {
                                window.location.href = "Browse.html?";
                            }
                        );
                    }
                );
            });
        }
        else {
            post.imageLink = localStorage.getItem("imageLink");
            post.itemName = newItemName;
            post.itemPrice = newItemPrice;
            post.checked = false;
            if(document.getElementById('negotiableCheck').checked) {
                post.checked = true;
            }
            post.itemDescription = newItemDescription;
            post.category = document.getElementById('newItemCategory').value;
            post.type = "SellRequest";
            post.userID = localStorage.getItem("userID");
            post.firstName = localStorage.getItem("firstName");
            post.lastName = localStorage.getItem("lastName");
            entryKey = post.itemName;
            firebase.database().ref('posts/SellRequests/' + entryKey).set(
                post,
                function (onComplete) {
                    firebase.database().ref('posts/Sell/' + post.category + '/' +  entryKey).set(
                        post,
                        function (onComplete) {
                            window.location.href = "Browse.html?";
                        }
                    );
                }
            );
            
        }
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


        };
        $scope.updateBuyPost = function () {
            var e = window.event,
                btn = e.target || e.srcElement,
                itemID = btn.id,
                myItemRefBRQ = "https://free-and-for-sale-8f8a4.firebaseio.com/posts/BuyRequests/" + itemID,
                myItemRefBuy = "https://free-and-for-sale-8f8a4.firebaseio.com/posts/Buy/" + localStorage.getItem("category") + "/" + itemID,
                newItemName = document.getElementById('newItemName').value,
                newItemPrice = document.getElementById('newItemPrice').value,
                newItemDescription = document.getElementById('newItemDescription').value,
                myItemFirebaseBuy = new Firebase(myItemRefBuy),
                myItemFirebaseBRQ = new Firebase(myItemRefBRQ);
            
             if(itemID === ""){
                console.log("problem");
                return;
            }
            if (newItemName === "") {
                newItemName = localStorage.getItem("itemName");
            }
            if (newItemPrice === "") {
                newItemPrice = localStorage.getItem("itemPrice");

            }
            if (newItemDescription === "") {
                newItemDescription = localStorage.getItem("itemDescription");

            }

            
            myItemFirebaseBuy.remove();
            myItemFirebaseBRQ.remove();
            
        var file ="";
        var postRef, categoryRef, entryKey;
        var post = {};
        var today = new Date();
        post.time = today.toJSON();
        if (file != "") {
            var imgLink = "";
            var storagelink = firebase.storage().ref('postImages/' + file.name);
            var uploadTask = storagelink.put(file);
            uploadTask.on('state_changed', function(snapshot){
            }, function(error) {
            }, function() {
                post.imageLink = uploadTask.snapshot.downloadURL;
                post.itemName = newItemPrice;
                post.itemPrice = newItemName;
                post.checked = false;
                if(document.getElementById('negotiableCheck').checked) {
                    post.checked = true;
                }
                post.itemDescription = newItemDescription;
                post.category = document.getElementById('newItemCategory').value;
                post.type = "BuyRequest";
                post.userID = localStorage.getItem("userID");
                post.firstName = localStorage.getItem("firstName");
                post.lastName = localStorage.getItem("lastName");
                entryKey = post.itemName;
                console.log(post.itemName);
                firebase.database().ref('posts/BuyRequests/' + entryKey).set(
                    post,
                    function (onComplete) {
                        firebase.database().ref('posts/Buy/' + post.category + '/' +  entryKey).set(
                            post,
                            function (onComplete) {
                                window.location.href = "Browse.html?";
                            }
                        );
                    }
                );
            });
        }
        else {
            post.imageLink = localStorage.getItem("imageLink");
            post.itemName = newItemName;
            post.itemPrice = newItemPrice;
            post.checked = false;
            if(document.getElementById('negotiableCheck').checked) {
                post.checked = true;
            }
            post.itemDescription = newItemDescription;
            post.category = document.getElementById('newItemCategory').value;
            post.type = "BuyRequest";
            post.userID = localStorage.getItem("userID");
            post.firstName = localStorage.getItem("firstName");
            post.lastName = localStorage.getItem("lastName");
            entryKey = post.itemName;
            firebase.database().ref('posts/BuyRequests/' + entryKey).set(
                post,
                function (onComplete) {
                    firebase.database().ref('posts/Buy/' + post.category + '/' +  entryKey).set(
                        post,
                        function (onComplete) {
                            window.location.href = "Browse.html?";
                        }
                    );
                }
            );
            
        }
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


        };
    
    var fileButton = document.getElementById('fileButton');

    fileButton.addEventListener('change', function(e){
        console.log("HI");
        //Get File
        file = e.target.files[0];
    });
    });
