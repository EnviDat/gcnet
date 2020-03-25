<?php snippet('header') ?>
<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);

$stationFile = file_get_contents('Resources/Public/JavaScript/stations.json');
$stations    = json_decode($stationFile);
$stationsJs  = '';
$selectOptions = '<option value="https://www.wsl.ch/gcnet/overview_all_stations.html">All weather stations</option>';
$stationsBaseUrl = 'https://www.wsl.ch/gcnet/stations/';
foreach ($stations as $station){
    $balloonText = '';
    // add start date
    if($station->startdate != NULL){
        $dateFormated = substr($station->startdate,0,4);
        $balloonText = '<br>Start date: '.$dateFormated;
    }
    // add elevation
    if($station->elevation != NULL) {
        $balloonText = '<br>Elevation: ' . $station->elevation . ' m';
    }
    // add detail link
    if($station->active == 1 && $station->data == 1){
        $iconColor = 'rgba(102,205,170,0.8)';
        $balloonText .= '<br><br>Click to view weather station data';

    } else if ($station->active == 1 && $station->data == 0) {
        $iconColor = 'rgba(244, 241, 66,0.8)';
        $balloonText .= '<br><br>No data available at the moment';
    } else {
        $iconColor = 'rgba(216,75,75,0.8)';
        $balloonText .= '<br><br>No longer in operation';
    }

    $urlJson = '';
    if(strlen($station->alias) > 2){
        $selectOptions .= '
            <option value="'.$stationsBaseUrl.$station->alias.'">'.$station->id.') '.$station->name.'</option>
        
        ';
        $urlJson = '"url" : "'.$stationsBaseUrl.$station->alias.'",';
    }


    $stationsJs .= '
        {
            "type": "circle",
            "selectable": true,
            "balloonText": "<b>'.$station->name.'</b>'.$balloonText.'",
            "longitude": -'.$station->longitude.',
            "latitude": '.$station->latitude.',
            "color": "'.$iconColor.'",
            "rollOverColor": "rgba(0,0,0,0.8)",
            "scale": 1.3, 
            "urlTarget": "_blank",
            '.$urlJson.'
        },
    ';



}

?>
<main class="main" role="main">
   <header class="wrap">
      <h1><?= $page->title()->html() ?></h1>
      <div class="intro text">
         <?= $page->description()->kirbytext() ?>
      </div>
      <hr />
   </header>
   
   
  <div id="chart" class="chart-panel"></div> 
   
   <div class="wrap wide">
      <div class="drop-down">
    <form method="post" name="stations" target="_blank" id="stationsform" action="ActionDefinedInOptions">
        <select class="minimal" name="stationname" id="stationname">
            <option>Select an automated weather station</option>
            <?php echo $selectOptions; ?>
        </select>
    </form>
</div>
<div style="width: 100%; height: 100%; position: relative;">
    <div id="map" style="width: 100%; height: 1285px; position: absolute; top: 0; left: 0;"></div>
</div>
   </div>
</main>
<?php echo js("assets/amcharts/amcharts.js") ?>
<?php echo js("assets/jquery/jquery-3.3.1.slim.min.js") ?>
<?php echo js("assets/ammap_3/ammap/ammap.js") ?>
<?php echo js("assets/ammap_3/ammap/maps/js/greenlandHigh.js") ?>
<?php echo js("assets/amcharts/serial.js") ?>
<?php echo js("assets/amcharts/radar.js") ?>
<?php echo js("assets/amcharts/themes/dark.js") ?>
<?php echo js("assets/amcharts/plugins/dataloader/dataloader.min.js") ?>
<?php echo js("assets/amcharts/plugins/animate/animate.min.js") ?>
<?php echo js("assets/amcharts/plugins/responsive/responsive.min.js") ?>
<?php echo js("assets/charts/map.js") ?>

<script type="application/javascript">
        jQuery(document).ready(function() {
            jQuery('#stationsform').on('change', function() {
                var optVal= jQuery("#stationname option:selected").val();
                jQuery('#stationsform').attr('action', optVal);
                this.submit();
            });
        });
</script>


<?php snippet('footer') ?>