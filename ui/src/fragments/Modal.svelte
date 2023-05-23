<script>
  export let open = false;
</script>

{#if open}
  <div
    class="fixed top-0 left-0 h-screen w-screen z-20 bg-gradient-bottom flex justify-center items-center opacity-70 backdrop-blur-xl"
  />
  <div
    class="fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-30"
    on:click={() => (open = false)}
  >
    <div
      class="inline justify-center items-center min-w-full md:min-w-[45rem] max-w-screen-lg max-h-[40rem] overflow-y-auto opacity-100 bg-gradient-top rounded-2xl border shadow-2xl"
      on:click|stopPropagation
    >
      <div class="w-full h-full p-4 relative">
        <slot />
      </div>
    </div>
  </div>
{/if}
