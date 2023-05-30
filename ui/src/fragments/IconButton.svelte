<script>
  import { LoadingIcon } from '@fragments';
  export let loading = false;
  export let async = false;
  export let disabled = false;
  export let active;
  export let icon;
</script>

<button
  class="py-1 px-2 border-2 shadow rounded-lg flex items-center gap-4 hover:bg-grey hover:text-white hover:duration-500 overflow-hidden"
  class:pointer-events-none={disabled}
  class:opacity-50={disabled}
  class:cursor-not-allowed={disabled}
  class:bg-grey={active}
  class:text-white={active}
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
