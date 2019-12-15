$(function() {
    var myChart = echarts.init(document.getElementById('main03'));
    var xData = function() {
    var data = [];
    for (var i =1; i < 15; i++) {
        data.push(i + "");
    }
    return data;
}();

option = {
    "title": {
        // "text": "16年1月-16年11月充值客单分析",
        // "subtext": "BY MICVS",
        x: "4%",

        textStyle: {
            color: '#fff',
            fontSize: '22'
        },
        subtextStyle: {
            color: '#90979c',
            fontSize: '16',

        },
    },
    "tooltip": {
        "trigger": "axis",
        "axisPointer": {
            "type": "shadow",
            textStyle: {
                color: "#fff"
            }

        },
    },
    "grid": {
        "borderWidth": 0,
        "top": '6%',
        "bottom": '20%',
        "left":'4.1%',
        "right":'0',
        textStyle: {
            color: "#fff"
        }
    },
    "legend": {
        x: 'center',
        textStyle: {
            color: '#333',
        },
        "data": ['累计热量', '供热面积']
    },
     

    "calculable": true,
    "xAxis": [{
        "type": "category",
        "axisLine": {
            lineStyle: {
                color: '#333'
            }
        },
        "splitLine": {
            "show": false
        },
        "axisTick": {
            "show": false
        },
        "splitArea": {
            "show": false
        },
        "axisLabel": {
            "interval": 0,

        },
        "data": xData,
    }],
    "yAxis": [{
        "type": "value",
        "splitLine": {
            "show": false
        },
        "axisLine": {
            lineStyle: {
                color: '#333'
            }
        },
        "axisTick": {
            "show": false
        },
        "axisLabel": {
            "interval": 0,

        },
        "splitArea": {
            "show": false
        },

    }],
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
                    color: "#000000"
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
    "series": [{
            "name": "累计热量",
            "type": "bar",
            "stack": "总量",
            "barMaxWidth": 50,
            "barGap": "10%",
            "itemStyle": {
                "normal": {
                    "color": "#5fbdff",
                    "label": {
                        "show": true,
                        "textStyle": {
                            "color": "#fff"
                        },
                        "position": "insideTop",
                        formatter: function(p) {
                            return p.value > 0 ? (p.value) : '';
                        }
                    }
                }
            },
            "data": [
                198.66,
                330.81,
                151.95,
                160.12,
                222.56,
                229.05,
                128.53,
                250.91,
                224.47,
                473.99,
                126.85,
                260.50
            ],
        },

        {
            "name": "供热面积",
            "type": "bar",
            "stack": "总量",
            "itemStyle": {
                "normal": {
                    "color": "#a2d5f8",
                    "barBorderRadius": 0,
                    "label": {
                        "show": true,
                        "position": "insideTop",
                        "textStyle": {
                            "color": "#333"
                        },
                        formatter: function(p) {
                            return p.value > 0 ? (p.value) : '';
                        }
                    }
                }
            },
            "data": [
                82.89,
                67.54,
                62.07,
                59.43,
                67.02,
                67.09,
                35.66,
                71.78,
                81.61,
                78.85,
                79.12,
                72.30
            ]
        }, {
            "name": "总",
            "type": "line",
            // "stack": "总量",
            symbolSize:3,
            symbol:'circle',
            "itemStyle": {
                "normal": {
                    "color": "#feb651",
                    // "barBorderRadius": 0,
                    // "label": {
                       // "show": true,
                        // "position": "top",
                        // formatter: function(p) {
                        //     return p.value > 0 ? (p.value) : '';
                        // }
                    // }
                }
            },
            "data": [
                281.55,
                398.35,
                214.02,
                219.55,
                289.57,
                296.14,
                164.18,
                322.69,
                306.08,
                552.84,
                205.97,
                332.79
            ]
        },
    ]
}
    myChart.setOption(option);
});