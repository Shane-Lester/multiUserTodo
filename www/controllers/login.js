angular.module('starter').controller("LoginController", function($scope, $firebaseAuth, $location, $ionicPopup) {
 
    $scope.login = function(username, password) {
        var fbAuth = $firebaseAuth(fb);
        fbAuth.$authWithPassword({
            email: username,
            password: password
        }).then(function(authData) {
            $location.path("/todo");
        }).catch(function(error) {
            console.error("ERROR: " + error);
            $scope.popUp(error);
        });
    }
 
    $scope.register = function(username, password) {
        var fbAuth = $firebaseAuth(fb);
        fbAuth.$createUser({email: username, password: password})
            .then(function(authData) {
            $location.path("/todo");
        }).catch(function(error) {
            console.error("ERROR " + error);
        });
    };
    

    
    $scope.popUp = function(error) {
        $scope.error = error;
        
    var myPopUp =$ionicPopup.alert({
        title:"Error",
        subTitle: $scope.error
    });
    };

 
});