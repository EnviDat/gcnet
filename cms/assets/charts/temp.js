function temp(station, chartSettings) {

    var temp_historical = AmCharts.makeChart("temp_historical", {
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
            "valueText": "[[value]] °C",
            "valueWidth": 100
        },
        "titles": [{
            "text": "Historical (daily mean)",
            "color": "#E8E8E8",
            "size": 16
        }],
        "dataLoader": {
            "id": "file1",
            "url": "https://www.wsl.ch/gcnet/data/" + station + "temp.json"
        },
        "mouseWheelZoomEnabled": false,
        "graphs": [{
                "id": "tempHistoricalAirTC1",
                "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>Thermocouple1: [[value]] °C</span></b>",
                "bullet": "round",
                "bulletBorderAlpha": chartSettings.bulletBorderAlpha,
                "bulletAlpha": chartSettings.bulletAlpha,
                "bulletSize": chartSettings.bulletSize,
                "lineThickness": chartSettings.lineThickness,
                "connect": false,
                "bulletColor": "#d48e00",
                "hideBulletsCount": 500,
                "title": "Thermocouple 1",
                "valueField": "AirTC1",
                "type": "line",
                "lineColor": "#d48e00",
                "negativeLineColor": "#00ced4",
				"negativeFillColors": "#00ced4",
                "useLineColorForBulletBorder": true,
            },
            {
                "id": "tempHistoricalAirTC2",
                "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>Thermocouple2: [[value]] °C</span></b>",
                "bullet": "round",
                "bulletBorderAlpha": chartSettings.bulletBorderAlpha,
                "bulletAlpha": chartSettings.bulletAlpha,
                "bulletSize": chartSettings.bulletSize,
                "lineThickness": chartSettings.lineThickness,
                "bulletColor": "#d26200",
                "hideBulletsCount": 500,
                "title": "Thermocouple 2",
                "connect": false,
                "valueField": "AirTC2",
                "type": "line",
                "lineColor": "#d26200",
                "negativeLineColor": "#07AACD",
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
            "unit": " °C",
            "dashLength": 1,
            "position": "left",
            "minimum": -45,
            "maximum": 30
        }]
    });

    var temp_recentDays = AmCharts.makeChart("temp_recentDays", {
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
            "valueText": "[[value]] °C",
            "valueWidth": 100
        },
        "titles": [{
            "text": "Past 14 days",
            "color": "#E8E8E8",
            "size": 16
        }],
        "dataLoader": {
            "id": "file1",
            "url": "https://www.wsl.ch/gcnet/data/" + station + "temp_v.json"
        },
        "mouseWheelZoomEnabled": false,
        "graphs": [{
                "id": "tempRecentAirTC1",
                "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>Thermocouple1: [[value]] °C</span></b>",
                "bullet": "round",
                "bulletBorderAlpha": chartSettings.bulletBorderAlpha,
                "bulletAlpha": chartSettings.bulletAlpha,
                "bulletSize": chartSettings.bulletSize,
                "lineThickness": chartSettings.lineThickness,
                "connect": false,
                "bulletColor": "#d48e00",
                "hideBulletsCount": 500,
                "title": "Thermocouple 1",
                "valueField": "AirTC1",
                "type": "line",
                "lineColor": "#d48e00",
                "negativeLineColor": "#00ced4",
                "useLineColorForBulletBorder": true,
            },
            {
                "id": "tempRecentAirTC2",
                "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>Thermocouple2: [[value]] °C</span></b>",
                "bullet": "round",
                "bulletBorderAlpha": chartSettings.bulletBorderAlpha,
                "bulletAlpha": chartSettings.bulletAlpha,
                "bulletSize": chartSettings.bulletSize,
                "lineThickness": chartSettings.lineThickness,
                "bulletColor": "#d26200",
                "hideBulletsCount": 500,
                "title": "Thermocouple 2",
                "connect": false,
                "valueField": "AirTC2",
                "type": "line",
                "lineColor": "#d26200",
                "negativeLineColor": "#07AACD",
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
            "unit": " °C",
            "dashLength": 1,
            "position": "left",
            "minimum": -45,
            "maximum": 30
        }]
    });
}