angular.module("timerino.Token", []).
factory("TokenService", [function() {
  function buildMiniTimesToken(times) {
    var minTimed = Number.MAX_VALUE;
    var minWhen = Number.MAX_VALUE;
    for (var i = 0; i < times.length; i++) {
        if (times[i].timed < minTimed) minTimed = times[i].timed;
        if (times[i].when < minWhen) minWhen = times[i].when;
    }
    var output = ["t", new Date().getTime() - minWhen, minWhen, minTimed];
    for (var i = 0; i < times.length; i++) {
        output.push(times[i].when - minWhen);
        output.push(times[i].timed - minTimed);
    }
    return output.join(",");
  }

  function parseMiniTimesToken(token) {
    var input = token.split(",");
    if (input.length < 4) return "invalid";

    var type = input[0],
        minWhen = parseInt(input[2], 10),
        minTimed = parseInt(input[3], 10),
        when = parseInt(input[1], 10) + minWhen;

    var output = {
        when: when,
        times: []
    };
    for (var i = 4; i + 1 < input.length; i += 2) {
        output.times.push({
            when: parseInt(input[i], 10) + minWhen,
            timed: parseInt(input[i + 1], 10) + minTimed
        });
    }

    return output;
  }

  var TokenService = {
    TYPE_TIMES: 'times',
    _tokenify: function (something) {
      return Base64.encode(something);
    },
    tokenTimes: function (times) {
      return buildMiniTimesToken(times);
    },
    unpackToken: function (token) {
      return parseMiniTimesToken(token);
    }
  };

  return TokenService;
}]);
