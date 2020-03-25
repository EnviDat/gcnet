<?php if($item->coverimage()->isNotEmpty()): ?>
  <figure>
    <img src="<?php $item->coverimage()->toFile()->url() ?>" alt="" />
  </figure>
<?php endif ?>
