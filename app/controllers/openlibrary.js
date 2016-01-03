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
        var theVoid = [];
            //Using $http.get to grab information from Open Library
            $http.get(searchUrl)   
                .then(function (response) {
                    console.log("response", response);
              //The response parameter is held in the proofMe variable.
              proofMe = response.data.docs;
              //Looping over the length of proofMe to check every available title.
              for (i = 0; i < proofMe.length; i++){
                var idString = proofMe[i].cover_i;
                //Only strings can use the replace method. Stringify!
                var image = "http://covers.openlibrary.org/b/id/" + idString + "-S.jpg";
                var isbnString = proofMe[i]["isbn"];
                
                // if (isbnString === undefined){
                //     theVoid.push(isbnString);
                //     } else {
                //     isbnString = isbnString.replace(/[^.,?!()&a-zA-Z0-9 ]/g, "");
                //     isbnString = isbnString.replace(/[ ]*,[ ]*|[ ]+/g, ' ');
                //     };

                //Get rid of special symbols etc. Use replace and regular expressions. 
                //Note to self: Learn more RegEx.
                var authorString = JSON.stringify(proofMe[i]["author_name"]);
                authorString = authorString.replace(/[^.?!()&a-zA-Z0-9 ]/g, "");
                authorString = authorString.slice(/[ ]*,[ ]*|[ ]+/g, ' ');

                var year = JSON.stringify(proofMe[i]["publish_year"]);
                year = year.replace(/[^.,?!()&a-zA-Z0-9 ]/g, "");
                year = year.replace(/[ ]*,[ ]*|[ ]+/g, ' ');
                

                //The information for each individual book is held in bookToDom obj.
                // console.log("isbnString", isbnString);
                var bookToDom = {    
                    author: "Author: " + authorString,
                    isbn: "ISBN: " + isbnString,
                    title: "Title: " + proofMe[i]["title"],
                    year: "Year published: " + year,
                    img: image
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

                var image = "http://covers.openlibrary.org/b/isbn/" + isbnString + "-S.jpg";

                //The information for each individual book is held in bookToDom obj.
                // console.log("isbnString", isbnString);
                var bookToDom = {    
                    author: "Author: " + authorString,
                    isbn: "ISBN: " + isbnString,
                    title: "Title: " + proofMe[i]["title"],
                    year: "Year published: " + year,
                    img: image
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
                var image = "http://covers.openlibrary.org/b/isbn/" + isbnString + "-S.jpg";

                //The information for each individual book is held in bookToDom obj.
                // console.log("isbnString", isbnString);
                var bookToDom = {    
                    author: "Author: " + authorString,
                    isbn: "ISBN: " + isbnString,
                    title: "Title: " + proofMe[i]["title"],
                    year: "Year published: " + year,
                    img: image
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

                var image = "http://covers.openlibrary.org/b/isbn/" + isbnString + "-S.jpg";

                //The information for each individual book is held in bookToDom obj.
                // console.log("isbnString", isbnString);
                var bookToDom = {    
                    author: "Author: " + authorString,
                    isbn: "ISBN: " + isbnString,
                    title: "Title: " + proofMe[i]["title"],
                    year: "Year published: " + year,
                    img: image
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
          // isbn: doc.isbn,
          // publish_year: doc.publish_year,
          title: doc.title
        };
        firebaseBookArray.$add(bookToAdd);
    };

}]);
