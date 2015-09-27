angular.module('starter').controller("TodoController", function($scope, $firebaseObject, $firebaseArray, $location ,$ionicPopup, $ionicListDelegate, $ionicModal) {
    $scope.item={};
    $scope.data={todos:[]};
    var toChangeTodo ={};
    

    $scope.list = function() {
        fbAuth = fb.getAuth();
        if(fbAuth) {
            $scope.data.todos = $firebaseArray(fbTodo);
        }
        else
            {
                $location.path('/login');
            }
    }
    
//    $scope.create = function() {
//        $ionicPopup.prompt({
//            title: 'Enter a new TODO item',
//            inputType: 'text'
//        })
//        .then(function(result) {
//            if(result !== "") {
//                $scope.data.todos.$add({title: result,
//                                 user:fb.getAuth().uid,
//                                 time:Firebase.ServerValue.TIMESTAMP,
//                                   completed:false,
//                                requested:false
//                                       });
//            } else {
//                console.log("Action not completed");
//            }
//        });
//    };
    
    
    $scope.addTodo = function (item){
        item.completed= false;
        item.requested = false;
        item.user =fb.getAuth().uid;
//           $scope.data.todos.$add({title: item.task,
//                                 user:fb.getAuth().uid,
//                                 ward:item.ward,
//                                   initial:item.initial,
//                                   surname:item.surname,
//                                   completed:false,
//                                requested:false
//                                       });
        console.log(item);

        $scope.data.todos.$add(item);
        $scope.closeModal();
        
    };
    
    $scope.logOut = function(){
        fb.unauth();
    };
    
    $scope.delete = function(todo){
        $scope.data.todos.$remove(todo);
    };
    
    $scope.requested = function(todo){
//        console.log(todo.requested);
        todo.requested = true;
//        console.log(todo);
        $scope.data.todos.$save(todo);
        $ionicListDelegate.closeOptionButtons();

    };
    
        // Create an Ionic modal instance for adding a new stock
      $ionicModal.fromTemplateUrl('templates/addModal.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });
      // Open the modal
      $scope.openModal = function() {
        $scope.modal.show();
      };
      // Close the modal and reset the model
      $scope.closeModal = function() {
        $scope.item = {};
        $scope.modal.hide();
      };
      // Ensure the modal is completely destroyed after the scope is destroyed
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });

});