app.controller("openLibraryCtrl",
    ["$scope", "$http", "$firebaseArray", "$location", "$timeout", "$log",
    function($scope, $http, $firebaseArray, $location, $timeout, $log) {

    var firebaseBook = new Firebase("https://library-of-paine.firebaseio.com/books/");
    var firebaseBookArray = $firebaseArray(firebaseBook);

    //var isbn = '9780261102385'
    $scope.searchAuthor = function(){
        var searchUrl = 'http://openlibrary.org/search.json?author=' + $scope.author;
        var proofMe;
        var i;
        var booksToDom = [];
        var theVoid = [];
        var loc = "No available location.";              
        var comments = "No comments.";
            //Using $http.get to grab information from Open Library
            $http.get(searchUrl)   
                .then(function (response) {
                    console.log("response", response);
              //The response parameter is held in the proofMe variable.
              proofMe = response.data.docs;
              //Looping over the length of proofMe to check every available title.
              for (i = 0; i < proofMe.length; i++){
                var title = proofMe[i]["title"];
                var idString = proofMe[i].cover_i;
                //Only strings can use the replace method. Stringify!
                // var image = "http://covers.openlibrary.org/b/id/" + idString + "-S.jpg";
                var isbnString = JSON.stringify(proofMe[i]["isbn"]);
                
                if (isbnString === undefined){
                    theVoid.push(isbnString);
                    } else {
                    isbnString = isbnString.replace(/[^.,?!()&a-zA-Z0-9 ]/g, "");
                    isbnString = isbnString.replace(/[ ]*,[ ]*|[ ]+/g, ', ');
                    };

                //Get rid of special symbols etc. Use replace and regular expressions. 
                //Note to self: Learn more RegEx.
                var authorString = JSON.stringify(proofMe[i]["author_name"]);
                authorString = authorString.replace(/[^.?!()&a-zA-Z0-9 ]/g, "");
                // authorString = authorString.slice(/[ ]*,[ ]*|[ ]+/g, ' ');

                var year = JSON.stringify(proofMe[i]["publish_year"]);
                if (year === undefined){
                    theVoid.push(year);
                    } else {
                        year = year.replace(/[^.,?!()&a-zA-Z0-9 ]/g, "");
                        year = year.replace(/[ ]*,[ ]*|[ ]+/g, ', ');
                    }

                //The information for each individual book is held in bookToDom obj.
                // console.log("isbnString", isbnString);
                var bookToDom = {    
                    "author": {"author": authorString},
                    isbn: "ISBN: " + isbnString,
                    "title": {"title": title},
                    "comments": {"comments": comments},
                    "location": {"location": loc},
                    year: "Years published: " + year,
                    // img: image
                };

                console.log("bookToDom", bookToDom);
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
        var theVoid = [];
        var loc = "No available location.";              
        var comments = "No comments.";
            //Using $http.get to grab information from Open Library
            $http.get(searchUrl)   
                .then(function (response) {
                    console.log("response", response);
              //The response parameter is held in the proofMe variable.
              proofMe = response.data.docs;

              //Looping over the length of proofMe to check every available title.
              for (i = 0; i < proofMe.length; i++){
                var title = proofMe[i]["title"];

                //Only strings can use the replace method. Stringify!
                var authorString = JSON.stringify(proofMe[i]["author_name"]);
                authorString = authorString.replace(/[ ]*,[ ]*|[ ]+/g, ' ');

                var isbnString = proofMe[i]["isbn"][i];
                isbnString = isbnString.replace(/[ ]*,[ ]*|[ ]+/g, ' ');

                var year = JSON.stringify(proofMe[i]["publish_year"]);
                year = year.replace(/[^.,?!()&a-zA-Z0-9 ]/g, "");
                year = year.replace(/[ ]*,[ ]*|[ ]+/g, ' ');

                //Get rid of special symbols etc. Use replace and regular expressions. 
                //Note to self: Learn more RegEx.
                authorString = authorString.replace(/[^.?!()&a-zA-Z0-9 ]/g, "");
           
                 if (isbnString === undefined){
                    theVoid.push(isbnString);
                    };

                // var image = "http://covers.openlibrary.org/b/isbn/" + isbnString + "-S.jpg";

                //The information for each individual book is held in bookToDom obj.
                // console.log("isbnString", isbnString);
                var bookToDom = {    
                    "author": {"author": authorString},
                    isbn: "ISBN: " + isbnString,
                    "title": {"title": title},
                    "comments": {"comments": comments},
                    "location": {"location": loc},
                    year: "Years published: " + year,
                    // img: image
                };
                booksToDom.push(bookToDom);
           };
                $scope.docs = booksToDom;
                $scope.isbn = "";
        });
    },

    $scope.searchTitle = function(){
        var searchUrl = 'http://openlibrary.org/search?title=' + $scope.title;
        var proofMe;
        var i;
        var booksToDom = [];
        var loc = "No available location.";              
        var comments = "No comments.";

        //theVoid is full of undefined elements.
        var theVoid = [];
            //Using $http.get to grab information from Open Library
            $http.get(searchUrl)   
                .then(function (response) {
                    console.log("response", response);
              //The response parameter is held in the proofMe variable.
              proofMe = response.data.docs;

              //Looping over the length of proofMe to check every available title.
              for (i = 0; i < proofMe.length; i++){
                var title = proofMe[i]["title"];

                //Only strings can use the replace method. Stringify!
                var authorString = String(proofMe[i]["author_name"]);

                var title = proofMe[i]["title"];

                var isbnString = JSON.stringify(proofMe[i]["isbn"]);
                
                console.log("isbnString", isbnString);

                if (isbnString === undefined){
                    theVoid.push(isbnString);
                } else {
                    isbnString = isbnString.replace(/[^#%-.?!()&a-zA-Z0-9 ]/g, "");
                    isbnString = isbnString.replace(/[ ]*,[ ]*|[ ]+/g, ', ');
                };
                
                var year = JSON.stringify(proofMe[i]["publish_year"]);
                if (year === undefined){
                    theVoid.push(isbnString);
                } else {
                    year = year.replace(/[^#%-.?!()&a-zA-Z0-9 ]/g, "");
                    year = year.replace(/[ ]*,[ ]*|[ ]+/g, ', ');
                };
               

                //Get rid of special symbols etc. Use replace and regular expressions. 
                //Note to self: Learn more RegEx.
                if (authorString === undefined){
                    theVoid.push(authorString);
                } else {
                    authorString = authorString.replace(/[^#%-.?!()&a-zA-Z0-9 ]/g, "");
                };

                if (isbnString === undefined){
                    theVoid.push(isbnString);
                } else {
                    isbnString = String(isbnString.replace(/[^,.?!()&a-zA-Z0-9 ]/g, ""));
                };
                // var image = "http://covers.openlibrary.org/b/isbn/" + isbnString + "-S.jpg";

                //The information for each individual book is held in bookToDom obj.
                // console.log("isbnString", isbnString);
                var bookToDom = {    
                    "author": {"author": authorString},
                    isbn: "ISBN: " + isbnString,
                    "title": {"title": title},
                    "comments": {"comments": comments},
                    "location": {"location": loc},
                    year: "Years published: " + year
                    // img: image
                };
                booksToDom.push(bookToDom);
           };
                $scope.docs = booksToDom;
                $scope.author = "";
        });
    },

    $scope.searchYear = function(){
        var searchUrl = 'http://openlibrary.org/search?year=' + $scope.publish_year;
        var proofMe;
        var i;
        var booksToDom = [];
        var loc = "No available location.";              
        var comments = "No comments.";

        //theVoid is full of undefined elements.
        var theVoid = [];
            //Using $http.get to grab information from Open Library
            $http.get(searchUrl)   
                .then(function (response) {
                    console.log("response", response);
              //The response parameter is held in the proofMe variable.
              proofMe = response.data.docs;

              //Looping over the length of proofMe to check every available title.
              for (i = 0; i < proofMe.length; i++){
                var title = proofMe[i]["title"];

                //Only strings can use the replace method. Stringify!
                var authorString = String(proofMe[i]["author_name"]);

                var isbnString = JSON.stringify(proofMe[i]["isbn"]);
                isbnString = isbnString.replace(/[ ]*,[ ]*|[ ]+/g, ' ');


                var year = proofMe[i]["publish_year"];
                year = year.replace(/[ ]*,[ ]*|[ ]+/g, ' ');

                //Get rid of special symbols etc. Use replace and regular expressions. 
                //Note to self: Learn more RegEx.
                if (authorString === undefined){
                    theVoid.push(authorString);
                } else {
                    authorString = authorString.replace(/[^#%-.?!()&a-zA-Z0-9 ]/g, "");
                };

                if (isbnString === undefined){
                    theVoid.push(isbnString);
                } else {
                    isbnString = String(isbnString.replace(/[^,.?!()&a-zA-Z0-9 ]/g, ""));
                };

                // var image = "http://covers.openlibrary.org/b/isbn/" + isbnString + "-S.jpg";

                //The information for each individual book is held in bookToDom obj.
                // console.log("isbnString", isbnString);
                var bookToDom = {    
                    "author": {"author": authorString},
                    isbn: "ISBN: " + isbnString,
                    "title": {"title": title},
                    "comments": {"comments": comments},
                    "location": {"location": loc},
                    year: "Years published: " + year
                    // img: image
                };
                booksToDom.push(bookToDom);
           };
                $scope.docs = booksToDom;
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
          isbn: doc.isbn,
          // publish_year: doc.publish_year,
          title: doc.title,
        };
        firebaseBookArray.$add(bookToAdd);
    };


  $scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };



}]);
