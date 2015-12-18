// let's create a re-usable factory that generates the $firebaseAuth instance
// It's a factory! Inside the factory are all the tools we want to call in other places. This one uses Firebase information, e.g. $firebaseAuth.  

app.factory("Auth", 
	["$firebaseAuth", "$rootScope", function($firebaseAuth, $rootScope) {
		var ref = new Firebase("https://front-end-data.firebaseio.com");
    var uid;

	return {
    getUid: function(){
      return uid;
    },
    setUid: function(passedUid){
      uid = passedUid;
    },
		useAuth: function() {
    return $firebaseAuth(ref);
  	},
  	logUs: function(inorOut){
  		$rootScope.loggedIn = inorOut;
  	},
  	isLoggedIn: function(){
  		return $rootScope.loggedIn;
  	}
  };
}]);