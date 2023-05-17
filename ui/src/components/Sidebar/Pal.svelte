<script>
  import { link } from 'svelte-spa-router';
  import { state, getItem } from '@root/state';
  import { subscribeToContactProfile } from '@root/api';
  import { getMeta } from '@root/util';
  import { Sigil } from '@components';
  export let pal;

  let subbing = false;
  let image, title, color;
  state.subscribe((s) => {
    if (
      pal &&
      s.profiles &&
      !Object.keys(s.profiles).includes(pal) &&
      !subbing
    ) {
      subscribeToContactProfile(pal);
      subbing = true; // only do this once per load
    }
    ({ image, title, color } = getMeta(getItem(`/ship/${pal}//`)) || {
      title: pal,
    });
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
        <img alt={pal} src={image} class="rounded-md w-10 h-10" />
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
