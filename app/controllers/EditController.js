//The common controller: For the People.
app.controller("EditController",
	["$q", "$scope", "$rootScope", "$firebaseArray", "Auth", "$location", "FirebaseFactory", "$firebaseObject",
	function($Q, $scope, $rootScope, $firebaseArray, Auth, $location, FirebaseFactory, $firebaseObject) {

  var imageEdit = new Firebase("https://front-end-data.firebaseio.com/shows/");
  var materialToUse = $firebaseArray(imageEdit);


// Log Out Functionality
  $scope.logOut = function() {
    Auth.useAuth().$unauth();
    $scope.authData = null; 
    $scope.user={};
    $location.path('/login').replace();
  };


  // $scope.img1 = materialToUse[5];
  $scope.editImage1 = function() {
      var ImageEdit1 = new Firebase("https://front-end-data.firebaseio.com/shows/" + currentShowArray[0].$id +"/img/");
      ImageEdit1 = $firebaseObject(ImageEdit1);
      console.log("ImageEdit1ONE", ImageEdit1);
      console.log("$scope.imgUrl1", $scope.imgUrl1);

      ImageEdit1.update($scope.imgUrl1)

      //Clears the input boxes on add.
      $scope.img1 = $scope.imgUrl1;
      $scope.imgUrl1 = "";
  };


}]);

