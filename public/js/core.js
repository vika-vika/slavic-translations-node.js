var app = angular.module('Translation', []);

function mainController($scope, $http) {

  $scope.translationTableResultsStyle = {
    'visibility': 'hidden'
  };

  $scope.originalTranslations = {};
  $scope.translit = "translit";

function filterGroup(src, type) {
  return src.filter(function(el) {
    return el.group == type;
  })
}

  $scope.translate = function() {
    var query = $scope.inputQuery;

    if ((typeof query != 'undefined') || (query.length == 0)) {
      $scope.inputQuery = "";

      $http.get('/api/translate', {
          params: {
            q: query
          }
        })
        .success(function(data) {
          $scope.translationTableResultsStyle = {
            'visibility': 'visible'
          };

          var translations = data.translations;

          $scope.originalTranslations.west = filterGroup(translations, "w");
          $scope.originalTranslations.east = filterGroup(translations, "e");
          $scope.originalTranslations.south = filterGroup(translations, "s");

        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    } else {
      alert("Please enter value");
    }
  }
}


angular.module('Translation').directive('translationForm', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/form_translations.html',
    scope: {
      data: '=',
      type: '='
    }
  };
});
