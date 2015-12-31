app.controller("openLibraryCtrl",
    ["$scope", "$http", "$firebaseArray",
    function($scope, $http, $firebaseArray) {

    var firebaseBook = new Firebase("https://library-of-paine.firebaseio.com/books/");
    var firebaseBookArray = $firebaseArray(firebaseBook);

    //var isbn = '9780261102385'
    $scope.searchAuthor = function(){
        console.log("Author clicked");
        var searchUrl = 'http://openlibrary.org/search.json?author=' + $scope.author;
            $http.get(searchUrl)   
                .then(function (response) {
                    console.log("response", response);
                $scope.docs = response.data.docs
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
    },

    $scope.addBook = function(doc){
        console.log("doc", doc);
        var bookToAdd = {    
          author: doc.author_name,
          isbn: doc.isbn,
          publish_year: doc.publish_year,
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
        }

        // console.log("firebaseBook", firebaseBook);
        // console.log("firebaseBookArray", firebaseBookArray);
        // console.log("firebaseBookArray[0].title", firebaseBookArray[0].title);

        // if (doc === firebaseBook.child.title)
        // showRef.child(slide.$id).child("title").remove();
        // var firebaseBookArray = $firebaseArray(firebaseBook)

        // firebaseBookArray.$remove(bookToRemove);

    };


}]);
