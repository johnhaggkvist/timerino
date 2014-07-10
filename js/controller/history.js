angular.module("timerino.History", ['timerino.Directives', 'timerino.Times', 'timerino.Storage']).
controller("HistoryCtrl", ['$scope', 'TimesService', 'StorageService', function($scope, TimesService, StorageService) {
  $scope.times = StorageService.getTimes();

  $scope.killTime = function (index, time) {
  	StorageService.killTime(index, time);
    $scope.times = StorageService.getTimes();
  }
}]);