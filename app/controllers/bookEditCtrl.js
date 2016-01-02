app.controller("bookEditCtrl",
    ["$scope", "$http", "$firebaseArray", "$location", "editFactory",
    function($scope, $http, $firebaseArray, $location, editFactory) {

    var firebaseBook = new Firebase("https://library-of-paine.firebaseio.com/books/");
    var firebaseBookArray = $firebaseArray(firebaseBook);

	var book = currentBook;
    $scope.book = book;
    
    $scope.getBook = function(thing){
        editFactory.getBook();
    };

    $scope.toOpenLibrary = function() {
        $location.path('/start').replace();
    };

    $scope.toMyLibrary = function() {
        $location.path('/mylibrary').replace();
    };

    $scope.updateBook = function(thisBook) {
    	console.log("thisBook", thisBook);
    	var editBook = {
    		author: $scope.editBook.authorString,
    		title: $scope.editBook.titleString,
    		isbn: $scope.editBook.isbn,
    		comments: $scope.editBook.comments
    	}
            for (i = 0; i < firebaseBookArray.length; i++){
            if (firebaseBookArray[i].author ===  thisBook.authorString){
                if (firebaseBookArray[i].title === thisBook.titleString){
	                firebaseBookArray.$remove(firebaseBookArray[i]);
	                firebaseBookArray.$add(editBook);
        			$location.path('/mylibrary').replace();
                }
            }	
    	};
    };


}]);

