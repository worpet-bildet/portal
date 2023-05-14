<script>
  export let open = false;
</script>

{#if open}
  <div
    class="fixed top-0 left-0 h-full w-full z-20 bg-gradient-bottom flex justify-center items-center opacity-70 backdrop-blur-xl"
  />
  <div
    class="fixed top-0 left-0 h-full w-full flex justify-center items-center z-30"
    on:click={() => (open = false)}
  >
    <div
      class="flex justify-center items-center w-4/5 h-4/5 opacity-100 bg-gradient-top rounded-2xl border shadow-2xl"
      on:click|stopPropagation
    >
      <div class="w-full h-full p-4 overflow-y-scroll relative">
        <slot />
      </div>
    </div>
  </div>
{/if}
