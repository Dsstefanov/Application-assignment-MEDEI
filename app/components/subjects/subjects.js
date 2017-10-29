'use strict'
angular.module('SmartTrial.components.subjects.subjects', [])
.config(['$routeProvider', function Subject($routeProvider){
    $routeProvider.when('/subjects', {
        templateUrl: 'components/subjects/subjects.html',
        controller: 'SubjectsController'
    })
}])
.controller('SubjectsController', [
    '$scope',
    'customCollection',
    function StudyController($scope, customCollection, ){
        let subjectsCollection = []
        customCollection.forEach((Study) => {
            Study.subjects.forEach((Subject) => {
                Subject.project = Study.name
                subjectsCollection.push(Subject)
            })
        })
        $scope.subjectsCollection = subjectsCollection
    }
])