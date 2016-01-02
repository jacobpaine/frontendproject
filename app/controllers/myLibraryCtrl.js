app.controller("myLibraryCtrl",
    ["$scope", "$http", "$firebaseArray", "$location", "$timeout", "editFactory",
    function($scope, $http, $firebaseArray, $location, $timeout, editFactory) {
    var firebaseBook = new Firebase("https://library-of-paine.firebaseio.com/books/");
    var firebaseBookArray = $firebaseArray(firebaseBook);


    $scope.toOpenLibrary = function() {
        $location.path('/start').replace();
    };

    $scope.manualAdd = function(){
        $location.path('/additions').replace();
    };

    $scope.goToEdit = function(book){
        editFactory.setBook(book);
        $location.path('/edit').replace();
    };

    $scope.searchMyLibrary = function(doc){
    	var myFullLibrary = [];
	        for (i = 0; i < firebaseBookArray.length; i++){
	   			var authorString = JSON.stringify(firebaseBookArray[i].author);
	   			var titleString = firebaseBookArray[i].title;
	        	var isbn = JSON.stringify(firebaseBookArray[i].isbn);
	        	var year = JSON.stringify(firebaseBookArray[i].year);
	        	var comments = firebaseBookArray[i].comments;

	        	console.log("firebaseBookArray", firebaseBookArray);
				
				// isbn = isbn.replace(/[^.?!()&a-zA-Z0-9 ]/g, "");
				authorString = authorString.replace(/[^.?!()&a-zA-Z0-9 ]/g, "");
				isbn = isbn.replace(/[^,.?!()&a-zA-Z0-9 ]/g, "");
				year = year.replace(/[^,.?!()&a-zA-Z0-9 ]/g, "");


	        	myFullLibrary.push({authorString, titleString, isbn, year, comments});
        	};
    	$scope.fullLibrary = myFullLibrary;
    	};

// Fire searchMyLibrary on page load.
	$timeout($scope.searchMyLibrary)
/////////////////////////////////////

    $scope.removeBook = function(){
        console.log("removedoc", this.book);
        var i;
        for (i = 0; i < firebaseBookArray.length; i++){
            if (firebaseBookArray[i].title === this.book.titleString && this.book.authorString){
                firebaseBookArray.$remove(firebaseBookArray[i]);
                //Immediately reload search after a removal.
        		$timeout($scope.searchMyLibrary)

            }

        };
    };
}]);