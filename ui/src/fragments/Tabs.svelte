<script lang="ts">
  export let tabs: {
    tab: string;
    icon?: ConstructorOfATypedSvelteComponent;
  }[];
  export let activeTab: string;
  export let bold: boolean = true;
</script>

<div class="flex justify-start gap-4 border-b">
  {#each tabs as { tab, icon }}
    <button
      class="flex w-full sm:w-auto items-center justify-center sm:justify-start gap-2 cursor-default text-xs md:text-lg hover:text-black hover:duration-500 dark:border-b-white dark:hover:text-white"
      class:cursor-pointer={activeTab !== tab}
      class:border-b-black={activeTab === tab}
      class:border-b-2={activeTab === tab}
      class:text-black={activeTab === tab}
      class:text-grey={activeTab !== tab}
      class:dark:text-white={activeTab === tab}
      class:dark:text-offwhite={activeTab !== tab}
      class:font-bold={bold}
      on:click={() => (activeTab = tab)}
    >
      {#if icon}
        <div class="w-5 h-5">
          <svelte:component this={icon} />
        </div>
      {/if}
      {tab}
    </button>
  {/each}
</div>
