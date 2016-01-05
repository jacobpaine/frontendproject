app.controller("additionCtrl",
    ["$scope", "$http", "$firebaseArray", "$location", "$timeout", "$firebaseObject",
    function($scope, $http, $firebaseArray, $location, $timeout, $firebaseObject) {
    
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
		// var isbnMan = $scope.isbn;
		// var yearMan = $scope.year;
    var commentsMan = $scope.comments;
		var locMan = $scope.loc;

        var bookToAddMan = {    
          "author": {"author": authorMan},
          "title": {"title": titleMan},
          // "isbn": {"isbn": isbnMan},
          // "year": {"year": yearMan},
          "comments": {"comments": commentsMan},
          "location": {"location": locMan}

          };

        console.log("bookToAddMan", bookToAddMan);
        firebaseBookArray.$add(bookToAddMan);
        $location.path('/mylibrary').replace();
    };


//Controller code for getting from Google Sheets
// Retrieve id (~7 digits e.g. ocwf700) from https://spreadsheets.google.com/feeds/worksheets/YOUR_SPREADSHEET_ID/private/full
    var url = 'https://spreadsheets.google.com/feeds/list/1U7odqp5eoGxOlY7hO89ZA1FNxWu_CelUj-DhaIh-70k/ois09v3/public/values?alt=json'
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
        console.log("json", json);
        //The response(json) parameter is held in the proofMe variable.
        //Looping over the length of proofMe to check every available title.
    	for (i = 0; i < json.length; i++){
    	//Using $http.get to grab information from Open Library
    		var searchUrl = 'http://openlibrary.org/search?q=' + json[i];
            $http.get(searchUrl)   
                .then(function (response) {
                  if (response.data.docs[0] && response.data.docs[0].author_name) {
                    var author = response.data.docs[0].author_name[0];
                  };

                  if (response.data.docs[0] && response.data.docs[0].title) {
                    var titleSheet = response.data.docs[0].title
                  };

                  if (response.data.docs[0] && response.data.docs[0].isbn) {
                  var isbnSheet = response.data.docs[0].isbn;
                  };

                  // if (response.data.docs[0] && response.data.docs[0].publish_year) {
                  // var yearSheet = response.data.docs[0].publish_year;
                  // };

                  var location = "No available location.";              
                  var comments = "No comments.";

                  var someOtherObj = {};

                  var ratesRef = firebaseBook;
                  ratesRef.on('value', function (snapshot) {
                    $timeout(function () {
                      update(snapshot);
                      
                      var snap = snapshot.val();
                      $scope.snap = snap;
                    });
                  });

                function update (snapshot) {
                  var topObj = $scope.rate; 
                  $scope.rate = snapshot.val();

                  // for ( var obj in topObj) {
                  //   // console.log("obj", obj);
                  //     for ( var key in topObj[obj]) {
                  //       // console.log("key", key);
                  //       // console.log("topObj[obj][key]", topObj[obj][key]);
                  //       var x = topObj[obj][key];
                  //       // console.log("x", x);
                  //       //Is this an Obj or an Array
                  //       if (Array.isArray(x)){
                  //           var newObj = {};
                  //           console.log("thing!!!"); 
                  //         for (var k = 0; k < x.length; k++) {
                  //           newObj[k] = topObj[obj][key][k];
                  //           //Set newObj
                  //           // console.log("newObj", newObj);
                  //           console.log("newObj[k]", newObj[k]);
                  //           console.log("obj", obj);
                  //           console.log("key", key);
                            
                  //           var ref = firebaseBook + '/' + obj + '/' + key;
                  //           console.log("ref", ref);
                  //           // ref.$add(newObj[k]);
                  //         }
                  //       }
                  //     }
                  //   } 
                };


          // someBookFireObj.$loaded().then(function() {
          //  angular.forEach(someBookFireObj, function(value, key) {
          //    if (value.author[0] === thisBook.authorString){
          //      if (value.title['title'] === thisBook.titleString){

              //  // Three-way data binding!!! Author
              //  objAuthor.$bindTo($scope, "authorString").then(function() {
              //    firebaseAuthor.$set({ Author: $scope.editBook.authorString });
              //  });
          //      };
          //    };
          //  });
          // });

             
            
              var bookToAddSheets = {
                "author": {"author": author}, 
                "title": {"title": titleSheet},
                "isbn": isbnSheet,
                // "year": yearSheet,
                "comments": {"comments": comments},
                "location": {"location": location}
              }

              firebaseBookArray.$add(bookToAddSheets);
              $location.path('/mylibrary').replace();
           });
        };
    	};

}]);
