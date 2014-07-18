angular.module("timerino.Token", []).
factory("TokenService", [function() {

  var Radixer = function () {
    var CHARACTERS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$-_.+!*'()";

    function _toBase(number, radix) {
      /* Stolish from http://stackoverflow.com/questions/14605096/change-base-of-a-number-in-javascript-using-a-given-digits-array */
      radix = radix || CHARACTERS.length;
      digits = CHARACTERS.split("").slice(0, radix)

      if (radix < 1 || radix > digits.length) {
        throw Error("Radix " + radix + " not supported, use 1-" + CHARACTERS.length +".");
      }

      if (number === 0) return digits[0];
      var a = [];
      while (number) {
        a.splice(0, 0, digits[number % radix]);
        number = parseInt(number / radix);
      }
      return a.join("");
    }

    return {
      toString: function(num, base) {
        return _toBase(num, base);
      },
      parse: function(num, base) {
        base = base || CHARACTERS.length;

        var value = 0;
        var index = num.length - 1;
        var multiplier = 1;
        while (index >= 0) {
          multiplier = Math.pow(base, (num.length - index - 1));
          value += CHARACTERS.indexOf(num[index]) * multiplier;
          index -= 1;
        }
        return value;
      }
    };
  }();

  function buildMiniTimesToken(times) {
    var minTimed = Number.MAX_VALUE;
    var minWhen = Number.MAX_VALUE;
    for (var i = 0; i < times.length; i++) {
        if (times[i].timed < minTimed) minTimed = times[i].timed;
        if (times[i].when < minWhen) minWhen = times[i].when;
    }
    var output = [new Date().getTime() - minWhen, minWhen, minTimed];
    for (var i = 0; i < times.length; i++) {
        output.push(times[i].when - minWhen);
        output.push(times[i].timed - minTimed);
    }
    return _minimize(output);
  }

  function _minimize(nums) {
    function _stringify(nums, base) {
      var copy = nums.slice(0, nums.length);
      copy.unshift(Radixer.toString(base));
      return copy.join(',');
    }

    var min = _stringify(nums, 10);
    for (var base = 26; base <= 72; base += 1) {
      var newCandidate = [];
      for (var i = 0; i < nums.length; i += 1) {
        newCandidate.push(Radixer.toString(nums[i], base));
      }
      var packedCandidate = _stringify(newCandidate, base);

      if (packedCandidate.length < min.length) {
        min = packedCandidate;
      }
    }

    return min;
  }

  function _maximize(nums) {
    var base = Radixer.parse(nums[0]);
    var output = [];

    for (var i = 1; i < nums.length; i++) {
      output.push(Radixer.parse(nums[i], base));
    }
    return output;
  }

  function parseMiniTimesToken(token) {
    var input = token.split(",");
    if (input.length < 4) return "invalid";

    input = _maximize(input);

    var minWhen = input[1],
        minTimed = input[2],
        when = input[0] + minWhen;

    var output = {
        when: when,
        times: [],
        best: []
    };
    for (var i = 3; i + 1 < input.length; i += 2) {
      var destination = (i < 3 + (input.length - 3) / 2) ? output.times : output.best;
      destination.push({
          when: input[i] + minWhen,
          timed: input[i + 1] + minTimed
      });
    }

    return output;
  }

  var TokenService = {
    tokenTimes: function (latest, best) {
      if (latest.length != best.length) {
        throw Error("Cannot merge times of different lenghts.");
      }
      return buildMiniTimesToken(latest.concat(best));
    },
    unpackToken: function (token) {
      return parseMiniTimesToken(token);
    }
  };

  return TokenService;
}]);
