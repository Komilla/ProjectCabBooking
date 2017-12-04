// myangu.controller('homeController', function($scope, $http)
// {
// .module('myApp')

myangu.directive('navbar', () => ({
// angular.module('buggyApp').directive('navbar', () => ({
    templateUrl: './views/navbar.html',
    restrict: 'AEC',
    controller: 'navbarController',
    controllerAs: 'nav'
}));
