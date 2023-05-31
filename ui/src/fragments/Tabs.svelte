<script>
  export let tabs, activeTab;
</script>

<div class="flex gap-4 border-b">
  {#each tabs as tab}
    <button
      class="cursor-pointer text-lg hover:text-black font-saucebold hover:duration-500"
      class:border-b-black={activeTab === tab}
      class:border-b-2={activeTab === tab}
      class:text-black={activeTab === tab}
      class:text-grey={activeTab !== tab}
      on:click={() => (activeTab = tab)}
    >
      {tab}
    </button>
  {/each}
</div>
