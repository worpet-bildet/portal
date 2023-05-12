<script>
  import spinner from '@assets/loading.svg';
  export let loading = false;
  export let async = false;
  export let disabled = false;
  export let icon;
</script>

<button
  class="py-1 px-2 border flex items-center gap-4"
  class:pointer-events-none={disabled}
  class:opacity-50={disabled}
  class:cursor-not-allowed={disabled}
  on:click
  on:click={() => (async ? (loading = true) : null)}
>
  <span class="w-6">
    {#if loading}
      <img src={spinner} alt="Loading" class="w-6 h-6" />
    {:else}
      <svelte:component this={icon} />
    {/if}
  </span>
  <slot />
</button>
