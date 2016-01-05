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
        console.log("Callbook", book);
        $location.path('/edit').replace();
    };

    $scope.searchMyLibrary = function(){
	    var myFullLibrary = [];

	    for (var i = 0; i < firebaseBookArray.length; i++){   

	   	// $scope.authors = authorString;
	   
	   	// console.log("authorString", authorString);
	   	// console.log("firebaseBookArray[i]", firebaseBookArray[i]);

                //   var ratesRef = firebaseBook;
                //   ratesRef.on('value', function (snapshot) {
                //     $timeout(function () {
                //       update(snapshot);
                      
                //   var snap = snapshot.val();
                //     	$scope.snap = book;
                //     });
                //   });

                // function update (snapshot) {
                //   var topObj = $scope.rate; 
                //   $scope.rate = snapshot.val();
       //          var library = [];


    			var book = {
    				author: $scope.authorString = firebaseBookArray[i].author,
	    			title: $scope.titleString = firebaseBookArray[i].title,
	    			// isbn: $scope.isbnString = firebaseBookArray[i].isbn,
	    			// year:  $scope.year = firebaseBookArray[i].year,
	    			comments: $scope.comments = firebaseBookArray[i].comments,
	    			location: $scope.location = firebaseBookArray[i].location,
	    			id: $scope.identify = firebaseBookArray[i].$id
    				}

    				// var authorString = firebaseBookArray[i].author,
    				// var titleString = firebaseBookArray[i].title,
    				// var comments = firebaseBookArray[i].comments,
    				// var location = firebaseBookArray[i].loc
    				// console.log("authorString", authorString);
        			myFullLibrary.push(book);
    				$scope.myFullLibrary = myFullLibrary;
    	}
		      //   	var base = firebaseBookArray[i];
		      //   		console.log("base", base);
	

    				// console.log("book", book);
			   		// library.push({book});
			   		// console.log("library", library);
    				// $scope.library = book;
    			// };	
	   		// $scope.arrayToString = function(string){
         	//	return string.join(", ");
    		// };
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
	$timeout($scope.searchMyLibrary)
/////////////////////////////////////

    $scope.removeBook = function(doc){
        var i;
        for (i = 0; i < firebaseBookArray.length; i++){
            if (firebaseBookArray[i].title === this.book.title){
           		if (firebaseBookArray[i].author === this.book.author){
                firebaseBookArray.$remove(firebaseBookArray[i]);
          //       //Immediately reload search after a removal.
        		$timeout($scope.searchMyLibrary)

            	}
        	}
        };
    }
}]);