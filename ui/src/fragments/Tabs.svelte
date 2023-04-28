<script>
  export let tabs, activeTab;
</script>

<div class="flex gap-4">
  {#each tabs as tab}
    <button
      class="cursor-pointer text-l"
      class:underline={activeTab === tab}
      on:click={() => (activeTab = tab)}
    >
      {tab}
    </button>
  {/each}
</div>
