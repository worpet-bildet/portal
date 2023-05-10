<script>
  import { link } from 'svelte-spa-router';
  import { fade } from 'svelte/transition';
  import { format } from 'timeago.js';
  import { getMeta } from '@root/util';
  import { Sigil } from '@fragments';

  export let item;
  let { blurb, ship, keyStr, createdAt } = getMeta(item);
</script>

<!-- <Sigil config={{ point: ship }} /> -->
<div class="grid grid-cols-12 rounded-lg shadow shadow-white p-5" in:fade>
  <div class="col-span-1 w-10 h-10 rounded-sm overflow-hidden">
    <Sigil patp={ship} />
  </div>
  <div class="col-span-11 flex flex-col gap-2">
    <div class="flex gap-2 text-sm">
      <a href={`/${ship}`} use:link>{ship}</a>
      <span>·</span>
      <span>{format(createdAt)}</span>
    </div>
    <p>
      {blurb}
    </p>
  </div>
</div>
