<script>
  export let open = false;

  // this feels suboptimal but it does the job
  $: {
    if (open) {
      document.body.classList.add('overflow-hidden');
      document.getElementById('app').classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
      document.getElementById('app').classList.remove('overflow-hidden');
    }
  }
</script>

{#if open}
  <div
    class="fixed top-0 left-0 h-screen w-screen z-20 bg-grey justify-center items-center opacity-70 backdrop-blur-xl"
  />
  <div
    class="fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-30"
    on:click={() => (open = false)}
  >
    <div
      class="inline justify-center items-center min-w-full md:min-w-[45rem] max-w-screen-lg max-h-screen md:max-h-[40rem] overflow-y-auto opacity-100 bg-offwhite rounded-2xl"
      on:click|stopPropagation
    >
      <div class="w-full h-full py-6 px-8 relative">
        <slot />
      </div>
    </div>
  </div>
{/if}
