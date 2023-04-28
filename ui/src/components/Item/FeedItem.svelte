<script>
  import { link } from 'svelte-spa-router';
  import { getItem } from '@root/state';
  import { getMeta } from '@root/util';
  import {
    ItemImage,
    CommentIcon,
    LikeIcon,
    ShareIcon,
    CollectIcon,
    ProfileIcon,
  } from '@fragments';

  export let item;
  $: console.log({ item });
  let { title, description, ship, keyStr } = getMeta(item);
</script>

<!-- <Sigil config={{ point: ship }} /> -->
<div class="grid grid-cols-12">
  <div class="col-span-1 w-10 h-10">
    <ProfileIcon />
  </div>
  <div class="col-span-11">
    <a class="text-sm" href={`/${ship}`} use:link>{ship}</a>
    <a use:link href={`/item/${encodeURIComponent(keyStr)}`}>
      <p class="line-clamp-3 cursor-pointer">
        {description}
      </p>
    </a>
    <div class="pt-3">
      <button class="w-5 h-5 mr-10">
        <CommentIcon /> 3
      </button>
      <button class="w-5 h-5 mr-10">
        <LikeIcon /> 12
      </button>
      <button class="w-5 h-5 mr-10">
        <ShareIcon /> 8
      </button>
      <button class="w-5 h-5 mr-10">
        <CollectIcon /> 10
      </button>
    </div>
  </div>
</div>
