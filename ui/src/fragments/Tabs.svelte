<script>
  export let tabs, activeTab;
</script>

<div class="flex gap-4 border-b">
  {#each tabs as tab}
    <button
      class="cursor-pointer text-lg opacity-70 hover:text-white"
      class:border-b-black={activeTab === tab}
      class:border-b-2={activeTab === tab}
      class:border-b-white={activeTab === tab}
      class:font-bold={activeTab === tab}
      class:opacity-100={activeTab === tab}
      on:click={() => (activeTab = tab)}
    >
      {tab}
    </button>
  {/each}
</div>
