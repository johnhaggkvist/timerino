angular.module("timerino.Shared", ['timerino.Directives', 'timerino.Token', 'timerino.Times']).
controller("SharedCtrl", ['$scope', '$routeParams', 'TokenService', 'TimesService', function($scope, $routeParams, TokenService, TimesService) {
  if ($routeParams.token) {
    var data = TokenService.unpackToken($routeParams.token);
    $scope.times = data.times;
    $scope.average = TimesService.average(data.times);
    $scope.competetiveAverage = TimesService.competetiveAverage(data.times);
  }
}]);