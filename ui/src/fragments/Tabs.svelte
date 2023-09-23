<script lang="ts">
  export let tabs: string[];
  export let activeTab: string;
</script>

<div class="flex gap-4 border-b">
  {#each tabs as tab}
    <button
      class="cursor-default text-lg hover:text-black font-bold hover:duration-500 dark:border-b-white dark:hover:text-white"
      class:cursor-pointer={activeTab !== tab}
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
