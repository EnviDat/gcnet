function rad(station, chartSettings) {

    var rad_historical = AmCharts.makeChart("rad_historical", {
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
            "valueText": "[[value]] W/m2",
            "valueWidth": 100
        },
        "titles": [{
            "text": "Historical (daily mean)",
            "color": "#E8E8E8",
            "size": 16
        }],
        "dataLoader": {
            "id": "file1",
            "url": "https://www.wsl.ch/gcnet/data/" + station + "rad.json"
        },
        "mouseWheelZoomEnabled": false,
        "graphs": [{
                "id": "radHistoricalSWin",
                "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>SWin: [[value]] W/m2</span></b>",
                "bullet": "round",
				"bulletBorderAlpha": chartSettings.bulletBorderAlpha,
				"bulletAlpha": chartSettings.bulletAlpha,
				"bulletSize": chartSettings.bulletSize,
				"lineThickness": chartSettings.lineThickness,
                "connect": false,
                "bulletColor": "#e79f33",
                "hideBulletsCount": 500,
                "title": "Short-wave incoming",
                "valueField": "SWin",
                "lineColor": "#e79f33",
                "useLineColorForBulletBorder": true,
            },
            {
                "id": "radHistoricalSWout",
                "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>SWout: [[value]] W/m2</span></b>",
                "bullet": "round",
				"bulletBorderAlpha": chartSettings.bulletBorderAlpha,
				"bulletAlpha": chartSettings.bulletAlpha,
				"bulletSize": chartSettings.bulletSize,
				"lineThickness": chartSettings.lineThickness,
                "bulletColor": "#9a6008",
                "hideBulletsCount": 500,
                "title": "Short-wave outgoing",
                "connect": false,
                "valueField": "SWout",
                "lineColor": "#9a6008",
                "useLineColorForBulletBorder": true
            },
            {
                "id": "radHistoricalNetRad",
                "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>NetRad: [[value]] W/m2</span></b>",
                "bullet": "round",
				"bulletBorderAlpha": chartSettings.bulletBorderAlpha,
				"bulletAlpha": chartSettings.bulletAlpha,
				"bulletSize": chartSettings.bulletSize,
				"lineThickness": chartSettings.lineThickness,
                "bulletColor": "#1B5197",
                "hideBulletsCount": 500,
                "title": "Net radiation",
                "connect": false,
                "valueField": "NetRad",
                "lineColor": "#1B5197",
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
            "unit": " W/m2",
            "dashLength": 1,
            "position": "left",
            "minimum": -600,
            "maximum": 1500
        }]
    });

    var rad_recentDays = AmCharts.makeChart("rad_recentDays", {
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
            "valueText": "[[value]] W/m2",
            "valueWidth": 100
        },
        "titles": [{
            "text": "Past 14 days",
            "color": "#E8E8E8",
            "size": 16
        }],
        "dataLoader": {
            "id": "file1",
            "url": "https://www.wsl.ch/gcnet/data/" + station + "rad_v.json"
        },
        "mouseWheelZoomEnabled": false,
        "graphs": [{
                "id": "radRecentSWin",
                "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>SWin: [[value]] W/m2</span></b>",
                "bullet": "round",
				"bulletBorderAlpha": chartSettings.bulletBorderAlpha,
				"bulletAlpha": chartSettings.bulletAlpha,
				"bulletSize": chartSettings.bulletSize,
				"lineThickness": chartSettings.lineThickness,
                "connect": false,
                "bulletColor": "#e79f33",
                "hideBulletsCount": 500,
                "title": "Short-wave incoming",
                "valueField": "SWin",
                "lineColor": "#e79f33",
                "useLineColorForBulletBorder": true,
            },
            {
                "id": "radRecentSWout",
                "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>SWout: [[value]] W/m2</span></b>",
                "bullet": "round",
				"bulletBorderAlpha": chartSettings.bulletBorderAlpha,
				"bulletAlpha": chartSettings.bulletAlpha,
				"bulletSize": chartSettings.bulletSize,
				"lineThickness": chartSettings.lineThickness,
                "bulletColor": "#9a6008",
                "hideBulletsCount": 500,
                "title": "Short-wave outgoing",
                "connect": false,
                "valueField": "SWout",
                "lineColor": "#9a6008",
                "useLineColorForBulletBorder": true
            },
            {
                "id": "radRecentNetRad",
                "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>NetRad: [[value]] W/m2</span></b>",
                "bullet": "round",
				"bulletBorderAlpha": chartSettings.bulletBorderAlpha,
				"bulletAlpha": chartSettings.bulletAlpha,
				"bulletSize": chartSettings.bulletSize,
				"lineThickness": chartSettings.lineThickness,
                "bulletColor": "#1B5197",
                "hideBulletsCount": 500,
                "title": "Net radiation",
                "connect": false,
                "valueField": "NetRad",
                "lineColor": "#1B5197",
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
            "unit": " W/m2",
            "dashLength": 1,
            "position": "left",
            "minimum": -600,
            "maximum": 1500
        }]
    });
}