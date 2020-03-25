<?php

$stations = page('stations')->children()->visible();

/*

The $limit parameter can be passed to this snippet to
display only a specified amount of stations:

```
<?php snippet('showcase', ['limit' => 3]) ?>
```

Learn more about snippets and parameters at:
https://getkirby.com/docs/templates/snippets

*/

if(isset($limit)) $stations = $stations->limit($limit);

?>

<?php $cnt = 0 ?>
<?php foreach($stations->sortBy('title', 'asc') as $station): ?>

  <?php if($cnt % 2 == 0): ?>
    <div class="section group">
      <div class="col span_1_of_2">
        <a href="<?= $station->url() ?>" class="station-list"><?= $station->title() ?></a>
      </div>
    <?php else: ?>
      <div class="col span_1_of_2">
        <a href="<?= $station->url() ?>" class="station-list"><?= $station->title() ?></a>
      </div>
    </div>
  <?php endif; ?>
  <?php $cnt++ ?>
<?php endforeach ?>
