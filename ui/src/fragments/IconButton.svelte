<script>
  import { LoadingIcon } from '@fragments';
  export let loading = false;
  export let async = false;
  export let disabled = false;
  export let tooltip = '';
  export let transparent = false;
  export let noHover = false;
  export let whiteIcon = true;
  export let active;
  export let icon;
  console.log("testy")
  console.log(whiteIcon)
</script>

<button
  class="py-2 px-2 flex items-center gap-4 hover:duration-500 overflow-hidden rounded-lg dark:fill-white"
  class:pointer-events-none={disabled}
  class:opacity-50={disabled}
  class:cursor-not-allowed={disabled}
  class:bg-hover={active}
  class:bg-panels={!transparent && !active}
  class:hover:bg-hover={!noHover}
  title={tooltip}
  on:click
  on:click={() => (async && !disabled ? (loading = true) : null)}
>
  <span class="w-5">
    {#if loading}
      <svelte:component this={LoadingIcon} class="w-5" />
    {:else}
      <svelte:component this={icon} />
    {/if}
  </span>
  <slot />
</button>
