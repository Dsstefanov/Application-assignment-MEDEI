'use strict'
angular.module('SmartTrial.shared.services.sortCollection', [])
    .factory('sortCollection', [
        'customCollection',
        (customCollection) => {
            function getSortedCollections() {
                let finalCollection = []
                let buildingCollection = []
                let productionCollection = []
                let id=0
                customCollection.forEach((Study) => {
                    Study.id = id
                    if (Study.status === 'building') {
                        buildingCollection.push(Study)
                    } else {
                        productionCollection.push(Study)
                    }
                    id++
                })
                finalCollection[0] = buildingCollection
                finalCollection[1] = productionCollection
                return finalCollection
            }

            return {
                getSortedCollections: getSortedCollections
            }
        }
        ])