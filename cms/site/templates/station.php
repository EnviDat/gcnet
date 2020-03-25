<?php snippet('header') ?>
<main class="main" role="main">

      <header class="wrap">
        <h1><?= $page->title()->html() ?></h1>
        <div class="intro text">
        </div>
        <hr />
      </header>

   <div class="text wrap">
      <div class="measurement-panel intro">
         <?= $page->description()->kirbytext() ?>
      </div>

      <div class="measurement-panel">
         <h3 class="text-center">Air temperatures</h3>
         <div class="titleright">Historical Data from the station <?= $page->title() ?></div>
         <div id="temp_historical" class="chart-panel"></div>
         <br />
         <br />
         <div class="titleright">Data of the recent days from the station <?= $page->title() ?></div>
         <div id="temp_recentDays" class="chart-panel"></div>
      </div>

      <div class="measurement-panel">
         <h3 class="text-center">Relative humidity</h3>
         <div class="titleright">Historical Data from the station <?= $page->title() ?></div>
         <div id="rh_historical" class="chart-panel"></div>
         <br />
         <br />
         <div class="titleright">Data of the recent days from the station <?= $page->title() ?></div>
         <div id="rh_recentDays" class="chart-panel"></div>
      </div>

      <div class="measurement-panel">
         <h3 class="text-center">Radiation</h3>
         <div class="titleright">Historical Data from the station <?= $page->title() ?></div>
         <div id="rad_historical" class="chart-panel"></div>
         <br />
         <br />
         <div class="titleright">Data of the recent days from the station <?= $page->title() ?></div>
         <div id="rad_recentDays" class="chart-panel"></div>
      </div>

      <div class="measurement-panel">
         <h3 class="text-center">Snow heights</h3>
         <div class="titleright">Historical Data from the station <?= $page->title() ?></div>
         <div id="sheight_historical" class="chart-panel"></div>
         <br />
         <br />
         <div class="titleright">Data of the recent days from the station <?= $page->title() ?></div>
         <div id="sheight_recentDays" class="chart-panel"></div>
      </div>

      <div class="measurement-panel">
         <h3 class="text-center">Wind speed</h3>
         <div class="titleright">Historical Data from the station <?= $page->title() ?></div>
         <div id="ws_historical" class="chart-panel"></div>
         <br />
         <br />
         <div class="titleright">Data of the recent days from the station <?= $page->title() ?></div>
         <div id="ws_recentDays" class="chart-panel"></div>
      </div>

      <div class="measurement-panel">
         <h3 class="text-center">Wind direction</h3>
         <div class="titleright">Historical Data from the station <?= $page->title() ?></div>
         <div id="wd_historical" class="chart-panel"></div>
         <br />
         <br />
         <div class="titleright">Data of the recent days from the station <?= $page->title() ?></div>
         <div id="wd_recentDays" class="chart-panel"></div>
      </div>

      <div class="measurement-panel">
         <h3 class="text-center">Air pressure</h3>
         <div class="titleright">Historical Data from the station <?= $page->title() ?></div>
         <div id="press_historical" class="chart-panel"></div>
         <br />
         <br />
         <div class="titleright">Data of the recent days from the station <?= $page->title() ?></div>
         <div id="press_recentDays" class="chart-panel"></div>
      </div>

      <div class="measurement-panel">
         <h3 class="text-center">Battery voltage</h3>
         <div class="titleright">Historical Data from the station <?= $page->title() ?></div>
         <div id="battvolt_historical" class="chart-panel"></div>
         <br />
         <br />
         <div class="titleright">Data of the recent days from the station <?= $page->title() ?></div>
         <div id="battvolt_recentDays" class="chart-panel"></div>
      </div>

   </div>
</main>


<?php echo js("assets/amcharts/amcharts.js") ?>
<?php echo js("assets/amcharts/serial.js") ?>
<?php echo js("assets/amcharts/radar.js") ?>
<?php echo js("assets/amcharts/themes/light.js") ?>
<?php echo js("assets/amcharts/plugins/dataloader/dataloader.min.js") ?>
<?php echo js("assets/amcharts/plugins/animate/animate.min.js") ?>
<?php echo js("assets/amcharts/plugins/responsive/responsive.min.js") ?>
<?php echo js("assets/charts/temp.js") ?>
<?php echo js("assets/charts/rh.js") ?>
<?php echo js("assets/charts/rad.js") ?>
<?php echo js("assets/charts/sheight.js") ?>
<?php echo js("assets/charts/stemp.js") ?>
<?php echo js("assets/charts/ws.js") ?>
<?php echo js("assets/charts/wd.js") ?>
<?php echo js("assets/charts/press.js") ?>
<?php echo js("assets/charts/battvolt.js") ?>

<script>
	/* lines to more than 1 for better visibility on the field  */
	var lineThickness = 3;
	var bulletSize = 6;
	/* set the Alpha to Zero so only the circle border will be shown  */
	var bulletAlpha = 0;
	var bulletBorderAlpha = 0.5;
	var chartSettings = {
		"lineThickness": lineThickness,
		"bulletSize": bulletSize,
		"bulletAlpha": bulletAlpha,
		"bulletBorderAlpha": bulletBorderAlpha,
		"synchronizeGrid": true,		
	};
	var waitBase = 10;

   window.setTimeout(temp("<?php echo strtoupper($page->station()) ?>", chartSettings), (waitBase * 2));
   window.setTimeout(rh("<?php echo strtoupper($page->station()) ?>", chartSettings), (waitBase * 3));
   window.setTimeout(rad("<?php echo strtoupper($page->station()) ?>", chartSettings), (waitBase * 4));
   window.setTimeout(sheight("<?php echo strtoupper($page->station()) ?>", chartSettings), (waitBase * 5));
   window.setTimeout(stemp("<?php echo strtoupper($page->station()) ?>", chartSettings), (waitBase * 6));
   window.setTimeout(ws("<?php echo strtoupper($page->station()) ?>", chartSettings), (waitBase * 7));
   window.setTimeout(wd("<?php echo strtoupper($page->station()) ?>", chartSettings), (waitBase * 8));
   window.setTimeout(press("<?php echo strtoupper($page->station()) ?>", chartSettings), (waitBase * 9));
   window.setTimeout(battvolt("<?php echo strtoupper($page->station()) ?>", chartSettings), (waitBase * 10));
</script>

<?php snippet('footer') ?>

