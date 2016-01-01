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


//Controller code for getting from Google Sheets
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
        // $scope.isbnToApp = content.gsx$_cn6ca.$t;
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
        			// console.log("response", response.data.docs[0]);
        			// console.log("response.data.docs[0].title", response.data.docs[0].title);
        			// console.log("response.data.docs[0].author", response.data.docs[0].author_name[0]);
        		
        			var authorSheet = response.data.docs[0].author_name[0];
					var titleSheet = response.data.docs[0].title;
					// var isbnSheet = response.data.docs[0].isbn;
					// var yearSheet = response.data.docs[0].year;
        			var bookToAddSheets = {
        				author: authorSheet,
        				title: titleSheet
        			}
        			firebaseBookArray.$add(bookToAddSheets);
                    // console.log("response", response.data.docs[0].title);
           });
    //             $scope.docs = booksToDom;
    //             $scope.isbn = "";
    	};
	};
}]);

