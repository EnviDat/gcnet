function battvolt(station, chartSettings) {

    var battvolt_historical = AmCharts.makeChart("battvolt_historical", {
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
            "valueText": "[[value]] V",
            "valueWidth": 100
        },
        "titles": [{
            "text": "Historical (daily mean)",
            "color": "#E8E8E8",
            "size": 16
        }],
        "dataLoader": {
            "id": "file1",
            "url": "https://www.wsl.ch/gcnet/data/" + station + "battvolt.json"
        },
        "mouseWheelZoomEnabled": false,
        "graphs": [{
            "id": "battvoltHistorical",
            "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>[[value]] V</span></b>",
            "bullet": "round",
			"bulletBorderAlpha": chartSettings.bulletBorderAlpha,
			"bulletAlpha": chartSettings.bulletAlpha,
			"bulletSize": chartSettings.bulletSize,
			"lineThickness": chartSettings.lineThickness,
            "connect": false,
            "bulletColor": "#27ae60",
            "hideBulletsCount": 500,
            "title": "Battery voltage",
            "valueField": "BattVolt",
            "type": "line",
            "lineColor": "#27ae60",
            "negativeLineColor": "#00ced4",
            "useLineColorForBulletBorder": true,
        }],
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
            "unit": " V",
            "dashLength": 1,
            "position": "left"
        }]
    });

    var battvolt_recentDays = AmCharts.makeChart("battvolt_recentDays", {
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
            "valueText": "[[value]] V",
            "valueWidth": 100
        },
        "titles": [{
            "text": "Past 14 days",
            "color": "#E8E8E8",
            "size": 16
        }],
        "dataLoader": {
            "id": "file1",
            "url": "https://www.wsl.ch/gcnet/data/" + station + "battvolt_v.json"
        },
        "mouseWheelZoomEnabled": false,
        "graphs": [{
            "id": "battvoltRecent",
            "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>[[value]] V</span></b>",
            "bullet": "round",
			"bulletBorderAlpha": chartSettings.bulletBorderAlpha,
			"bulletAlpha": chartSettings.bulletAlpha,
			"bulletSize": chartSettings.bulletSize,
			"lineThickness": chartSettings.lineThickness,
            "connect": false,
            "bulletColor": "#27ae60",
            "hideBulletsCount": 500,
            "title": "Battery voltage",
            "valueField": "BattVolt",
            "type": "line",
            "lineColor": "#27ae60",
            "negativeLineColor": "#00ced4",
            "useLineColorForBulletBorder": true,
        }],
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
            "unit": " V",
            "dashLength": 1,
            "position": "left"
        }]
    });
}