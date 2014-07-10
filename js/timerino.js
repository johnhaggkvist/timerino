angular.module('timerino.Storage', []);
angular.module('timerino.Token', []);
angular.module('timerino.Times', []);
angular.module('timerino.Directives', []);
angular.module('timerino.Timer', ['timerino.Directives', 'timerino.Storage', 'timerino.Token', 'timerino.Times']);
angular.module('timerino.History', ['timerino.Directives', 'timerino.Storage', 'timerino.Times']);
angular.module('timerino.Shared', ['timerino.Directives', 'timerino.Token', 'timerino.Times']);


angular.module('timerino', [
  'timerino.Timer',
  'timerino.Shared',
  'timerino.History',

  'timerino.Storage',
  'timerino.Token',
  'timerino.Times',
  
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
  $routeProvider.when('/history', {
    templateUrl: 'template/history.html',
    controller: 'HistoryCtrl'
  });
  $routeProvider.otherwise({
    redirectTo: '/timer'
  });
}]);
