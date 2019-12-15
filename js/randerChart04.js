$(function() {
    var app = {};
    var myChart= echarts.init(document.getElementById('main04'));
     var cellSize = [60, 60];
     var pieRadius = 25;

    function getVirtulData() {
        var date = +echarts.number.parseDate('2017-02-01');
        var end = +echarts.number.parseDate('2017-03-01');
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        for (var time = date; time < end; time += dayTime) {
            data.push([
                echarts.format.formatTime('yyyy-MM-dd', time),
                Math.floor(Math.random() * 10000)
            ]);
        }
        return data;
    }

    function getPieSeries(scatterData, chart) {
        return echarts.util.map(scatterData, function(item, index) {
            var center = chart.convertToPixel('calendar', item);
            return {
                id: index + 'pie',
                type: 'pie',
                center: center,
                label: {
                    normal: {
                        formatter: '{c}',
                        position: 'inside'
                    }
                },
                tooltip: {
                    formatter: '{c} 小时'
                },
                radius: pieRadius,
                data: [{
                        name: '低压报警',
                        value: Math.round(Math.random() * 5)
                    },
                    {
                        name: '供高温报警',
                        value: Math.round(Math.random() * 5)
                    },
                    {
                        name: '睡觉',
                        value: Math.round(Math.random() * 5)
                    }
                ]
            };
        });
    }

    function getPieSeriesUpdate(scatterData, chart) {
        return echarts.util.map(scatterData, function(item, index) {
            var center = chart.convertToPixel('calendar', item);
            return {
                id: index + 'pie',
                center: center
            };
        });
    }
    var scatterData = getVirtulData();

    option = {
        tooltip: {},
        // title: {
        //     text: '鬼猫猫五月每天工作组成',
        //     top: 40,
        //     left: 'center',
        //     subtext: '本数据纯属虚构'

        // },
        legend: {
            data: ['低压报警', '供高温报警', '睡觉'],
            top:0,

        },
        calendar: {
            top: '20%',
            left: 'center',
            orient: 'vertical',
            cellSize: cellSize,
            yearLabel: {
                show: false,
                textStyle: {
                    fontSize: 24
                }
            },
            dayLabel: {
                margin: 20,
                firstDay: 1,
                nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
            },
            monthLabel: {
                show: false
            },
            range: ['2017-02']
        },
        series: [{
            id: 'label',
            type: 'scatter',
            coordinateSystem: 'calendar',
            symbolSize: 1,
            label: {
                normal: {
                    show: true,
                    formatter: function(params) {
                        return echarts.format.formatTime('dd', params.value[0]);
                    },
                    offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
                    textStyle: {
                        color: '#000',
                        fontSize: 14
                    }
                }
            },
            data: scatterData
        }]
    };
    
    if (!app.inNode) {
        var pieInitialized;
        setTimeout(function() {
            pieInitialized = true;
            myChart.setOption({
                series: getPieSeries(scatterData, myChart)
            });
        }, 10);

        app.onresize = function() {
            if (pieInitialized) {
                myChart.setOption({
                    series: getPieSeriesUpdate(scatterData, myChart)
                });
            }
        };
    }
    myChart.setOption(option);
});