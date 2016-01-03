app.controller("bookEditCtrl",
    ["$scope", "$http", "$firebaseArray", "$location", "editFactory", "$firebaseObject", "$timeout",
    function($scope, $http, $firebaseArray, $location, editFactory, $firebaseObject, $timeout) {

    var firebaseBook = new Firebase("https://library-of-paine.firebaseio.com/books/");
    var firebaseBookArray = $firebaseArray(firebaseBook);
	// var firebaseIsbn = new Firebase("https://library-of-paine.firebaseio.com/books/" + name of book + "isbn");

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

			//Let's make sure this is the right book.
            for (i = 0; i < firebaseBookArray.length; i++){
console.log("firebaseBookArray[i].author", firebaseBookArray[i].author);
console.log("thisBook.authorString", thisBook.authorString);

            if (firebaseBookArray[i].author ===  thisBook.authorString){
            	if (firebaseBookArray[i].title === thisBook.titleString){

	                //Let's define variables for object binding.
					var arrayId = firebaseBookArray[i].$id;
					var firebaseAuthor = new Firebase("https://library-of-paine.firebaseio.com/books/" + arrayId); 
					var firebaseTitle = new Firebase("https://library-of-paine.firebaseio.com/books/" + arrayId); 
					var firebaseIsbn = new Firebase("https://library-of-paine.firebaseio.com/books/" + arrayId + "/isbn/"); 
					var firebaseComments = new Firebase("https://library-of-paine.firebaseio.com/books/" + arrayId + "/comments/"); 

					var objIsbn = $firebaseObject(firebaseIsbn);
					var objComments = $firebaseObject(firebaseComments);

					// Three-way data binding!!! Author
					objComments.$bindTo($scope, "author").then(function() {
					  console.log("what was there", $scope.author); 
					  firebaseAuthor.set({ Author: $scope.editBook.authorString }); 
					});

					// Three-way data binding!!! Title
					objComments.$bindTo($scope, "title").then(function() {
					  console.log("what was there", $scope.title); 
					  firebaseTitle.set({ Title: $scope.editBook.titleString }); 
					});

					// Three-way data binding!!! ISBN
					objIsbn.$bindTo($scope, "isbn").then(function() {
					  console.log("what was there", $scope.isbn); 
					  firebaseIsbn.set({ ISBN: $scope.editBook.isbn }); 
					});

					// Three-way data binding!!! Comments
					objComments.$bindTo($scope, "comments").then(function() {
					  console.log("what was there", $scope.comments); 
					  firebaseComments.set({ Comments: $scope.editBook.comments }); 
					});


            	}	
            $location.path('/mylibrary').replace();
            // $timeout($scope.searchMyLibrary)
            }	
    	};


    };


}]);

