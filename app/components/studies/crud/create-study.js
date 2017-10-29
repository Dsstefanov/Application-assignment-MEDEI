'use strict'
/*creating study is part of homepage inside a modal so it has no template*/
angular.module('SmartTrial.components.studies.crud.createStudy', [])
    .factory('registerStudy', [
        '$q',
        'customCollection' ,
        ($q, customCollection) => {
        /*
            I made a promise just because it is usually supposed
            to connect to the server and bring back response.
            I know it is not necessary in this case
         */
            function registerStudy(Study) {
                let deferred = $q.defer()
                customCollection.push({
                    name: Study.name,
                    description: Study.description,
                    status: 'building',
                    subjects: []
                })
                    ?
                    deferred.resolve("Successfully create study")
                    :
                    /*
                        It will not ever go in this case I made it just to show how it usually
                        would work if i have sent request to server
                     */
                    deferred.reject('Unfortunately the save was not created')

                return deferred.promise
            }
            return {
                registerStudy : registerStudy
            }
        }
    ])