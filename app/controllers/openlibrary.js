app.controller("openLibraryCtrl",
    ["$scope", "$http", "$firebaseArray", "$location", "$timeout",
    function($scope, $http, $firebaseArray, $location, $timeout) {

    var firebaseBook = new Firebase("https://library-of-paine.firebaseio.com/books/");
    var firebaseBookArray = $firebaseArray(firebaseBook);

    //var isbn = '9780261102385'
    $scope.searchAuthor = function(){
        var searchUrl = 'http://openlibrary.org/search.json?author=' + $scope.author;
        var proofMe;
        var i;
        var booksToDom = [];
            //Using $http.get to grab information from Open Library
            $http.get(searchUrl)   
                .then(function (response) {
                    console.log("response", response);
              //The response parameter is held in the proofMe variable.
              proofMe = response.data.docs;

              //Looping over the length of proofMe to check every available title.
              for (i = 0; i < proofMe.length; i++){

                //Only strings can use the replace method. Stringify!
                var authorString = JSON.stringify(proofMe[i]["author_name"]);

                //Get rid of special symbols etc. Use replace and regular expressions. 
                //Note to self: Learn more RegEx.
                authorString = authorString.replace(/[^.?!()&a-zA-Z0-9 ]/g, "");

                //The information for each individual book is held in bookToDom obj.
                var bookToDom = {    
                    author: authorString,
                    // isbn: proofMe[i]["isbn"],
                    // publish_year: doc.publish_year,
                    title: proofMe[i]["title"]
                };
                booksToDom.push(bookToDom);
           };
                $scope.docs = booksToDom;
                $scope.author = "";
        });
    },
    
    $scope.searchIsbn = function(){
    var searchUrl = 'http://openlibrary.org/search?q=' + $scope.isbn;
        var proofMe;
        var i;
        var booksToDom = [];
            //Using $http.get to grab information from Open Library
            $http.get(searchUrl)   
                .then(function (response) {
                    console.log("response", response);
              //The response parameter is held in the proofMe variable.
              proofMe = response.data.docs;

              //Looping over the length of proofMe to check every available title.
              for (i = 0; i < proofMe.length; i++){

                //Only strings can use the replace method. Stringify!
                var isbnString = proofMe[i]["isbn"];

                //Get rid of special symbols etc. Use replace and regular expressions. 
                //Note to self: Learn more RegEx.
                // isbnString = isbnString.replace(/[^.?!()&a-zA-Z0-9 ]/g, "");

                //The information for each individual book is held in bookToDom obj.
                var bookToDom = {    
                    // author: authorString,
                    isbn: isbnString,
                    // publish_year: doc.publish_year,
                    title: proofMe[i]["title"]
                };
                booksToDom.push(bookToDom);
           };
                $scope.docs = booksToDom;
                $scope.isbn = "";
        });
    },

    $scope.searchTitle = function(){
        var searchUrl = 'http://openlibrary.org/search?q=' + $scope.title;
            $http.get(searchUrl)   
                .then(function (response) {
                    console.log("response", response);
                $scope.docs = response.data.docs
                $scope.title = "";
        });
    },

    $scope.searchYear = function(){
        console.log("year fire");
        var searchUrl = 'http://openlibrary.org/search?year=' + $scope.publish_year;
            $http.get(searchUrl)   
                .then(function (response) {
                    console.log("response", response);
                $scope.docs = response.data.docs
                $scope.publish_year = "";
        });
    };

    $scope.clearPage = function(){
        $scope.docs = "";
    };

    $scope.toMyLibrary = function() {
        $location.path('/mylibrary').replace();
    };

    $scope.manualAdd = function(){
        $location.path('/additions').replace();
    };
    
    $scope.addBook = function(doc){
        console.log("doc", doc);
        var bookToAdd = {    
          author: doc.author,
          // isbn: doc.isbn,
          // publish_year: doc.publish_year,
          title: doc.title
        };
        firebaseBookArray.$add(bookToAdd);
    };

}]);
