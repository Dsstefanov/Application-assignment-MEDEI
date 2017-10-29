'use strict'

angular.module('SmartTrial.shared.services.chartInit',[])
.factory('chartInitialize', () => {
    function generateChart(Subjects, label, context) {
        /*
            data[0] holds array of the dates in the chart
            data[1] holds array of the subject count according to the date
            data[2] holds chart label
         */
        let data = []
        data[0] = getDatesForChart(Subjects)
        data[1] = getSubjectsFromDates(data[0], Subjects)
        data[2] = label
        initChart(data, context)
    }
    function parseAndSort(Subjects){
        let parsedDates = []
        angular.forEach(Subjects, (subject) => {
            parsedDates.push(Date.parse(subject.created))
        })
        parsedDates = parsedDates.sort((a, b) => a - b)
        return parsedDates
    }
    function getDatesForChart(Subjects){
        let finalArray = []
        let parsedDates = parseAndSort(Subjects)
        let timestampsArray = getSevenDatesForChart(parsedDates)
        for(let i=0; i<7; i++){
            let dateObj = new Date(timestampsArray[0][i])
            let month = ((dateObj.getMonth() + 1)<10?'0':'')+(dateObj.getMonth()+1)
            let day = (dateObj.getDate()<10?'0':'')+ dateObj.getDate()
            let year = dateObj.getFullYear()
            let newDate = year + "-" + month + "-" + day;
            finalArray[i]=(newDate)
        }
        return finalArray
    }

    function getSevenDatesForChart(parsedDates){
        let sortedDates = parsedDates.sort(function(x, y){
            return x - y;
        })
        let finalArray = []
        finalArray.push(getSevenElements(sortedDates[sortedDates.length-1], sortedDates[0]));
        return finalArray
    }
    function getSevenElements(lastDate, firstDate){
        let portionInBetween = (lastDate-firstDate)/6
        let sevenElements = []
        sevenElements.push(firstDate)
        for(let i=1; i<6; i++){
            sevenElements.push(firstDate+i*portionInBetween)
        }
        sevenElements.push(lastDate)
        return sevenElements
    }
    function getSubjectsFromDates(data, Subjects){
        let subjectsCountArray = []
        let sortedDates = parseAndSort(Subjects)
        let datesOfTimeStamps = []
        for(let i=0; i<7;i++){
            datesOfTimeStamps[i] = Date.parse(data[i])
        }
        /*
        Optimization done: Because sortedDates array is sorted beforehand
        we can just optimize the inner loop to start from the previous endpoint
         */
        let j=0
        let count =0
        for(let i=0; i<7;i++){
            for(;j<sortedDates.length;){
               if(datesOfTimeStamps[i] >= sortedDates[j]){
                   count++
                   j++
               }else{
                   subjectsCountArray[i] = count;
                   break
               }
            }
        }
        return subjectsCountArray
    }
    function initChart(data, context){
        let chart = new Chart(context, {
            type: 'line',
            data: {
                labels: data[0],
                datasets: [{
                    label: data[2],
                    data: data[1],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        })
    }

    return {
        generateChart: generateChart,
        parseAndSort: parseAndSort
    }
})