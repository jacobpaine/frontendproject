//The common controller: For the People.
app.controller("EditController",
	["$q", "$scope", "$rootScope", "$firebaseArray", "Auth", "$location", "EditFactory", "$firebaseObject",
	function($Q, $scope, $rootScope, $firebaseArray, Auth, $location, EditFactory, $firebaseObject) {

  var imageEdit = new Firebase("https://front-end-data.firebaseio.com/shows/");
  var materialToUse = $firebaseArray(imageEdit);

  console.log("currentShowArray", currentShowArray);
//Hard-coded in. Must needs be changing.
  materialToUse.$loaded(
    function(data) {
      console.log("data", data);
      var one = data[0].img[1];
      $scope.img1 = one;
      return data;
    }).then(function(data2) {
      console.log("data2", data2);
      var two = data2[0].img[2]
      $scope.img2 = two;
      return data2;
    }).then(function(data3) {
      console.log("data3", data3);
      var three = data3[0].img[3]
      $scope.img3 = three;
      return data3;
    }).then(function(data4) {
      console.log("data4", data4);
      var four = data4[0].img[4]
      $scope.img4 = four;
      return data4;
    }).then(function(data5) {
      console.log("data5", data5);
      var five = data5[0].img[5]
      $scope.img5 = five;
      return data5;
    });
  

// Log Out Functionality
  $scope.logOut = function() {
    Auth.useAuth().$unauth();
    $scope.authData = null; 
    $scope.user={};
    $location.path('/login').replace();
  };

// Back to Main Board
  $scope.backToMain = function() {
    $location.path('/common').replace();
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

  $scope.editImage2 = function() {
      var ImageEdit2 = new Firebase("https://front-end-data.firebaseio.com/shows/" + currentShowArray[0].$id +"/img/");
      console.log("ImageEdit2", ImageEdit2);
      var urlObject2 = {
        2: $scope.imgUrl2
      };
      ImageEdit2.update(urlObject2);
      //Clears the input boxes on add.
      $scope.img2 = $scope.imgUrl2;
      $scope.imgUrl2 = "";
  };

  $scope.editImage3 = function() {
      var ImageEdit3 = new Firebase("https://front-end-data.firebaseio.com/shows/" + currentShowArray[0].$id +"/img/");
      var urlObject3 = {
        3: $scope.imgUrl3
      };
      ImageEdit3.update(urlObject3);
      //Clears the input boxes on add.
      $scope.img3 = $scope.imgUrl3;
      $scope.imgUrl3 = "";
  };

  $scope.editImage4 = function() {
      var ImageEdit4 = new Firebase("https://front-end-data.firebaseio.com/shows/" + currentShowArray[0].$id +"/img/");
      var urlObject4 = {
        4: $scope.imgUrl4
      };
      ImageEdit4.update(urlObject4);
      //Clears the input boxes on add.
      $scope.img4 = $scope.imgUrl4;
      $scope.imgUrl4 = "";
  };

  $scope.editImage5 = function() {
      var ImageEdit5 = new Firebase("https://front-end-data.firebaseio.com/shows/" + currentShowArray[0].$id +"/img/");
      var urlObject5 = {
        5: $scope.imgUrl5
      };
      ImageEdit5.update(urlObject5);
      //Clears the input boxes on add.
      $scope.img5 = $scope.imgUrl5;
      $scope.imgUrl5 = "";
  };

    // Just in case someone's trying to sneak in. We check if they have loggedIn. Send'em back to log in.
    if ($rootScope.loggedIn !== true) {
      $location.path('/login').replace();
    }

}]);

