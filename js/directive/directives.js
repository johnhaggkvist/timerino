angular.module("timerino.Directives", []).
filter('timed', function() {
  return function (millis) {
  	if (isNaN(millis))
  		return millis;
  	
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
  };
});