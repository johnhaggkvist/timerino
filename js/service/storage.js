angular.module("timerino.Storage", []).
factory("storageService", ['', function() {
  console.log("starting StorageService");
  
  function pullFromStorage(profile) {
    if ('localStorage' in window && window['localStorage'] !== null) {
      return JSON.parse(localStorage.getItem("timerino_profile_" + profile));
    }
    return {
      times: []
    };
  }

  function pushToStorage(profile, data) {
    if ('localStorage' in window && window['localStorage'] !== null) {
      return localStorage.setItem("timerino_profile_" + profile, JSON.stringify(data));
    }
  }

  var profile = "timerino";

  var storageService = {
    putTime: function (time) {
      var everything = pullFromStorage(profile);
      everything.times.push({
        timed: time,
        when: new Date().getTime()
      });
      pushToStorage(profile, everything);
    },
    getTimes: function () {
      var everything = pullFromStorage(profile);
      return everything.times;
    }
  };
  return storageService;
}]);
