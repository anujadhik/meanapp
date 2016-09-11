
var app = angular.module('myApp',['ngRoute']);

app.config(function($routeProvider,$locationProvider){
    $routeProvider.when('/', {
        controller:'CoursesController',
        templateUrl: '/views/courses.html'

    })
        .when('/courses', {
            controller:'CoursesController',
            templateUrl: 'views/courses.html'
        })
        .when('/courses/details/:id',{
            controller:'CoursesController',
            templateUrl: 'views/details.html'
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
});

