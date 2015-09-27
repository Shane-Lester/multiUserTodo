// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','firebase']);
var fb = null;

angular.module('starter').run(function($ionicPlatform, $firebaseAuth, $rootScope,$location) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
fb = new Firebase("https://luminous-heat-2144.firebaseio.com/");
fbTodo = new Firebase("https://luminous-heat-2144.firebaseio.com/Todos");
      
$firebaseAuth(fb).$onAuth(function (authData) {
        if (authData) {
            $rootScope.myUsername=authData.password.email.split('@')[0];
            console.log("Logged in as:", $rootScope.myUsername);
            $location.path('/todo');
            
                } 
            else {
            console.log("Logged out");
            $rootScope.myUsername="";
            $location.path('/login');
                }
            });
  });
});

angular.module('starter').config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
    })
    .state('todo', {
        url: '/todo',
        templateUrl: 'templates/todo.html',
        controller: 'TodoController'
    });
    $urlRouterProvider.otherwise('/login');
});



