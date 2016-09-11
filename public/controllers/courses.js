
'use strict';
var myApp = angular.module('myApp');

myApp.controller('CoursesController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    console.log('CoursesController loaded...');

    $scope.getCourses = function(){
        $http.get('/api/v1/courses').success(function(response){
            $scope.courses = response;
        });
    }

    $scope.getCourse = function(){
        var id = $routeParams.id;
        $http.get('/api/v1/courses/'+id).success(function(response){
            $scope.course = response;
        });
    }

    $scope.addCourse = function(){
        console.log($scope.book);
        $http.post('/api/v1/courses/', $scope.course).success(function(response){
            window.location.href='#/courses';
        });
    }

    $scope.updateCourse = function(){
        var id = $routeParams.id;
        $http.put('/api/v1/courses/'+id, $scope.course).success(function(response){
            window.location.href='#/courses';
        });
    }

    $scope.removeCourse = function(id){
        $http.delete('/api/v1/courses/'+id).success(function(response){
            window.location.href='#/courses';
        });
    }
}]);
