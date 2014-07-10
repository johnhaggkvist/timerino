angular.module("timerino.Timer", ['timerino.Storage', 'timerino.Directives', 'timerino.Token', 'timerino.Times']).
controller("TimerCtrl", ['$scope', '$document', '$location', 'StorageService', 'TokenService', 'TimesService', 
  function($scope, $document, $location, StorageService, TokenService, TimesService) {
  var start = undefined,
      holding = false, 
      starting = false,
      saving = false,
      bound = false;
  setTimed("T:im:er:ino", true);
  updateLatestTimes(true);

  function setTimed(value, doNotApply) {
    $scope.timed = value;
    if (!doNotApply) $scope.$apply();
  }

  function timingDone(timed) {
    StorageService.putTime(timed);

    setTimed(timed);
    updateLatestTimes();
  }

  function updateLatestTimes(doNotApply) {
    var amount = 5;
    var latest = StorageService.getLatest(amount);
    $scope.latestShareToken = (latest.length == amount ? TokenService.tokenTimes(latest) : undefined);

    $scope.times = latest;
    $scope.average = TimesService.average(latest);
    $scope.competetiveAverage = TimesService.competetiveAverage(latest);

    if (!doNotApply) $scope.$apply();
  }

  function keyIsGood($event) {
    return $event.which === 32 && !saving && $location.path() === '/timer'
  }

  $scope.$on('$destroy', function () {
    $document.off('keydown.timerino', keydownHandler);
    $document.off('keyup.timerino', keyupHandler);
  });

  $document.bind('keydown.timerino', keydownHandler);

  $document.bind('keyup.timerino', keyupHandler);

  function keydownHandler($event) {
    if (keyIsGood($event)) {
      if (!holding) {
        if (start) {
          var timed = $event.timeStamp - start;
          start = undefined;
          holding = true;
          if (!saving) {
            saving = true;
            timingDone(timed);
            saving = false;
          }
        } else if (!start) {
          holding = true;
          starting = true;
          setTimed('Waiting...');
        }
      }
    }
  }

  function keyupHandler($event) {
    if (keyIsGood($event)) {
      if (!start && starting) {
        start = $event.timeStamp;
        starting = false;
        setTimed('Timing!');
      }
      holding = false;
    }
  }
}]);