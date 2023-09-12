<script lang="ts">
  import { SvelteComponent } from 'svelte';
  import { LoadingIcon } from '@fragments';
  export let loading = false;
  export let async = false;
  export let disabled = false;
  export let tooltip = '';
  export let active = false;
  export let icon = SvelteComponent;
</script>

<button
  class="
    py-2 px-2 flex items-center gap-4 hover:duration-500
    overflow-hidden rounded-lg
    {$$props.class}
  "
  class:pointer-events-none={disabled}
  class:opacity-50={disabled}
  class:cursor-not-allowed={disabled}
  class:bg-panels-hover={active}
  class:border-black={active}
  class:dark:border-white={active}
  class:dark:hover:bg-transparent={!active}
  title={tooltip}
  on:click
  on:click={() => (async && !disabled ? (loading = true) : null)}
>
  <span class="w-5">
    {#if loading}
      <svelte:component this={LoadingIcon} />
    {:else}
      <svelte:component this={icon} />
    {/if}
  </span>
  <slot />
</button>
