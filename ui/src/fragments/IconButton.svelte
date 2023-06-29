<script>
  import { LoadingIcon } from '@fragments';
  export let loading = false;
  export let async = false;
  export let disabled = false;
  export let tooltip = '';
  export let icon;
  export let active;
  export let common;
  export let darkMode;
</script>

<button
  class="py-2 px-2 flex hover:bg-hover items-center gap-4 hover:duration-500 overflow-hidden rounded-lg dark:fill-white ${$$props.classes}"
  class:pointer-events-none={disabled}
  class:opacity-50={disabled}
  class:cursor-not-allowed={disabled}
  class:dark:border={common && darkMode}
  class:dark:border-white={common && darkMode && active}
  class:dark:hover:border-white={common && darkMode}
  class:hover:bg-hover={common && !darkMode}
  class:bg-hover={common && !darkMode && active}
  class:bg-panels={common && !darkMode && !active}
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
