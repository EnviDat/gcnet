<?php snippet('header') ?>

<main class="main" role="main">

  <header class="wrap">
    <div class="intro text">
      <?= $page->intro()->kirbytext() ?>
    </div>
    <hr />
  </header>

  <div class="text wrap">
    <?= $page->text()->kirbytext() ?>
  </div>

  <section class="projects-section">

    <?php foreach($pages->visible() as $item): ?>
      <div>
        <a href="<?= $item->url() ?>"><h2><?= $item->title()->html() ?></h2></a>
      </div>
    <?php endforeach ?>

  </section>

</main>

<?php snippet('footer') ?>
