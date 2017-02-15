angular.module('home', ['ui.bootstrap','ngRoute','ngAnimate']);

angular.module('home').config(function($routeProvider) {
    $routeProvider.when("/home", {
            templateUrl : "home/partial/dataMap/dataMap.html"
    });
});

