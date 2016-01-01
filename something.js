var app = angular.module('plunker', []);
app.controller('SuperCtrl', ['$scope', '$http', function($scope,$http) {
    var url = 'https://spreadsheets.google.com/feeds/list/1U9JXkQ5ZDCXTTNvFZlcr9yc8-ehOc_PbF4o-b2IiEYg/ocwf700/public/values?alt=json'
    var parse = function(entry) {
      console.log(entry);
      
      var category = entry['gsx$_cn6ca']['$t'];
      return {
        category: category
      };
    }
    $http.get(url)
    .success(function(response) {
      var entries = response['feed']['entry'];
      $scope.parsedEntries = [];
      for (key in entries) {
        var content = entries[key];
        $scope.parsedEntries.push(parse(content));
      }
    });
}]);

// https://spreadsheets.google.com/feeds/list/1U9JXkQ5ZDCXTTNvFZlcr9yc8-ehOc_PbF4o-b2IiEYg/ocwf700/public/values?alt=json