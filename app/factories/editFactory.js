app.factory("editFactory", 
  ["$firebaseArray", function($firebaseArray) {

//Variables
    var firebaseBook = new Firebase("https://library-of-paine.firebaseio.com/books/");
    var firebaseBookArray = $firebaseArray(firebaseBook);
    var current = "";

//Functions used in controllers

    function setBook(book){
      return currentBook = book;
    }

    function getBook(){
      return currentBook;
    }

//This is actually the edit function now
    // function editSlide(slide, slideToAdd, thatThing){
    //   // var slideLoc = showRef.child(slide.$id);
    //   var slideLoc = showRef.child(thatThing);
    //   slideLoc.update(slideToAdd);
    // }

  return {
      getBook:getBook,
      setBook:setBook
      // editSlide:editSlide
  };
}]);