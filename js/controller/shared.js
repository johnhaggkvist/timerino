angular.module("timerino.Shared", ['timerino.Directives', 'timerino.Token', 'timerino.Times']).
controller("SharedCtrl", ['$scope', '$routeParams', '$filter', 'TokenService', 'TimesService', function($scope, $routeParams, $filter, TokenService, TimesService) {
  // export to grant graph js access to our filter :(
  window.timerinoTimed = function (val) { return $filter('timed')(val); }

  function updateCanvas(canvasId, times, reverse) {
    var graphTimes = [],
        graphWhens = [];
    for (var i = 0; i < times.length; i++) {
        var time = times[i];
        if (reverse) {
          graphTimes.unshift(time.timed);
        } else {
          graphTimes.push(time.timed);
        }
        graphWhens.push('');
    }
    var data = {
      labels: graphWhens,
      datasets: [{
          data: graphTimes
      }]
    };

    var ctx = document.getElementById(canvasId).getContext("2d");
    var myNewChart = new Chart(ctx).Bar(data, {
        scaleLabel: "<%=timerinoTimed(value)%>",
        tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= timerinoTimed(value) %>",
        animationSteps: 15
    });
  }

  if ($routeParams.token) {
    var data = TokenService.unpackToken($routeParams.token);
    $scope.times = data.times;
    $scope.best = data.best;
    $scope.bestest = data.best[0];
    
    $scope.average = TimesService.average(data.times);
    $scope.competetiveAverage = TimesService.competetiveAverage(data.times);

    updateCanvas('latestCanvas', data.times, true);
    updateCanvas('bestCanvas', data.best);
  }
}]);
