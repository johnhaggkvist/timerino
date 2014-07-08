angular.module('timerino.Storage', []);
angular.module('timerino.Directives', []);
angular.module('timerino.Timer', ['timerino.Storage']);

angular.module('timerino', [
  'timerino.Timer',
  'timerino.Storage',
  'timerino.Directives',
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
