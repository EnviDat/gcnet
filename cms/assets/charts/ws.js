function ws(station, chartSettings) {

    var ws_historical = AmCharts.makeChart("ws_historical", {
        "type": "serial",
        "theme": "dark",
        "marginRight": 30,
        "autoMarginOffset": 20,
        "synchronizeGrid": chartSettings.synchronizeGrid,		
        "marginTop": 7,
        "legend": {
            "equalWidths": true,
            "useGraphSettings": true,
            "align": "left",
            "valueAlign": "left",
            "valueText": "[[value]] m/s",
            "valueWidth": 100
        },
        "titles": [{
            "text": "Historical (daily mean)",
            "color": "#E8E8E8",
            "size": 16
        }],
        "dataLoader": {
            "id": "file1",
            "url": "https://www.wsl.ch/gcnet/data/" + station + "ws.json"
        },
        "mouseWheelZoomEnabled": false,
        "graphs": [{
                "id": "wsHistoricalWS1",
                "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>1: [[value]] m/s</span></b>",
                "bullet": "round",
                "bulletBorderAlpha": chartSettings.bulletBorderAlpha,
                "bulletAlpha": chartSettings.bulletAlpha,
                "bulletSize": chartSettings.bulletSize,
                "lineThickness": chartSettings.lineThickness,
                "connect": false,
                "bulletColor": "#006400",
                "hideBulletsCount": 500,
                "title": "Wind-speed 1",
                "valueField": "WS1",
                "lineColor": "#006400",
                "useLineColorForBulletBorder": true,
            },
            {
                "id": "wsHistoricalWS2",
                "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>2: [[value]] m/s</span></b>",
                "bullet": "round",
                "bulletBorderAlpha": chartSettings.bulletBorderAlpha,
                "bulletAlpha": chartSettings.bulletAlpha,
                "bulletSize": chartSettings.bulletSize,
                "lineThickness": chartSettings.lineThickness,
                "bulletColor": "#32CD32",
                "hideBulletsCount": 500,
                "title": "Wind-speed 2",
                "connect": false,
                "valueField": "WS2",
                "lineColor": "#32CD32",
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
            "unit": " m/s",
            "dashLength": 1,
            "position": "left"
        }]
    });

    var ws_recentDays = AmCharts.makeChart("ws_recentDays", {
        "type": "serial",
        "theme": "dark",
        "marginRight": 30,
        "autoMarginOffset": 20,
        "synchronizeGrid": chartSettings.synchronizeGrid,		
        "marginTop": 7,
        "legend": {
            "equalWidths": true,
            "useGraphSettings": true,
            "align": "left",
            "valueAlign": "left",
            "valueText": "[[value]] m/s",
            "valueWidth": 100
        },
        "titles": [{
            "text": "Past 14 days",
            "color": "#E8E8E8",
            "size": 16
        }],
        "dataLoader": {
            "id": "file1",
            "url": "https://www.wsl.ch/gcnet/data/" + station + "ws_v.json"
        },
        "mouseWheelZoomEnabled": false,
        "graphs": [{
                "id": "wsRecentWS1",
                "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>1: [[value]] m/s</span></b>",
                "bullet": "round",
                "bulletBorderAlpha": chartSettings.bulletBorderAlpha,
                "bulletAlpha": chartSettings.bulletAlpha,
                "bulletSize": chartSettings.bulletSize,
                "lineThickness": chartSettings.lineThickness,
                "connect": false,
                "bulletColor": "#006400",
                "hideBulletsCount": 500,
                "title": "Wind-speed 1",
                "valueField": "WS1",
                "lineColor": "#006400",
                "useLineColorForBulletBorder": true,
            },
            {
                "id": "wsRecentWS2",
                "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>2: [[value]] m/s</span></b>",
                "bullet": "round",
                "bulletBorderAlpha": chartSettings.bulletBorderAlpha,
                "bulletAlpha": chartSettings.bulletAlpha,
                "bulletSize": chartSettings.bulletSize,
                "lineThickness": chartSettings.lineThickness,
                "bulletColor": "#32CD32",
                "hideBulletsCount": 500,
                "title": "Wind-speed 2",
                "connect": false,
                "valueField": "WS2",
                "lineColor": "#32CD32",
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
            "unit": " m/s",
            "dashLength": 1,
            "position": "left"
        }]
    });
}