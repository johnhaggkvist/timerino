angular.module('timerino.Storage', []);
angular.module('timerino.Token', []);
angular.module('timerino.Directives', []);
angular.module('timerino.Timer', ['timerino.Directives', 'timerino.Storage', 'timerino.Token']);
angular.module('timerino.Shared', ['timerino.Directives', 'timerino.Token']);


angular.module('timerino', [
  'timerino.Timer',
  'timerino.Shared',
  'timerino.Storage',
  'timerino.Token',
  'timerino.Directives',
  'ngRoute'
]).
config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/timer', {
    templateUrl: 'template/timer.html',
    controller: 'TimerCtrl'
  });
  $routeProvider.when('/shared/:token', {
    templateUrl: 'template/shared.html',
    controller: 'SharedCtrl'
  });
  $routeProvider.otherwise({
    redirectTo: '/timer'
  });
}]);
