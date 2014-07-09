angular.module("timerino.Times", []).
factory("TimesService", [function() {
  
  function getCompetitionTimes(times) {
    var arr = JSON.parse(JSON.stringify(times));
    arr.sort(function (a, b) {
      return a.timed - b.timed;
    });
    return arr.slice(1, arr.length);
  }

  function getAverage(times) {
    var sum = 0;
    for (var i = 0; i < times.length; i++) {
      sum += times[i].timed;
    }
    return parseInt(sum / times.length, 10);
  }

  var TimesService = {
    average: function (times) {
      return getAverage(times);
    },
    competetiveAverage: function (times) {
      return getAverage(getCompetitionTimes(times));
    }
  };
  return TimesService;
}]);
