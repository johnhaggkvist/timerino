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
    },
    getBest: function (number) {
      var times = this.getTimes();
      times.sort(function (a, b) {
        return a.timed - b.timed;
      });
      if (times.length > number)
        return times.slice(0, number);
      return times;
    },
    killTime: function (index, time) {
      var everything = this.getEverything(profile);
      if (everything.times.length > index) {
        var foundTime = everything.times[index];
        if (foundTime && foundTime.timed === time.timed && foundTime.when === time.when) {
          everything.times.splice(index, 1);
          pushToStorage(profile, everything);
        }
      }
    }
  };
  return StorageService;
}]);
