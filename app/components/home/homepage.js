'use strict';

angular.module('SmartTrial.components.home.homepage', [
    'ngRoute',
    'SmartTrial.components.studies.crud.createStudy',
    'SmartTrial.shared.services.sortCollection'
])
    .config(['$routeProvider', function Home($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'components/home/homepage.html',
            controller: 'HomeController'
        });
        $routeProvider.when('/studies', {
            templateUrl: 'components/home/homepage.html',
            controller: 'HomeController'
        });
    }])
.controller(
    'HomeController', [
    '$scope',
    '$location',
    'registerStudy',
    'customCollection',
    function HomeController($scope, $location, registerStudy, customCollection) {
        /*
            I have used unnecessary promise only because usually
            it would have been '$http post' request in the service
            and would be waiting success scenario
         */
        $scope.studyCreate = (Study) =>{
            registerStudy.registerStudy(Study)
                .then(
                    () => {
                        $scope.Study={}
                        $('#modal-create-study').modal('close')
                        $('.valid').removeClass('valid')
                        $('.invalid').removeClass('invalid')
                        $('label.active').removeClass('active')
                    },
                    (error) => {
                        /*
                            Won't ever execute in this case because it is simulated promise.
                            I have made it just for the example
                         */
                    }
                )
        }
        $(document).ready(function(){
            $('.collapsible').collapsible();
            $('.modal').modal()
        });
        $scope.$location = $location
        $scope.customCollection = customCollection
    }]
)
    .filter('date', () => {

        return (dateWithSeconds) => {
            let date = new Date(dateWithSeconds)
            let dateFormated = [(date.getDate()<10?'0':'')+(date.getDate()),
                    (date.getMonth()<9?'0':'')+(date.getMonth()+1),
                date.getFullYear()].join('/')

            return dateFormated

        }

    })
    .filter('fullDate', () => {

        return (dateWithSeconds) => {
            let date = new Date(dateWithSeconds)

            let dateFormated =
            [(date.getDate()<10?'0':'')+(date.getDate()),
                (date.getMonth()<9?'0':'')+(date.getMonth()+1),
                date.getFullYear()].join('/') + ' ' +
                [((date.getHours()<10)?'0':'') + date.getHours() ,
            (date.getMinutes()<10?'0':'') + date.getMinutes(),
            (date.getSeconds()<10?'0':'') + date.getSeconds()].join(':')
            return dateFormated

        }
    })
    .filter('recentDatesOnTop', [
        'customCollection',
        (customCollection) => {
        return () => {

        }
    }])
    .filter('building', [
        'sortCollection',
        (sortCollection) => {
        return (collection) => {
            let buildingCollection = sortCollection.getSortedCollections()
            return buildingCollection[0]

        }
    }])
    .filter('production', [
        'sortCollection',
        (sortCollection) => {
            return (collection) => {
                let buildingCollection = sortCollection.getSortedCollections()
                return buildingCollection[1]

            }
        }])
.value('customCollection', angular.fromJson('{\n' +
    '    "studies": [\n' +
    '        {\n' +
    '            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",\n' +
    '            "name": "Hearing Aids",\n' +
    '            "status": "building",\n' +
    '            "subjects": []\n' +
    '        },\n' +
    '        {\n' +
    '            "description": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",\n' +
    '            "name": "Prostetic Legs",\n' +
    '            "status": "production",\n' +
    '            "subjects": [\n' +
    '                {\n' +
    '                    "created": "2017-10-01 10:39:29",\n' +
    '                    "name": "Guntramn Wanderfoot"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-10-05 12:47:44",\n' +
    '                    "name": "Adalhaid Farfoot"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-10-06 08:41:29",\n' +
    '                    "name": "Wala Goodwort"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-10-10 01:40:11",\n' +
    '                    "name": "Vigor Sackville-Baggins"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-10-01 01:51:08",\n' +
    '                    "name": "Zwentibold Grubb"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-10-15 03:01:08",\n' +
    '                    "name": "Brocard Fairbairn"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-10-16 12:39:44",\n' +
    '                    "name": "Priamus Chubb"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-10-02 04:23:50",\n' +
    '                    "name": "Waldolanus Undertree"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-10-20 09:24:45",\n' +
    '                    "name": "Leudast Hopesinger"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-10-23 09:13:56",\n' +
    '                    "name": "Gundahar Fairbairn"\n' +
    '                }\n' +
    '            ]\n' +
    '        },\n' +
    '        {\n' +
    '            "description": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",\n' +
    '            "name": "Dialysis Treatment",\n' +
    '            "status": "production",\n' +
    '            "subjects": [\n' +
    '                {\n' +
    '                    "created": "2016-10-01 05:09:55",\n' +
    '                    "name": "Hatilde Maggot"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-05-01 11:47:01",\n' +
    '                    "name": "Belladonna Gawkroger"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-05-10 05:35:44",\n' +
    '                    "name": "Fatima Silentfoot"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-09-01 02:02:50",\n' +
    '                    "name": "Cheryl Proudbottom"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-09-02 04:29:11",\n' +
    '                    "name": "Vulfegundis Longhole"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-10-01 07:00:22",\n' +
    '                    "name": "Hildegarde Noakesburrow"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-10-23 11:19:25",\n' +
    '                    "name": "Llewella Townsend"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-10-05 05:51:03",\n' +
    '                    "name": "Merwig Gaukrogers"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-10-04 02:26:02",\n' +
    '                    "name": "Jenna Sandheaver"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-10-07 03:21:02",\n' +
    '                    "name": "Theodelinda Bophin"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-10-10 03:14:51",\n' +
    '                    "name": "Hubert Maggot"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-10-13 06:43:13",\n' +
    '                    "name": "Folcard Fairfoot"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-10-12 03:40:18",\n' +
    '                    "name": "Taurin Greenhill"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-10-18 06:10:50",\n' +
    '                    "name": "Remi Elvellon"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-08-09 01:15:37",\n' +
    '                    "name": "Razanur Townsend"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-02-20 03:50:36",\n' +
    '                    "name": "Obo North-took"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-09-03 05:14:38",\n' +
    '                    "name": "Baldrick Longhole"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-10-01 11:44:07",\n' +
    '                    "name": "Arnold Sackville-Baggins"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-10-05 05:12:26",\n' +
    '                    "name": "Gararic Gamgee"\n' +
    '                },\n' +
    '                {\n' +
    '                    "created": "2017-10-21 08:33:15",\n' +
    '                    "name": "Wilibald Featherbottom"\n' +
    '                }\n' +
    '            ]\n' +
    '        }\n' +
    '    ]\n' +
    '}').studies
)