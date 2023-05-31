<script>
  import { LoadingIcon } from '@fragments';
  import { location } from 'svelte-spa-router';
  export let loading = false;
  export let async = false;
  export let disabled = false;
  export let active;
  export let icon;
  $: {
    console.log(location)
  }
</script>

<button
  class="py-2 px-2 flex hover:bg-hover items-center gap-4 hover:duration-500 overflow-hidden"
  class:pointer-events-none={disabled}
  class:opacity-50={disabled}
  class:cursor-not-allowed={disabled}
  class:bg-hover={active}
  class:rounded-full={['App', 'Group'].some(substring => icon.name.includes(substring)) && $location !== '/explore'}
  class:rounded-lg={!['App', 'Group'].some(substring => icon.name.includes(substring)) || $location === '/explore'}
  class:bg-panels={(!['App', 'Group'].some(substring => icon.name.includes(substring)) || $location === '/explore') && !active}
  class:px-3={!['App', 'Group'].some(substring => icon.name.includes(substring)) || $location === '/explore'}
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
