<script>
  import { LoadingIcon } from '@fragments';
  export let loading = false;
  export let async = false;
  export let disabled = false;
  export let tooltip = '';
  export let icon;
  export let active;
  export let darkMode;

  //class:dark:border={common && darkMode}
  //class:dark:border-white={common && darkMode && active}
</script>

<button
  class="
    py-2 px-2 flex hover:bg-hover items-center gap-4 duration-500
    overflow-hidden rounded-lg dark:fill-white dark:hover:border-white
    stroke-grey fill-grey hover:fill-black hover:stroke-black
    {$$props.class}
  "
  class:pointer-events-none={disabled}
  class:opacity-50={disabled}
  class:cursor-not-allowed={disabled}
  class:bg-hover={active}
  class:fill-black={active}
  class:stroke-black={active}
  class:dark:hover:bg-transparent={!active}
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
