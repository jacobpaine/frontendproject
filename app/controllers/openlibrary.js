app.controller("openLibraryCtrl",
    ["$scope", "$http", "$firebaseArray", "$location", "$timeout",
    function($scope, $http, $firebaseArray, $location, $timeout) {

    var firebaseBook = new Firebase("https://library-of-paine.firebaseio.com/books/");
    var firebaseBookArray = $firebaseArray(firebaseBook);

    //var isbn = '9780261102385'
    $scope.searchAuthor = function(){
        console.log("Author clicked");
        var searchUrl = 'http://openlibrary.org/search.json?author=' + $scope.author;
        var proofMe;
        var i;
        var booksToDom = [];

            $http.get(searchUrl)   
                .then(function (response) {
                    console.log("response", response);

              proofMe = response.data.docs;
              for (i = 0; i < proofMe.length; i++){

                
                //Only strings can be replaced. Make it a string.
                var authorString = JSON.stringify(proofMe[i]["author_name"]);

                //Get rid of special symbols etc.
                authorString = authorString.replace(/[^\w\s]/gi, '');
                var authorRevised = authorString.replace(/\s{2,}/g," ")


                var bookToDom = {    
                    author: authorRevised,
                    // isbn: doc.isbn,
                    // publish_year: doc.publish_year,
                    title: proofMe[i]["title"]
                };

                booksToDom.push(bookToDom);
                console.log("booksToDom", booksToDom);
                console.log("bookToDom", bookToDom);


           };
                $scope.docs = booksToDom;
                $scope.author = "";
        });
    },
    
    $scope.searchIsbn = function(){
    var searchUrl = 'http://openlibrary.org/search?q=' + $scope.isbn;
        $http.get(searchUrl)   
            .then(function (response) {
                console.log("response", response);
            $scope.docs = response.data.docs
            $scope.isbn = "";
        });
    },

    $scope.searchLanguage = function(){
        var searchUrl = 'http://openlibrary.org/search?language=' + $scope.language;
            $http.get(searchUrl)   
                .then(function (response) {
                    console.log("response", response);
                $scope.docs = response.data.docs
                $scope.title = "";
        });
    },

    $scope.searchTitle = function(){
        var searchUrl = 'http://openlibrary.org/search?title=' + $scope.title;
            $http.get(searchUrl)   
                .then(function (response) {
                    console.log("response", response);
                $scope.docs = response.data.docs
                $scope.title = "";
        });
    },

    $scope.searchYear = function(){
        var searchUrl = 'http://openlibrary.org/search?year=' + $scope.publish_year;
            $http.get(searchUrl)   
                .then(function (response) {
                    console.log("response", response);
                $scope.docs = response.data.docs
                $scope.publish_year = "";
        });
    };

    $scope.clearPage = function(){
        console.log("fired");
        $scope.docs = "";
        };

    $scope.toMyLibrary = function() {
            $location.path('/mylibrary').replace();
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
    
    $scope.removeBook = function(doc){
        console.log("removedoc", doc);
        var i;
        for (i = 0; i < firebaseBookArray.length; i++){
            if (firebaseBookArray[i].title === doc.title){
                firebaseBookArray.$remove(firebaseBookArray[i]);
            }
        };

    };
}]);
