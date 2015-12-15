//The common controller: For the People.
app.controller("EditController",
	["$q", "$scope", "$rootScope", "$firebaseArray", "Auth", "$location",
	function($Q, $scope, $rootScope, $firebaseArray, Auth, $location) {

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

  $scope.editImage1 = function() {
      var ImageEdit1 = new Firebase("https://front-end-data.firebaseio.com/shows/" + currentShow.$id +"/img/");
      var urlObject1 = {
        1: $scope.imgUrl1
      };
      ImageEdit1.update(urlObject1);
      //Clears the input boxes on add.
      $scope.img1 = $scope.imgUrl1;
      $scope.imgUrl1 = "";
  };

  $scope.editImage2 = function() {
      var ImageEdit2 = new Firebase("https://front-end-data.firebaseio.com/shows/" + currentShow.$id +"/img/");
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
      var ImageEdit3 = new Firebase("https://front-end-data.firebaseio.com/shows/" + currentShow.$id +"/img/");
      var urlObject3 = {
        3: $scope.imgUrl3
      };
      ImageEdit3.update(urlObject3);
      //Clears the input boxes on add.
      $scope.img3 = $scope.imgUrl3;
      $scope.imgUrl3 = "";
  };

  $scope.editImage4 = function() {
      var ImageEdit4 = new Firebase("https://front-end-data.firebaseio.com/shows/" + currentShow.$id +"/img/");
      var urlObject4 = {
        4: $scope.imgUrl4
      };
      ImageEdit4.update(urlObject4);
      //Clears the input boxes on add.
      $scope.img4 = $scope.imgUrl4;
      $scope.imgUrl4 = "";
  };

  $scope.editImage5 = function() {
      var ImageEdit5 = new Firebase("https://front-end-data.firebaseio.com/shows/" + currentShow.$id +"/img/");
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

    for (var i in currentShowArray[0].comments){
        $scope.comments = currentShowArray[0].comments[i]; 
    }

     for (var i in currentShowArray[0].reflections){
        $scope.comments = currentShowArray[0].reflections[i];   
    }

    for (var i in currentShowArray[0].img){
        $scope.img = currentShowArray[0].img[i];   
    }

    for (var i in currentShowArray[0].text){
        $scope.text = currentShowArray[0].text[i];   
    }

    for (var i in currentShowArray[0].$id){
        $scope.id = currentShowArray[0].$id[i];   
    }
    
    for (var i in currentShowArray[0].timer){
        $scope.timer = currentShowArray[0].timer[i];   
    }

}]);



  //   $scope.loginUser = function() {
  //     console.log("Login clicked");
  //     $scope.message = null;
  //     $scope.error = null;

  //     Auth.useAuth().$authWithPassword({
  //       email: $scope.user.email,
  //       password: $scope.user.password
  //     }).then(function(userData) {
  //       $scope.message = "User logged in with uid: " + userData.uid;
  //       Auth.logUs(true);
  //       Auth.setUid(userData.uid);
  //     })
  //     .then(function() {
  //     $rootScope.loggedIn = true;
  //     $location.path('/common').replace();
  //     })
 
  //     .catch(function(error) {
  //     console.log("Error in the addRef:", error);
  //     });
  // };

  //   $scope.editShow = function() {
  //       Load the data
  //       Load a page that brings up the data from the view button clicked.
  //       this.data populated to a page
  //       then
  //       view that page
  //     console.log("Edit clicked");
  //     $location.path('/common').replace();

  // };

