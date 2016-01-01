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
	        	var proofString = firebaseBookArray[i];
	   			
	   			var titleString = firebaseBookArray[i].title;
	   			var authorString = JSON.stringify(firebaseBookArray[i].author);
				authorString = authorString.replace(/[^.?!()&a-zA-Z0-9 ]/g, "");
	        	myFullLibrary.push({authorString, titleString});
        };

    	$scope.fullLibrary = myFullLibrary;

    	};
    }]);


 // for (i = 0; i < proofMe.length; i++){

 //                //Only strings can use the replace method. Stringify!
 //                var authorString = JSON.stringify(proofMe[i]["author_name"]);

 //                //Get rid of special symbols etc. Use replace and regular expressions. 
 //                //Note to self: Learn more RegEx.
 //                authorString = authorString.replace(/[^.?!()&a-zA-Z0-9 ]/g, "");

 //                //The information for each individual book is held in bookToDom obj.
 //                var bookToDom = {    
 //                    author: authorString,
 //                    // isbn: proofMe[i]["isbn"],
 //                    // publish_year: doc.publish_year,
 //                    title: proofMe[i]["title"]
 //                };
 //                booksToDom.push(bookToDom);
 //           };
 //                $scope.docs = booksToDom;
 //                $scope.author = "";
 //        });
 //    },