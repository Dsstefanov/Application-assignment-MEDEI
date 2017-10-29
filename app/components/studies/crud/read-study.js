'use strict';

angular.module('SmartTrial.components.studies.crud.readStudy', ['ngRoute'])

    .config(['$routeProvider', function Home($routeProvider) {
        $routeProvider.when('/studies/:studyId', {
            templateUrl: 'components/studies/crud/read-study.html',
            controller: 'StudiesController'
        });
    }])
    .controller('StudiesController', [
        '$scope',
        '$routeParams',
        '$location',
        'customCollection',
        'chartInitialize',
        function StudiesController($scope, $routeParams, $location, customCollection, chartInitialize) {
            let currentStudy = customCollection[$routeParams.studyId]
            let diagram=false
            $(document).ready(() => {
                let data = chartInitialize.parseAndSort(currentStudy.subjects)
                console.log(data)
                if (data[data.length - 1] - data[0] > 518400000) {
                    diagram = true
                    let diagramCtx = $('#chart')
                    console.log(diagramCtx)
                    chartInitialize.generateChart(currentStudy.subjects, 'Subjects', diagramCtx)
                }
            })
            $scope.diagram=diagram
            $scope.goToStudies = () => {
                $location.path('/studies')
            }
            $scope.currentStudy = currentStudy
            $scope.edit = () => {
                $location.path('/studies/edit/' + $routeParams.studyId)
            }
        }
    ])