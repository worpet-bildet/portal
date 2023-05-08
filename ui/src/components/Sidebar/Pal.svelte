<script>
  import { link } from 'svelte-spa-router';
  import { state, getProfile } from '@root/state';
  import { subscribeToContactProfile } from '@root/api';
  import { Sigil } from '@fragments';
  export let pal;

  let subbing = false;
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
  });
</script>

{#if pal}
  {@const { avatar, nickname } = getProfile(pal) || {}}
  <a
    use:link
    href={`/${pal}`}
    class="flex gap-4 items-center hover:bg-gray-500 p-1"
  >
    <div>
      {#if avatar}
        <img alt={pal} src={avatar} class="rounded-md w-10 h-10" />
      {:else}
        <div class="rounded-md w-10 h-10 overflow-hidden">
          <Sigil patp={pal} />
        </div>
      {/if}
    </div>
    <div>
      <div>{pal}</div>
    </div>
  </a>
{/if}
