<script>
  import { link } from 'svelte-spa-router';
  import { format } from 'timeago.js';
  import { getMeta } from '@root/util';
  import {
    ItemImage,
    CommentIcon,
    LikeIcon,
    ShareIcon,
    CollectIcon,
    Sigil,
  } from '@fragments';

  export let item;
  let { blurb, ship, keyStr, createdAt } = getMeta(item);
</script>

<!-- <Sigil config={{ point: ship }} /> -->
<div class="grid grid-cols-12">
  <div class="col-span-1 w-10 h-10 rounded-sm overflow-hidden">
    <Sigil patp={ship} />
  </div>
  <div class="col-span-11">
    <a
      use:link
      href={`/item/${encodeURIComponent(keyStr)}`}
      class="text-white hover:text-white"
    >
      <div class="flex gap-2 text-sm">
        <a href={`/${ship}`} use:link>{ship}</a>
        <span>·</span>
        <span>{format(createdAt)}</span>
      </div>
      <p class="line-clamp-3">
        {blurb}
      </p>

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
    </a>
  </div>
</div>
