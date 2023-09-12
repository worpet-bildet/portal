<script lang="ts">
  export let icon: ConstructorOfATypedSvelteComponent;
  export let title: string;
  export let unreadCount: number = 0;
  export let collapsed: boolean = false;

  // a bit ugly
  let hovering: boolean = false;
</script>

<button
  class="flex items-center justify-between py-2 px-3 hover:bg-panelhover rounded-lg w-full"
  on:mouseenter={() => (hovering = true)}
  on:mouseleave={() => (hovering = false)}
  on:click
>
  <div
    class="flex gap-3"
    class:text-paneltext={!hovering}
    class:text-black={hovering}
  >
    <div class:text-panelicon={!hovering} class:text-black={hovering}>
      <svelte:component this={icon} />
    </div>
    <div class="text-sm">{title}</div>
  </div>
  {#if unreadCount > 0}
    <div class="bg-indicator text-indicatortext text-xs px-2 py-1 rounded-md">
      {unreadCount}
    </div>
  {/if}
</button>
