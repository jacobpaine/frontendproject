app.controller("bookEditCtrl",
    ["$scope", "$http", "$firebaseArray", "$location", "editFactory", "$firebaseObject", "$timeout",
    function($scope, $http, $firebaseArray, $location, editFactory, $firebaseObject, $timeout) {

    var firebaseBook = new Firebase("https://library-of-paine.firebaseio.com/books/");
    var firebaseBookArray = $firebaseArray(firebaseBook);
	// var firebaseIsbn = new Firebase("https://library-of-paine.firebaseio.com/books/" + name of book + "isbn");


    $scope.getBook = function(book){
        editFactory.getBook(book);
    };
    var book = editFactory.getBook()
    $scope.book = book;
   	console.log("book", book);
    $scope.toOpenLibrary = function() {
        $location.path('/start').replace();
    };

    $scope.toMyLibrary = function() {
        $location.path('/mylibrary').replace();
    };


    $scope.updateBook = function(thisBook) {
    	var authorToChange = thisBook.author;
		var titleToChange = thisBook.title;
		var commentsToChange = thisBook.comments;




    	// console.log("thisBook.author", thisBook.author);
    	// console.log("thisBook.title", thisBook.title);
    	// console.log("thisBook.comments", thisBook.comments);
			//Let's make sure this is the right book.




            for (i = 0; i < firebaseBookArray.length; i++){
		
		console.log("thisBook", thisBook);
		console.log("thisBook.id", thisBook.id);
		console.log("firebaseBookArray[i].$id", firebaseBookArray[i].$id.parent);



            	// console.log("this", this);
            	// console.log("thisother", this.__proto__.authorString);
                //Let's define variables for object binding.
				var arrayId = firebaseBookArray[i].$id;
				var someBook = new Firebase("https://library-of-paine.firebaseio.com/books/");
				
				var firebaseAuthor = new Firebase("https://library-of-paine.firebaseio.com/books/" + arrayId +"/author/"); 
				var firebaseTitle = new Firebase("https://library-of-paine.firebaseio.com/books/" + arrayId + "/title/"); 
				// var firebaseIsbn = new Firebase("https://library-of-paine.firebaseio.com/books/" + arrayId + "/isbn/"); 
				// var firebaseYear = new Firebase("https://library-of-paine.firebaseio.com/books/" + arrayId + "/year/"); 
				var firebaseComments = new Firebase("https://library-of-paine.firebaseio.com/books/" + arrayId + "/comments/"); 
				var firebaseLoc = new Firebase("https://library-of-paine.firebaseio.com/books/" + arrayId + "/location/"); 
            	
				var someBookFireObj = $firebaseObject(someBook);
				var objAuthor = $firebaseObject(firebaseAuthor);
				var objTitle = $firebaseObject(firebaseTitle);
				// var objIsbn = $firebaseObject(firebaseIsbn);
				// var objYear = $firebaseObject(firebaseYear);
				var objComments = $firebaseObject(firebaseComments);
				var objLoc = $firebaseObject(firebaseLoc);


					var ref = firebaseAuthor; // assume value here is { foo: "bar" }
					var obj = $firebaseObject(ref);

    			// someBookFireObj.$loaded().then(function() {
			    // 	angular.forEach(someBookFireObj, function(value, key) {
			 //    console.log("book.author", book.author);
				// console.log("firebaseBookArray[i].author", firebaseBookArray[i].author);
			    	// console.log("firebaseBookArray[i].author", firebaseBookArray[i].author);
		    		
			    	//Match up author and title of Firebase AND the book you're about to change. 
			    	// console.log("firebaseBookArray[i].author.author", firebaseBookArray[i].author.author);
		    	// 	if (firebaseBookArray[i] = book){


            	if (thisBook.id === firebaseBookArray[i].$id){
								firebaseAuthor.set({ author: $scope.editBook.authorString });
							  	firebaseTitle.set({ title: $scope.editBook.titleString }); 
								firebaseComments.set({ comments: $scope.editBook.comments }); 
								firebaseLoc.set({ location: $scope.editBook.loc });
							// obj.$bindTo($scope, "author").then(function() {
							// 	$scope.editBook.authorString = "baz"; 
							// });

							// obj.$bindTo($scope, "title").then(function() {
							//   	$scope.editBook.titleString = "baz";
							// });

							// obj.$bindTo($scope, "comments").then(function() {
							// 	$scope.editBook.comments = "baz";
							// });

            	}




							// objLoc.$bindTo($scope, "loc").then(function() {
							//   firebaseLoc.set({ loc: $scope.editBook.location }); 
							// });

		    			
		    		// }
		    		// for (firebaseBookArray[i].author in book.author){
		    		// 	console.log("title clear");
		    		// }

		    	}	
            $location.path('/mylibrary').replace();
            $timeout($scope.searchMyLibrary)
		    }
							
					// 		objAuthor.$bindTo($scope, "title").then(function() {
					// 		  firebaseAuthor.set({ Title: $scope.editBook.authorString }); 
					// 		});

					// 		objTitle.$bindTo($scope, "title").then(function() {
					// 		  firebaseTitle.set({ Title: $scope.editBook.titleString }); 
					// 		});

					// 	}
					// };
				
			
}]);
//     	}
//     }



					//In order to get the value from the Firebase Object, you have to load it first.
			        // console.log("I am the random book key fro FB", key);
    			// someBookFireObj.$loaded().then(function() {
			    // 	angular.forEach(someBookFireObj, function(value, key) {
			    // 		if (value.author[0] === thisBook.authorString){
			    // 			if (value.title['title'] === thisBook.titleString){

							// 	// Three-way data binding!!! Author
							// 	objAuthor.$bindTo($scope, "authorString").then(function() {
							// 	  firebaseAuthor.$set({ Author: $scope.editBook.authorString });
							// 	});
			    // 			};
			    // 		};
			    // 	});
			    // });


    // 			someBookFireObj.$loaded().then(function() {
			    	// angular.forEach(someBookFireObj, function(value, key) {
			    	// 	if (value.author[0] === thisBook.authorString){
			    	// 		if (value.title['title'] === thisBook.titleString){

				// 				// // Three-way data binding!!! Title
				// 				objTitle.$bindTo($scope, "title").then(function() {
				// 				  firebaseTitle.set({ Title: $scope.editBook.titleString }); 
				// 				});

				// 				// // Three-way data binding!!! ISBN
				// 				objIsbn.$bindTo($scope, "isbn").then(function() {
				// 				  firebaseIsbn.set({ ISBN: $scope.editBook.isbn }); 
				// 				});

				// 				// // Three-way data binding!!! Year
				// 				objYear.$bindTo($scope, "year").then(function() {
				// 				  firebaseYear.set({ Year: $scope.editBook.year }); 
				// 				});

				// 				// // Three-way data binding!!! Comments
				// 				objComments.$bindTo($scope, "comments").then(function() {
				// 				  firebaseComments.set({ Comments: $scope.editBook.comments }); 
				// 				});

				// 				// // Three-way data binding!!! Comments
				// 				objLoc.$bindTo($scope, "loc").then(function() {
				// 				  firebaseLoc.set({ Comments: $scope.editBook.loc }); 
				// 				});
			 //    			};
			 //    		};
			 //       });
				// });			     
            // })	//End update command.	


