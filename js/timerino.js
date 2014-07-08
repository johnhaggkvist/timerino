angular.module('timerino.Storage', []);
angular.module('timerino.Timer', ['timerino.Storage']);

angular.module('timerino', [
  'timerino.Timer',
  'timerino.Storage',
  'ngRoute'
]).
config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/timer', {
      templateUrl: 'template/timer.html',
      controller: 'TimerCtrl'
  });
  $routeProvider.otherwise({
      redirectTo: '/timer'
  });
}]);
