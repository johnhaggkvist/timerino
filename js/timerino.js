angular.module('timerino.Timer', []);

angular.module('timerino', [
  'timerino.Timer',
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
