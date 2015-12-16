
app.factory("FirebaseFactory", 
  ["$rootScope", "$firebaseAuth", function($rootScope, $firebaseAuth) {
    var fbShowRef = new Firebase("https://front-end-data.firebaseio.com/shows/");
    var uid;

    function editWhat (WhatToEdit){
      console.log("WhatToEdit", WhatToEdit);
  		currentShowArray[0] = WhatToEdit;

    function viewWhat (WhatToView){
      console.log("WhatToView", WhatToView);
    }

  	};
  return {
      editWhat:editWhat
  };
}]);


