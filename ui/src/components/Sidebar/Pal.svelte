<script>
  import { link } from 'svelte-spa-router';
  import { state, getCurator } from '@root/state';
  import { getMeta } from '@root/util';
  import { Sigil } from '@components';

  export let pal, score;

  let title;
  state.subscribe(() => {
    ({ title } = getMeta(getCurator(pal)));
  });
</script>

{#if pal}
  <a
    use:link
    href={`/${pal}`}
    class="flex gap-4 items-center p-1 hover:bg-panels-hover hover:duration-500 rounded-lg dark:border dark:bg-transparent dark:border-transparent dark:hover:border-white"
  >
    <div>
      <div class="rounded-md w-10 h-10 overflow-hidden">
        <Sigil patp={pal} />
      </div>
    </div>
    <div>
      <div class="line-clamp-1">{title || pal}</div>
      {#if score}
        <div class="text-xs">Portal score: {score}</div>
      {/if}
    </div>
  </a>
{/if}
