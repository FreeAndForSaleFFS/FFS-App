/*global angular*/
var cmsApp = angular.module('ngTeam', ['ui.bootstrap']);

cmsApp.filter('asArray', function() {
  return function(obj /*, addKey*/ ) {
    // in case of undefined just return the same object to pass through
    if (!obj) return obj;
    // return an object maped as array of key as an item
    return Object.keys(obj).map(function(key) {
      return obj[key];
    });
  };
});