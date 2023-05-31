<script>
  import { LoadingIcon } from '@fragments';
  export let loading = false;
  export let async = false;
  export let disabled = false;
  export let transparent = false;
  export let active;
  export let icon;
</script>

<button
  class="py-2 px-2 flex hover:bg-hover items-center gap-4 hover:duration-500 overflow-hidden rounded-lg"
  class:pointer-events-none={disabled}
  class:opacity-50={disabled}
  class:cursor-not-allowed={disabled}
  class:bg-hover={active}
  class:bg-panels={!transparent}
  on:click
  on:click={() => (async ? (loading = true) : null)}
>
  <span class="w-6">
    {#if loading}
      <svelte:component this={LoadingIcon} class="w-6" />
    {:else}
      <svelte:component this={icon} />
    {/if}
  </span>
  <slot />
</button>
