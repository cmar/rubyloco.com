var app = angular.module('rubyLoco', []);

app.factory('meetup', ['$http', function($http) {

  var photos = function() {
    return $http.jsonp("http://api.meetup.com/2/photos/?group_id=8825222&order=time&desc=True&offset=0&format=json&page=200&fields=&sig_id=9228642&sig=05f5138c0ffcee4bbbbd69a33edb6e591f6bcc0b&callback=JSON_CALLBACK")
  }

  var events = function() {
    return $http.jsonp("http://api.meetup.com//2/events/?group_id=8825222&status=upcoming&order=time&limited_events=False&desc=false&offset=0&format=json&page=200&fields=&sig_id=9228642&sig=7e9df3f8cdbe03c41cb42ee8aa90def04e71bf68&callback=JSON_CALLBACK")
  }

  return {
    events: events,
    photos: photos
  }
}])

app.controller('PhotosCtrl', ['meetup', function(meetup) {
  var self = this;

  self.events = []
  self.photos = []

  self.update = function() {
    meetup.events()
      .success(function(data, status, headers, config) {
        self.events = data.results.slice(0, 3);
      })
      .error(function(data, status, headers, config) {
        console.log(data)
      });

    meetup.photos()
      .success(function(data, status, headers, config) {
        self.photos = data.results;
      })
      .error(function(data, status, headers, config) {
        console.log(data)
      });
  }

  self.update()
}])
