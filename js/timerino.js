var timerinoApp = angular.module("timerinoApp", []);
    timerinoApp.controller("TimerCtrl", ['$scope', function($scope) {
      var start = undefined,
          holding = false, 
          starting = false;
     $scope.timed = "T:im:er:ino"

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

      $scope.keydown = function ($event) {
        if ($event.which === 32) {
          if (!holding) {
            if (start) {
              $scope.timed = formatTime($event.timeStamp - start);
              start = undefined;
              holding = true;
            } else if (!start) {
              holding = true;
              starting = true;
              $scope.timed = 'Waiting...';
            }
          }
        }
      };
      $scope.keyup = function ($event) {
        if ($event.which === 32) {
          if (!start && starting) {
            start = $event.timeStamp;
            starting = false;
            $scope.timed = 'Timing!';
          }
          holding = false;
        }
      };
    }]);