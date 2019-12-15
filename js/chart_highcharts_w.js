var chart = new Highcharts.Chart('container', {
    title: {
        text: '',
        x: -20
    },
    zIndex:7,
    // subtitle: {
    //     text: '数据来源: WorldClimate.com',
    //     x: -20
    // },
    xAxis: {
        categories: ['02-10', '02-14', '02-18', '02-22', '02-26', '03-04', '03-08', '03-12'],
        tickmarkPlacement: 'on'
    },
    yAxis: {
        lineColor: '#888888',
        lineWidth: 1,
        title: {
            text: ''
        },
        offset:0,
        labels: {
                align: 'center',
                x: -15,
                y: 0,
                zIndex:9,
                formatter: function () {  
                            return this.value + '%';//y轴加上%  
                }  
            },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }],
    },
    tooltip: {
            backgroundColor:'#ffffff',
            shared: true,
            useHTML: true,
            headerFormat: '<small style="color:#7a7a7a;font-size:14px">{point.key}</small><table style="border:0;font-size:11px;">',
            pointFormat: '<tr><td style="border:0;background:#fff;color:#191919">{series.name}: </td>' +
            '<td style="text-align: right;border:0;background:#fff;color:#191919">{point.y} %</td></tr>',
            footerFormat: '</table>',
            valueDecimals: 2
            // /valueSuffix: '%'//标示框后缀加上%  
        },
    legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'top',
        borderWidth: 0
    },
    series: [{
        name: '一次供压',
        data: [7.0, 6.9, 9.5, 25.2, 23.3, 18.3, 13.9, 9.6],
        color: '#ec5051'
    }, {
        name:'一次回压',
        data: [-0.2, 0.8, 5.7, 24.8, 20.1, 14.1, 8.6, 2.5],
        color:'#f0852a'
    },
    {
        name:'二次供压',
        data: [-0.4, 0.6, 8, 20.8, 6.1, 18.1, 18.6, 2.5],
        color:'#389af4'
    },
     {
        name:'二次回压',
        data: [-0.2, 0.67, 8.7, 24.8, 60.1, 14.1, 8.6, 2.5],
        color:'#a181fc'
    }]
});