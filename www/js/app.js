// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','firebase']);
var fb = null;

angular.module('starter').run(function($ionicPlatform, $firebaseAuth, $firebaseObject, $rootScope,$location) {
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
fbAdmin = new Firebase("https://luminous-heat-2144.firebaseio.com/admin");
      
      
$firebaseAuth(fb).$onAuth(function (authData) {
        if (authData) {
            $rootScope.user= authData.password.email;
            $rootScope.myUsername=authData.password.email.split('@')[0];
            var obj=  $firebaseObject(fbAdmin);
            obj.$loaded().then(function(){
                console.log("Administrator= " +obj.$value);
                $rootScope.admin = obj.$value;
            })
           
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
    .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'LoginController'
    })
    .state('todo', {
        url: '/todo',
        templateUrl: 'templates/todo.html',
        controller: 'TodoController'
    });
    $urlRouterProvider.otherwise('/login');
});



