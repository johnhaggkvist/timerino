angular.module("timerino.Timer", ['timerino.Storage']).
controller("TimerCtrl", ['$scope', '$document', 'StorageService', function($scope, $document, StorageService) {
  var start = undefined,
      holding = false, 
      starting = false;
  setTimed("T:im:er:ino", true);

  function setTimed(value, doNotApply) {
    $scope.timed = value;
    if (!doNotApply) $scope.$apply();
  }

  $document.bind('keydown', function ($event) {
    if ($event.which === 32) {
      if (!holding) {
        if (start) {
          var timed = $event.timeStamp - start;
          start = undefined;
          holding = true;
          StorageService.putTime(timed);

          setTimed(formatTime(timed));
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

  function formatTime(millis) {
    function _zeropad(num, len) {
      num = '' + num;
      while (num.length < len) {
        num = '0' + num;
      }
      return num;
    }
    var seconds = Math.floor(millis / 1000);
    millis = _zeropad(millis % 1000, 3);
    var minutes = Math.floor(seconds / 60);
    seconds = _zeropad(seconds % 60, 2);
    var hours = Math.floor(minutes / 60);
    minutes = _zeropad(minutes % 60, 2);
    return (hours ? _zeropad(hours, 2) + ':' : '') + minutes + ':' + seconds + ':' + millis;
  }
}]);