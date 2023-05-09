<script>
  export let open = false;
</script>

{#if open}
  <div
    class="fixed top-0 left-0 h-full w-full z-50 bg-black flex justify-center items-center"
    on:click={() => (open = false)}
  >
    <div
      class="flex justify-center items-center w-2/3 h-2/3 z-2"
      on:click|stopPropagation
    >
      <div class="border w-full h-full p-4 overflow-y-scroll">
        <slot />
      </div>
    </div>
  </div>
{/if}
