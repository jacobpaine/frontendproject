
app.factory("Tools", 
	["$firebaseAuth", "$rootScope", function($firebaseAuth, $rootScope) {
		var ref = new Firebase("https://front-end-data.firebaseio.com");
    var uid;

	return {
    



  //   getUid: function(){
  //     return uid;
  //   },
  //   setUid: function(passedUid){
  //     uid = passedUid;
  //   },
		// useAuth: function() {
  //   return $firebaseAuth(ref);
  // 	},
  // 	logUs: function(inorOut){
  // 		$rootScope.loggedIn = inorOut;
  // 		console.log("inorOut", inorOut);
  // 	},
  // 	isLoggedIn: function(){
  // 		return $rootScope.loggedIn;
  // 	}
  };
}]);