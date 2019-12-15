$(function() {
    var myChart = echarts.init(document.getElementById('main01'));
    option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {type: 'cross'}
    },  
    "backgroundColor": "#ffffff",
    textStyle: {
                color: '#fff',
                fontWeight: '50'
            },
    legend: {
        data:['一次供暖','一次回温','二次供暖','二次回温'],
        top:'0',
    textStyle: {
                    color: '#333',
                    fontWeight: '50'
                }
        },
    
    xAxis: [
            {
            type: 'category',
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            boundaryGap: true,
             axisLabel: {   // X轴线 标签修改
                     textStyle: {
                         color: '#333', //坐标值得具体的颜色
                     }
                 },
            data: ['2019-01','2019-02','2019-03','2019-04','2019-05','2019-06']
        }],
    yAxis: [
        {
            type: 'value',
            name: '',
            axisLabel: {
                formatter: '{value}'
            }
            
        },
        {
            type: 'value',
            position: 'right',
            axisLabel: {
                formatter: '{value}',
            }
        },
       
    ],
      "dataZoom": [{
        "show": true,
        "height": 30,
        "xAxisIndex": [
            0
        ],
        bottom: 30,
        "start": 10,
        "end": 80,
        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        handleSize: '110%',
        // handleStyle:{
        //     color:"#d3dee5",
            
        // },
        //    textStyle:{
        //     color:"#fff"},
        //    borderColor:"#90979c"
        handleStyle: { /*手柄的样式*/
                color: "#40bcf9",
                borderColor: "#1fb2fb"
            },
            backgroundColor: "#e2f3ff", /*背景 */
            dataBackground: { /*数据背景*/
                lineStyle: {
                    color: "#fff"
                },
                areaStyle: {
                    color: "#d4d9dd"
                }
        },
        
    },
     {
        "type": "inside",
        "show": true,
        "height": 15,
        "start": 1,
        "end": 35
    }],
    grid: {
            left: '1.2%',
            right: '0',
            bottom: '20%',
            top: '8%',
            containLabel: true,
            borderWidth: '0'
        },
    series: [
        {
            name:'一次供暖',
            type:'line',
            yAxisIndex: 1,
            itemStyle:{normal:{color:'#3d74c9'}},
            data:[3054, 2327, 2887, 2200, 3229, 3135, 1938, 1463, 2436, 5821, 3732, 3022,3054, 2927,2887, 2500, 2229, 2135, 1938, 2463, 2436, 3821, 2732, 2022],
             markPoint : {
                color:'blue',
                data : [
                    // {type : 'max', name : '最大值'},
                     {type : 'min', name : '最小值'}
                ]
            }
            
        },
        {
            name:'一次回温',
            type:'line',
            yAxisIndex: 1,
            itemStyle:{normal:{color:'#ff9933'}},
            data:[2637, 1287, 2938, 2292,3289,2325, 3368,2453,4836,4381,2722,2642,1622, 1101,1209,2116,1599,1604,1203,1804,1992,1510,1392, 1640],
             markPoint : {
                color:'blue',
                data : [
                    // {type : 'max', name : '最大值'},
                     {type : 'min', name : '最小值'}
                ]
            }
            
        },
        {
            name:'二次供暖',
            type:'line',
            yAxisIndex: 1,
            itemStyle:{normal:{color:'#4eac85'}},
            data:[637, 987, 2238, 2292, 3289, 2325, 3368, 2453, 4836, 4381, 1722, 1842,922, 801, 709, 1316, 1199, 1004, 903,737, 887, 938, 992, 989, 1325, 1368,],
             markPoint : {
                color:'blue',
                data : [
                    // {type : 'max', name : '最大值'},
                     {type : 'min', name : '最小值'}
                ]
            }
            
        },
        {
            name:'二次回温',
            type:'line',
            yAxisIndex: 1,
            itemStyle:{normal:{color:'#b81c1c'}},
            data:[637, 987, 102, 2292, 3289, 2325, 3368, 2453, 4836, 650, 1722, 1842,922, 801, 709, 1316, 1199, 1004, 903,737, 887, 938, 992, 989, 1325, 1368,],
             markPoint : {
                color:'blue',
                data : [
                    // {type : 'max', name : '最大值'},
                     {type : 'min', name : '最小值'}
                ]
            }
            
        }
    ]
    
};

    myChart.setOption(option);
});