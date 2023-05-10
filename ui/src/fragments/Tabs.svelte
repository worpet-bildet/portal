<script>
  export let tabs, activeTab;
</script>

<div class="flex gap-4 border-b">
  {#each tabs as tab}
    <button
      class="cursor-pointer text-lg opacity-70"
      class:active={activeTab === tab}
      class:font-bold={activeTab === tab}
      class:opacity-100={activeTab === tab}
      on:click={() => (activeTab = tab)}
    >
      {tab}
    </button>
  {/each}
</div>

<style>
  .active {
    border-bottom: 2px solid #fff;
  }
  .border-b {
    border-color: #808080;
  }
</style>
