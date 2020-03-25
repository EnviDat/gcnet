function sheight(station) {

    var sheight_historical = AmCharts.makeChart("sheight_historical", {
        "type": "serial",
        "theme": "dark",
        "marginRight": 30,
        "autoMarginOffset": 20,
        "marginTop": 7,
        "legend": {
            "equalWidths": true,
            "useGraphSettings": true,
            "align": "left",
            "valueAlign": "left",
            "valueText": "[[value]] m",
            "valueWidth": 100
        },
        "titles": [{
            "text": "Historical (daily mean)",
            "color": "#E8E8E8",
            "size": 16
        }],
        "dataLoader": {
            "id": "file1",
            "url": "https://www.wsl.ch/gcnet/data/" + station + "sheight.json"
        },
        "mouseWheelZoomEnabled": false,
        "graphs": [{
                "id": "sheightHistoricalSheight1",
                "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>1: [[value]] m</span></b>",
                "bullet": "round",
                "bulletBorderAlpha": 0.5,
                "bulletAlpha": 0.5,
                "bulletSize": 1,
                "connect": false,
                "bulletColor": "#689DE2",
                "hideBulletsCount": 500,
                "title": "Snow height 1",
                "valueField": "Sheight1",
                "type": "line",
                "lineColor": "#689DE2",
                "lineThickness": 1.1,
                "useLineColorForBulletBorder": true,
            },
            {
                "id": "sheightHistoricalSheight2",
                "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>2: [[value]] m</span></b>",
                "bullet": "round",
                "bulletBorderAlpha": 0.5,
                "bulletAlpha": 0.5,
                "bulletSize": 1,
                "bulletColor": "#3275CD",
                "hideBulletsCount": 500,
                "title": "Snow height 2",
                "connect": false,
                "valueField": "Sheight2",
                "type": "line",
                "lineColor": "#3275CD",
                "lineThickness": 1.1,
                "useLineColorForBulletBorder": true
            }
        ],
        "chartScrollbar": {
            "oppositeAxis": false,
            "offset": 30,
            "scrollbarHeight": 20,
            "backgroundAlpha": 0,
            "selectedBackgroundAlpha": 0.1,
            "selectedBackgroundColor": "#888888",
            "graphFillAlpha": 0,
            "graphLineAlpha": 0.5,
            "selectedGraphFillAlpha": 0,
            "selectedGraphLineAlpha": 1,
            "autoGridCount": true,
            "color": "#AAAAAA"
        },
        "chartCursor": {
            "pan": false,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "parseDates": true,
            "categoryBalloonDateFormat": "MMM DD, YYYY",
            "dataDateFormat": "MMM DD, YYYY",
        },
        "categoryField": "timestamp",
        "categoryAxis": {
            "parseDates": true,
            "minPeriod": "ww",
            "equalSpacing": true,
            "axisColor": "#DADADA",
            "dashLength": 1,
            "minorGridEnabled": true
        },
        "valueAxes": [{
            "axisAlpha": 0.2,
            "unit": " m",
            "dashLength": 1,
            "position": "left",
            "minimum": 0,
        }]
    });

    var sheight_recentDays = AmCharts.makeChart("sheight_recentDays", {
        "type": "serial",
        "theme": "dark",
        "marginRight": 30,
        "autoMarginOffset": 20,
        "marginTop": 7,
        "legend": {
            "equalWidths": true,
            "useGraphSettings": true,
            "align": "left",
            "valueAlign": "left",
            "valueText": "[[value]] m",
            "valueWidth": 100
        },
        "titles": [{
            "text": "Past 14 days",
            "color": "#E8E8E8",
            "size": 16
        }],
        "dataLoader": {
            "id": "file1",
            "url": "https://www.wsl.ch/gcnet/data/" + station + "sheight_v.json"
        },
        "mouseWheelZoomEnabled": false,
        "graphs": [{
                "id": "sheightRecentForest",
                "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>1: [[value]] m</span></b>",
                "bullet": "round",
                "bulletBorderAlpha": 0.5,
                "bulletAlpha": 0.5,
                "bulletSize": 1,
                "connect": false,
                "bulletColor": "#689DE2",
                "hideBulletsCount": 500,
                "title": "Snow height 1",
                "valueField": "Sheight1",
                "type": "line",
                "lineColor": "#689DE2",
                "lineThickness": 1.1,
                "useLineColorForBulletBorder": true,
            },
            {
                "id": "sheightRecentField",
                "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>2: [[value]] m</span></b>",
                "bullet": "round",
                "bulletBorderAlpha": 0.5,
                "bulletAlpha": 0.5,
                "bulletSize": 1,
                "bulletColor": "#3275CD",
                "hideBulletsCount": 500,
                "title": "Snow height 2",
                "connect": false,
                "valueField": "Sheight2",
                "type": "line",
                "lineColor": "#3275CD",
                "lineThickness": 1.1,
                "useLineColorForBulletBorder": true
            }
        ],
        "chartScrollbar": {
            "oppositeAxis": false,
            "offset": 30,
            "scrollbarHeight": 20,
            "backgroundAlpha": 0,
            "selectedBackgroundAlpha": 0.1,
            "selectedBackgroundColor": "#888888",
            "graphFillAlpha": 0,
            "graphLineAlpha": 0.5,
            "selectedGraphFillAlpha": 0,
            "selectedGraphLineAlpha": 1,
            "autoGridCount": true,
            "color": "#AAAAAA"
        },
        "chartCursor": {
            "pan": false,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "parseDates": true,
            "categoryBalloonDateFormat": "MMM DD, YYYY JJ:NNZ",
            "dataDateFormat": "MMM DD, YYYY JJ:NNZ",
        },
        "categoryField": "timestamp",
        "categoryAxis": {
            "parseDates": true,
            "minPeriod": "ww",
            "equalSpacing": true,
            "axisColor": "#DADADA",
            "dashLength": 1,
            "minorGridEnabled": true
        },
        "valueAxes": [{
            "axisAlpha": 0.2,
            "unit": " m",
            "dashLength": 1,
            "position": "left",
            "minimum": 0
        }]
    });
}