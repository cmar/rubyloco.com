var app = angular.module('rubyLoco', [])

app.factory('Meetup', ['$http', function($http) {

  var photos = function() {
    return $http.jsonp("http://api.meetup.com/2/photos/?group_id=8825222&order=time&desc=True&offset=0&format=json&page=200&fields=&sig_id=9228642&sig=05f5138c0ffcee4bbbbd69a33edb6e591f6bcc0b&callback=JSON_CALLBACK")
  }

  var events = function() {
    return $http.jsonp("http://api.meetup.com//2/events/?group_id=8825222&status=upcoming&order=time&limited_events=False&desc=false&offset=0&format=json&page=200&fields=&sig_id=9228642&sig=7e9df3f8cdbe03c41cb42ee8aa90def04e71bf68&callback=JSON_CALLBACK")
  }

  var sponsors = function() {
    return $http.jsonp("http://api.meetup.com/2/groups?group_id=8825222&radius=25.0&order=id&desc=false&offset=0&format=json&page=500&fields=sponsors&sig_id=13745894&sig=288da9174a8ce352ee1bdc0af34013592d49f612&callback=JSON_CALLBACK")
  }

  return {
    events: events,
    photos: photos,
    sponsors: sponsors
  }
}])

app.controller('EventsCtrl', ['Meetup', function(meetup) {
  var self = this

  self.upcoming = []

  self.update = function() {
    meetup.events()
      .success(function(data, status, headers, config) {
        self.upcoming = data.results.slice(0, 3)
      })
      .error(function(data, status, headers, config) {
        console.log(data)
      })
  }

  self.update()
}])

app.controller('PhotosCtrl', ['Meetup', function(meetup) {
  var self = this

  self.recent = []

  self.update = function() {
    meetup.photos()
      .success(function(data, status, headers, config) {
        self.recent = data.results
      })
      .error(function(data, status, headers, config) {
        console.log(data)
      })
  }

  self.update()
}])

app.controller('SponsorsCtrl', ['Meetup', function(meetup) {
  var self = this

  self.all = []

  self.update = function() {
    meetup.sponsors()
      .success(function(data, status, headers, config) {
        self.all = data.results[0].sponsors
      })
      .error(function(data, status, headers, config) {
        console.log(data)
      })
  }

  self.update()
}])
