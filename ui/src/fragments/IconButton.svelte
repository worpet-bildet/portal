<script>
  import { LoadingIcon } from '@fragments';
  import {
    state,
  } from '@root/state';
  export let loading = false;
  export let async = false;
  export let disabled = false;
  export let tooltip = '';
  export let transparent = false;
  export let changeColorOnHover = false;
  export let whiteIcon;
  export let active;
  export let icon;
</script>

<button
  class="py-2 px-2 flex items-center gap-4 hover:duration-500 overflow-hidden rounded-lg stroke-grey"
  class:pointer-events-none={disabled}
  class:opacity-50={disabled}
  class:cursor-not-allowed={disabled}
  class:bg-hover={active && !$state.darkmode && !changeColorOnHover}
  class:bg-panels={!transparent && !active && !$state.darkmode}
  class:fill-grey={(!whiteIcon && !active) || icon.name.includes('People') && !changeColorOnHover}
  class:fill-black={icon.name.includes('Chat') && active && !$state.darkmode}
  class:fill-white={whiteIcon && icon.name.includes('Moon')}
  class:dark:fill-white={(icon.name.includes('Chat') && active) || whiteIcon}
  class:hover:stroke-black={icon.name.includes('Like')}
  class:dark:hover:stroke-white={icon.name.includes('Like')}
  class:hover:bg-hover={!changeColorOnHover && !$state.darkmode}
  class:hover:fill-black={changeColorOnHover && !$state.darkmode && !whiteIcon}
  class:hover:fill-offwhite={changeColorOnHover && !$state.darkmode && (whiteIcon || $state.darkmode)}
  class:dark:hover:fill-white={changeColorOnHover && $state.darkmode}
  class:dark:hover:border-white={!changeColorOnHover && $state.darkmode}
  class:border-white={active && $state.darkmode && !changeColorOnHover}
  class:dark:border={$state.darkmode && !changeColorOnHover}
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
