var chart = AmCharts.makeChart("map",{
            "type": "map",
            "pathToImages": "http://www.amcharts.com/lib/3/images/",
            "addClassNames": true,
            "fontSize": 15,
            // "color": "#FFFFFF",
            "projection": "mercator",
            "backgroundAlpha": 1,
            "backgroundColor": "#252f38",
            "dataProvider": {
                "map": "greenlandHigh",
                "getAreasFromMap": false,
                "images": [
                    <?php echo $stationsJs; ?>
                ]
            },
            "balloon": {
                "horizontalPadding": 15,
                "borderAlpha": 0,
                "borderThickness": 1,
                "verticalPadding": 15
            },
            "zoomControl": {
                "zoomControlEnabled": true,
                "homeButtonEnabled": false,
                "panControlEnabled": false,
                "right": 38,
                "bottom": 30,
                "minZoomLevel": 0.25,
                "gridHeight": 100,
                "gridAlpha": 0.1,
                "gridBackgroundAlpha": 0,
                "gridColor": "#FFFFFF",
                "draggerAlpha": 1,
                "buttonCornerRadius": 2
            }
        });


        function show() {
            if(document.getElementById('chartdiv').style.display=='none') {
                document.getElementById('chartdiv').style.display='block';
            }
            return false;
        }
        function hide() {
            if(document.getElementById('chartdiv').style.display=='block') {
                document.getElementById('chartdiv').style.display='none';
            }
            return false;
        }
