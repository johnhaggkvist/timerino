angular.module("timerino.Storage", []).
factory("StorageService", [function() {
  function pullFromStorage(profile) {
    if ('localStorage' in window && window['localStorage'] !== null) {
      return JSON.parse(localStorage.getItem("timerino_profile_" + profile));
    }
    return null;
  }

  function pushToStorage(profile, data) {
    if ('localStorage' in window && window['localStorage'] !== null) {
      return localStorage.setItem("timerino_profile_" + profile, JSON.stringify(data));
    }
  }

  var profile = "timerino";

  var StorageService = {
    putTime: function (time) {
      var everything = this.getEverything(profile);
      everything.times.unshift({
        timed: time,
        when: new Date().getTime()
      });
      pushToStorage(profile, everything);
    },
    getEverything: function (profile) {
      var everything = pullFromStorage(profile);
      if (everything)
        return everything;
      return {
        times: []
      };
    },
    getTimes: function () {
      var everything = this.getEverything(profile);
      return everything.times;
    },
    getLatest: function (number) {
      var times = this.getTimes();
      if (times.length > number)
        return times.slice(0, number);
      return times;
    }
  };
  return StorageService;
}]);
