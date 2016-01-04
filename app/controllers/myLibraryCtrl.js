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

    $scope.searchMyLibrary = function(){
    	var myFullLibrary = [];

	    for (var i = 0; i < firebaseBookArray.length; i++){   
	   	var authorString = firebaseBookArray[i].author;
	   	console.log("authorString!!!", authorString);


		angular.forEach(authorString, function(value, key) {
			console.log("authorString.value", value);
	    $scope.author = value;


		});

    			var book = {
	    			// title: $scope.titleString = firebaseBookArray[i].title,
	    			// // isbn: $scope.isbnString = firebaseBookArray[i].isbn
	    			// year:  $scope.year = firebaseBookArray[i].year,
	    			// comments: $scope.comments = firebaseBookArray[i].comments,
	    			// location: $scope.location = firebaseBookArray[i].location
    				}

	   			$scope.book = book;
    			};	
	   		$scope.arrayToString = function(string){
        		return string.join(", ");
    		};
	   		}
				// authorString = authorString.replace(/[^.?!()&a-zA-Z0-9 ]/g, "");

				// console.log("authorString", authorString);
	   // 			var titleString = firebaseBookArray[i].title;
	   // 			for(var c in titleString){
				// 	titleString = titleString[c];
				// };	

	   //      	var isbn = JSON.stringify(firebaseBookArray[i].isbn);
	   //      	isbn = isbn.replace("[", "").replace(/\"/g, "").replace("]", "");
	   //      	isbn = isbn.replace(/,/g, ', ');
				// // isbn = isbn.replace(/[^.?!()&a-zA-Z0-9 ]/g, "");
	        	
	   //      	var year = firebaseBookArray[i].year[0];

				// var comments = firebaseBookArray[i].comments;	
	   //      	for(var a in comments){
				// 	comments = comments[a];
				// };				

	   //      	var loc = firebaseBookArray[i].loc;
	   //      	for(var b in loc){
				// 	loc =loc[b];
				// };
			
				
	   //      	myFullLibrary.push({authorString, titleString, isbn, year, comments, loc});
        
    	// $scope.fullLibrary = myFullLibrary
    	

// Fire searchMyLibrary on page load.
	// $timeout($scope.searchMyLibrary)
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