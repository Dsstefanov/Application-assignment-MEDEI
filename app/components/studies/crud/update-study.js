'use strict'
angular.module('SmartTrial.components.studies.crud.updateStudy', [])
    .config(['$routeProvider', function Home($routeProvider) {
        $routeProvider.when('/studies/edit/:studyId', {
            templateUrl: 'components/studies/crud/update-study.html',
            controller: 'EditStudyController'
        });
    }])
    .controller('EditStudyController', [
        '$scope',
        '$routeParams',
        '$location',
        '$timeout',
        'customCollection',
        'editStudy',
        function EditStudyController($scope, $routeParams, $location, $timeout, customCollection, editStudy) {
            let currentStudy = customCollection[$routeParams.studyId]
            $scope.segmentedMenu = currentStudy.subjects.length === 0
            let changeStatus = (status) => {
                if (status === 'building') {
                    if (currentStudy.subjects.length !== 0) {
                        $scope.segmentedMenu = false
                    } else {
                        currentStudy.status = status
                    }
                } else {
                    currentStudy.status = status
                }
            }
            $scope.changeStatus = changeStatus
            let Subject = {}
            $scope.Subject = Subject
            let addSubject = () => {
                let firstname = $scope.Subject.firstname
                let surname = $scope.Subject.surname
                let fullName = firstname + ' ' + surname
                $scope.segmentedMenu = false
                currentStudy.subjects.unshift({
                    name: fullName,
                    created: takeNewDate()
                })
                $('#firstname-label').removeClass('active')
                $('#surname-label').removeClass('active')
                $scope.Subject = {}
            }
            let takeNewDate = () => {
                let d = new Date
                let dateFormated = [d.getFullYear(),
                        ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1),
                        (d.getDate() < 10 ? '0' : '') + d.getDate()].join('-') + ' ' +
                    [d.getHours() < 10 ? '0' : '' + d.getHours(),
                        (d.getMinutes() < 10 ? '0' : '') + d.getMinutes(),
                        (d.getSeconds() < 10 ? '0' : '') + d.getSeconds()].join(':')
                return dateFormated
            }
            $scope.addSubject = addSubject
            let save = () => {
                let message = [] // 0: hasMessage, //1: messageClass, 2: message
                editStudy
                    .editStudy(currentStudy, $routeParams.studyId)
                    .then(
                        (result) => {//optional param result comes with success string
                            message[0] = true
                            message[1] = 'success'
                            message[2] = result
                        },
                        (error) => {
                            message[0] = true
                            message[1] = 'error'
                            message[2] = error
                        }
                    )
                $scope.message = message
                $timeout(() => {
                    $scope.message = {}
                }, 2000)
            }
            $scope.currentStudy = currentStudy
            $scope.save = save
            $scope.goToView = () => {
                $location.path('/studies/' + $routeParams.studyId)
            }
            $(document).ready(() => {
                $('.materialize-textarea').trigger('autoresize');
            })
        }
    ])
    /*
        unnecessary for now but if http request is made to server will be required
    */
    .factory('editStudy', [
        '$q',
        ($q) => {
            function editStudy() {
                let deferred = $q.defer()
                try {
                    deferred.resolve("Successfully saved")
                } catch (e) {
                    deferred.reject(e)
                }
                return deferred.promise
            }

            return {
                editStudy: editStudy
            }
        }
    ])