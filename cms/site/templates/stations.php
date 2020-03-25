<?php snippet('header') ?>
<main class="main" role="main">
   <header class="wrap">
      <h1><?= $page->title()->html() ?></h1>
      <div class="intro text">
         <?= $page->description()->kirbytext() ?>
      </div>
      <hr />
   </header>
   <div class="wrap wide">
      <?php snippet('stationList') ?>
   </div>
</main>
<?php snippet('footer') ?>