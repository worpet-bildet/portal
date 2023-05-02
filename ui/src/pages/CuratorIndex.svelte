<!-- <script>
  import { link } from 'svelte-spa-router';
  import { curatorNames } from '@root/state';
  curatorNames.subscribe((c) => console.log({ c }));
  // curatorIndex.subscribe((c) => console.log({ c }));
</script>

<div>
  {#each $curatorNames as curator}
    <div>
      <a href={`/${curator}`} use:link>
        {curator}
      </a>
    </div>
  {/each}
</div> -->
