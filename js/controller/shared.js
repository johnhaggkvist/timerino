angular.module("timerino.Shared", ['timerino.Directives', 'timerino.Token']).
controller("SharedCtrl", ['$scope', '$routeParams', 'TokenService', function($scope, $routeParams, TokenService) {
  if ($routeParams.token) {
  	var data = TokenService.unpackToken($routeParams.token);
  	$scope.data = data;
  }
}]);