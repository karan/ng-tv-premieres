app.controller("mainController", function($scope, $http){

  $scope.apiKey = '82226981b8c69c86a06f7740a3c14efb';
  $scope.results = [];

  $scope.init = function() {
    var today = new Date();
    var apiDate = today.getFullYear() +
                  ('0' + (today.getMonth() + 1)).slice(-2) + '' +
                  ('0' + today.getDate()).slice(-2);
    $http.jsonp('http://api.trakt.tv/calendar/premieres.json/' +
                $scope.apiKey + '/' + apiDate + '/' + 10 +
                '?callback=JSON_CALLBACK').success(function(data) {
                  console.log(data);
                  // As we are getting our data from an external source, we
                  // need to format the data so we can use it to our desired
                  // effect
                  // For each day, get all the episodes
                  angular.forEach(data, function(value, index){
                    var date = value.date;
                    angular.forEach(value.episodes, function(tvshow, index){
                        tvshow.date = date;
                        $scope.results.push(tvshow);
                    });
                  });
                }).error(function(err) {
                  console.log(err);
                 });
  };

});
