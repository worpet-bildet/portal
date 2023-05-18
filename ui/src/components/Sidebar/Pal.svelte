<script>
  import { link } from 'svelte-spa-router';
  import { state, getCurator } from '@root/state';
  import { getMeta } from '@root/util';
  import { Sigil } from '@components';
  import { ItemImage } from '@fragments';

  export let pal;

  let image, title;
  state.subscribe(() => {
    ({ title, image } = getMeta(getCurator(pal)));
  });
</script>

{#if pal}
  <a
    use:link
    href={`/${pal}`}
    class="flex gap-4 items-center p-1 hover:bg-black hover:text-white rounded-lg shadow border"
  >
    <div>
      {#if image}
        <div class="rounded-md w-10 h-10 overflow-hidden">
          <ItemImage {image} title={pal} />
        </div>
      {:else}
        <div class="rounded-md w-10 h-10 overflow-hidden">
          <Sigil patp={pal} />
        </div>
      {/if}
    </div>
    <div>
      <div>{title || pal}</div>
    </div>
  </a>
{/if}
