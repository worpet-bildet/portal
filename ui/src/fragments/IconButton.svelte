<script>
  import { LoadingIcon } from '@fragments';
  export let loading = false;
  export let async = false;
  export let disabled = false;
  export let tooltip = '';
  export let active;
  export let icon;
</script>

<button
  class="py-1 px-2 border shadow rounded-lg flex items-center gap-4 hover:bg-black hover:text-white overflow-hidden"
  class:opacity-50={disabled}
  class:bg-black={active}
  class:text-white={active}
  cursor-not-allowed={disabled}
  title={tooltip}
  on:click
  on:click={() => (async && !disabled ? (loading = true) : null)}
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
