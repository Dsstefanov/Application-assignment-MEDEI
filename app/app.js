'use strict';

// Declare app level module which depends on views, and components
angular.module('SmartTrial', [
    'ngRoute',
    'SmartTrial.components.home.homepage',
    'SmartTrial.components.studies.crud.createStudy',
    'SmartTrial.components.studies.crud.readStudy',
    'SmartTrial.components.studies.crud.updateStudy',
    'SmartTrial.shared.services.sortCollection',
    'SmartTrial.components.subjects.subjects',
    'SmartTrial.shared.services.chartInit'
])
    .
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!')
  $routeProvider.otherwise({redirectTo: '/'})
}])