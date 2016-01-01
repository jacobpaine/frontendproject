app.controller("myLibraryCtrl",
    ["$scope", "$http", "$firebaseArray", "$location", "$timeout",
    function($scope, $http, $firebaseArray, $location, $timeout) {

    var firebaseBook = new Firebase("https://library-of-paine.firebaseio.com/books/");
    var firebaseBookArray = $firebaseArray(firebaseBook);


    $scope.toOpenLibrary = function() {
            $location.path('/start').replace();
    };



    $scope.searchMyLibrary_title = function(doc){
    	    var myFullLibrary = [];
	        for (i = 0; i < firebaseBookArray.length; i++){
	        	myFullLibrary.push(firebaseBookArray[i]);
        };
    $scope.fullLibrary = myFullLibrary;





    // var searchUrl = 'http://openlibrary.org/search?q=' + $scope.isbn;
    //     $http.get(searchUrl)   
    //         .then(function (response) {
    //             console.log("response", response);
    //         $scope.docs = response.data.docs
    //         $scope.isbn = "";
    //     });


    };







    }]);
