<script lang="ts">
  export let icon: ConstructorOfATypedSvelteComponent;
  export let title: string;
  export let unreadCount: number = 0;
  export let collapsed: boolean = false;
  export let active: boolean = false;
  export let newFeature: boolean = false;
  export let prominent: boolean = false;

  let hovering: boolean = false;
</script>

<button
  class={`flex items-center justify-center lg:justify-between py-2 px-3 rounded-lg w-full relative dark:hover:bg-blackhover
    ${prominent && !active ? 'bg-black hover:bg-blackhover dark:bg-white dark:hover:bg-whitehover' : 'hover:bg-panelhover'} 
    ${active ? 'bg-navitemactive hover:bg-navitemactive dark:bg-blackhover' : ''}`}
  on:mouseenter={() => (hovering = true)}
  on:mouseleave={() => (hovering = false)}
  on:click
>
  <div
    class="flex gap-3 items-center flex-col md:flex-row"
    class:text-navtext={!active && !prominent}
    class:text-navtextactive={active}
    class:dark:text-navtextactive={active}
    class:dark:text-black={!active && prominent}
    class:text-white={!active && prominent} 
    class:dark:text-white={!active && !prominent}
  >
    <div
      class="w-5 h-5 relative"
      class:text-panelicon={!active}
      class:text-navtextactive={active}
      class:dark:text-black={!active && prominent}
      class:text-white={!active && prominent}
    >
      <svelte:component this={icon} />
      {#if unreadCount > 0}
        <div
          class="absolute rounded-full right-0 bottom-0 p-1 lg:hidden bg-navtextactive"
        />
      {/if}
    </div>
    <div class="block text-xs lg:text-base sm:hidden lg:block">{title}</div>
  </div>
  {#if unreadCount > 0}
    <div
      class="bg-indicator text-navtextactive text-xs px-2 py-1 rounded-md hidden lg:block"
    >
      {unreadCount}
    </div>
  {/if}
  {#if newFeature}
    <div
      class="bg-indicator text-navtextactive dark:bg-navtextactive dark:text-white text-xs px-2 py-1 rounded-md hidden lg:block"
    >
      NEW
    </div>
  {/if}
</button>
