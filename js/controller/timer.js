angular.module("timerino.Timer", ['timerino.Storage', 'timerino.Directives', 'timerino.Token']).
controller("TimerCtrl", ['$scope', '$document', 'StorageService', 'TokenService', function($scope, $document, StorageService, TokenService) {
  var start = undefined,
      holding = false, 
      starting = false;
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
    $scope.latest = latest;
    $scope.latestShareToken = (latest.length == amount ? TokenService.tokenTimes($scope.latest) : undefined);
    
    if (!doNotApply) $scope.$apply();
  }

  $document.bind('keydown', function ($event) {
    if ($event.which === 32) {
      if (!holding) {
        if (start) {
          var timed = $event.timeStamp - start;
          start = undefined;
          holding = true;
          timingDone(timed);
        } else if (!start) {
          holding = true;
          starting = true;
          setTimed('Waiting...');
        }
      }
    }
  });

  $document.bind('keyup', function ($event) {
    if ($event.which === 32) {
      if (!start && starting) {
        start = $event.timeStamp;
        starting = false;
        setTimed('Timing!');
      }
      holding = false;
    }
  });
}]);