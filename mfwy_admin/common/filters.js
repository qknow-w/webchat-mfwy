angular.module("zy.filters", []).filter("isFuture", function() {
  return function(input) {
    return new Date(input) > new Date();
  };
}).filter("utc", function() {
  return function(val) {
    var date;
    date = new Date(val);
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  };
}).filter('fromNow', function() {
  return function(input) {
    if (input == null) {
      return;
    }
    return moment(input).fromNow();
  };
}).filter("line", function() {
  return function(input) {
    if (input == null) {
      return;
    }
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br />');
  };
}).filter('fileSize', function() {
  return function(bytes) {
    if (bytes === null || bytes === void 0) {
      return bytes;
    }
    if (typeof bytes !== 'number') {
      return '';
    }
    if (bytes >= 1000000000) {
      return (bytes / 1000 * 1000 * 1000).toFixed(2) + ' GB';
    }
    if (bytes >= 1000000) {
      return (bytes / 1000 * 1000).toFixed(2) + ' MB';
    }
    return (bytes / 1000).toFixed(2) + ' KB';
  };
}).filter('remoteImage', function() {
  return function(input) {
    if (input == null) {
      return;
    }
    return config.url.img + input;
  };
}).filter('gravatar', function() {
  return function(input) {
    if (input) {
      return 'http://www.gravatar.com/avatar/' + md5(input);
    } else {
      return '/img/avatar.png';
    }
  };
});
