app.controller("myLibraryCtrl",
    ["$scope", "$http", "$firebaseArray", "$location", "$timeout",
    function($scope, $http, $firebaseArray, $location, $timeout) {

    var firebaseBook = new Firebase("https://library-of-paine.firebaseio.com/books/");
    var firebaseBookArray = $firebaseArray(firebaseBook);


    $scope.toOpenLibrary = function() {
            $location.path('/start').replace();
    };

    $scope.manualAdd = function(){
        $location.path('/additions').replace();
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

    $scope.removeBook = function(){
        console.log("removedoc", this.book);
        var i;
        for (i = 0; i < firebaseBookArray.length; i++){
            if (firebaseBookArray[i].title === this.book.titleString && this.book.authorString){
                firebaseBookArray.$remove(firebaseBookArray[i]);
            }
        };

    };
}]);