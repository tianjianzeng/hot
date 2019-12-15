$(function() {
    var myChart = echarts.init(document.getElementById('main05'));
    option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '14%'];
            },
            textStyle:{
                fontSize: 16,

            },
            backgroundColor:'#354052' 
        },
    //    toolbox: {
    //     show: true,
    //     feature: {
    //         mark: {
    //             show: true
    //         },
    //         dataView: {
    //             show: true,
    //             readOnly: false
    //         },
    //         magicType: {
    //             show: true,
    //             type: ['stack', 'tiled']
    //         },
    //         restore: {
    //             show: true
    //         },
    //         saveAsImage: {
    //             show: true
    //         }
    //     }
    // },
        legend: {
            data: ['2019年11月', '2019年12月','2020年1月','2020年2月'],
            x: 'center',
            textStyle:{
                fontSize: 12,
                color:'#333'
            },
            top: '0%',
        },
    calculable: true,
    yAxis: [{
        type: 'category',
        data: ['485通讯故障', '二次供高温故障', '二次回高压报警', '二次回低压报警', '二次回高压报警', '一次回低压报警', '一次回高压报警', 
        '一次供温报警', '二次供温报警']
    }],
    xAxis: [{
        name: '抽检数',
        type: 'value'
    }], 
        grid: {
            left: '0%',
            right: '0%',
            bottom: '5%',
            top: '10%',
            containLabel: true,
            borderWidth: '0'
        },
        series: [
        {
            name: '2019年11月',
            type: 'bar',
            stack: '总量',
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'inside'
                    },
                    color: '#c23531'
                }
            },
            data: [133, 333, 222, 874, 678,133, 333, 222,312,321,133, 333, 541, 874,133, 333, 222, 874, 678,133]
        },
        {
            name: '2019年12月',
            type: 'bar',
            stack: '总量',
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'inside'
                    },
                    color: '#144364'
                }
            },
            data: [120, 132, 101, 134, 90,120, 132, 101, 134, 90, 90,120, 132, 101, 134, 90,120, 132, 101, 134]
        },
        {
            name: '2020年1月',
            type: 'bar',
            stack: '总量',
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'inside'
                    },
                    color: '#61a0a8'
                }
            },
            data: [150, 132, 101, 137, 90,120, 132, 101, 134, 90, 90,160, 132, 101, 134, 90,120, 132, 101, 134]
        },
        {
            name: '2020年2月',
            type: 'bar',
            stack: '总量',
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'inside'
                    },
                    color: '#992a71'
                }
            },
            data: [120, 142, 101, 134, 90,140, 132, 101, 134, 40, 90,120, 132, 101, 154, 90,120, 132, 101, 134]
        }
        

    ]
    };
    myChart.setOption(option);
});