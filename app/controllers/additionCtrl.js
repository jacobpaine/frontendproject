app.controller("additionCtrl",
    ["$scope", "$http", "$firebaseArray", "$location", "$timeout",
    function($scope, $http, $firebaseArray, $location, $timeout) {
    
    var firebaseBook = new Firebase("https://library-of-paine.firebaseio.com/books/");
    var firebaseBookArray = $firebaseArray(firebaseBook);

//Go search the Open Library for a title.
    $scope.toOpenLibrary = function() {
            $location.path('/start').replace();
    };

//Go to Private Library.
    $scope.toMyLibrary = function() {
        $location.path('/mylibrary').replace();
    };

//Manually add a book to the private Library
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


//Controller code for getting from Google Sheets
// Retrieve id (~7 digits e.g. ocwf700) from https://spreadsheets.google.com/feeds/worksheets/YOUR_SPREADSHEET_ID/private/full
    var url = 'https://spreadsheets.google.com/feeds/list/1U9JXkQ5ZDCXTTNvFZlcr9yc8-ehOc_PbF4o-b2IiEYg/ocwf700/public/values?alt=json'
    var parse = function(entry) {
      console.log(entry);
      
      var category = entry['gsx$_cn6ca']['$t'];
      return {
        category: category
      };
    }

    $http.get(url)
    .success(function(response) {
      var entries = response['feed']['entry'];
      $scope.parsedEntries = [];
      for (key in entries) {
        var content = entries[key];
        $scope.parsedEntries.push(content.gsx$_cn6ca.$t);
      }
    });

// Function that runs the google sheets JSON
    $scope.importJSON = function(json){
        var i;
        var booksToDom = [];
        //The response(json) parameter is held in the proofMe variable.
        //Looping over the length of proofMe to check every available title.
    	for (i = 0; i < json.length; i++){
    	//Using $http.get to grab information from Open Library
    		var searchUrl = 'http://openlibrary.org/search?q=' + json[i];
            $http.get(searchUrl)   
                .then(function (response) {        		
        			var authorSheet = response.data.docs[0].author_name[0];
					var titleSheet = response.data.docs[0].title;
        			var bookToAddSheets = {
        				author: authorSheet,
        				title: titleSheet
        			}
        			firebaseBookArray.$add(bookToAddSheets);
              $location.path('/mylibrary').replace();

           });

    	};
	};
}]);

