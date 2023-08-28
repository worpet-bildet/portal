<script>
  export let tabs, activeTab;
</script>

<div class="flex gap-4 border-b mb-4">
  {#each tabs as tab}
    <button
      class="cursor-pointer text-lg hover:text-black font-bold hover:duration-500 dark:border-b-white dark:hover:text-white"
      class:border-b-black={activeTab === tab}
      class:border-b-2={activeTab === tab}
      class:text-black={activeTab === tab}
      class:text-grey={activeTab !== tab}
      class:dark:text-white={activeTab === tab}
      class:dark:text-offwhite={activeTab !== tab}
      on:click={() => (activeTab = tab)}
    >
      {tab}
    </button>
  {/each}
</div>
