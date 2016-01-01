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
    }