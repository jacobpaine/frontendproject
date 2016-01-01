app.controller("additionCtrl",
    ["$scope", "$http", "$firebaseArray", "$location", "$timeout",
    function($scope, $http, $firebaseArray, $location, $timeout) {
    
    var firebaseBook = new Firebase("https://library-of-paine.firebaseio.com/books/");
    var firebaseBookArray = $firebaseArray(firebaseBook);

    $scope.toOpenLibrary = function() {
            $location.path('/start').replace();
    };

    $scope.toMyLibrary = function() {
        $location.path('/mylibrary').replace();
    };


    $scope.addManual = function(doc){
		var authorMan = $scope.author;
		var titleMan = $scope.title;
		var isbnMan = $scope.isbn;
		var yearMan = $scope.year;
		var locationMan = $scope.location; 
        var bookToAddMan = {    
          author: authorMan,
          title: titleMan,
          isbn: isbnMan,
          year: yearMan,
          location: locationMan
        };
        console.log("bookToAddMan", bookToAddMan);
        firebaseBookArray.$add(bookToAddMan);
    };






}]);