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
                //Let's define variables for object binding.
				var arrayId = firebaseBookArray[i].$id;
				
				var someBook = new Firebase("https://library-of-paine.firebaseio.com/books/");
				
				var firebaseAuthor = new Firebase("https://library-of-paine.firebaseio.com/books/" + arrayId +"/author/"); 
				// var firebaseTitle = new Firebase("https://library-of-paine.firebaseio.com/books/" + arrayId + "/title/"); 
				// var firebaseIsbn = new Firebase("https://library-of-paine.firebaseio.com/books/" + arrayId + "/isbn/"); 
				// var firebaseYear = new Firebase("https://library-of-paine.firebaseio.com/books/" + arrayId + "/year/"); 
				// var firebaseComments = new Firebase("https://library-of-paine.firebaseio.com/books/" + arrayId + "/comments/"); 
				// var firebaseLoc = new Firebase("https://library-of-paine.firebaseio.com/books/" + arrayId + "/loc/"); 
            	
				var someBookFireObj = $firebaseObject(someBook);

				var objAuthor = $firebaseObject(firebaseAuthor);
				// var objTitle = $firebaseObject(firebaseTitle);
				// var objIsbn = $firebaseObject(firebaseIsbn);
				// var objYear = $firebaseObject(firebaseYear);
				// var objComments = $firebaseObject(firebaseComments);
				// var objLoc = $firebaseObject(firebaseLoc);


					var ref = firebaseAuthor; // assume value here is { foo: "bar" }
					var obj = $firebaseObject(ref);

    			someBookFireObj.$loaded().then(function() {
			    	angular.forEach(someBookFireObj, function(value, key) {
		    		if (value.author[0] === thisBook.authorString){
		    			if (value.title['title'] === thisBook.titleString){
		    				console.log("value", value);
		    				console.log("key", key);
							// obj.$bindTo($scope, "data").then(function() {
							//   console.log($scope.data); // { foo: "bar" }
							//   $scope.data.foo = "b";  // will be saved to the database
							//   ref.set({ Author: "b" });  // this would update the database and $scope.data
							// });
						}
					};
				});
			});
    	}
    }
}]);



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
			 //    	angular.forEach(someBookFireObj, function(value, key) {
			 //    		if (value.author[0] === thisBook.authorString){
			 //    			if (value.title['title'] === thisBook.titleString){

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
            // $location.path('/mylibrary').replace();
            // $timeout($scope.searchMyLibrary)


