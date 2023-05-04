<script>
  import spinner from '@assets/loading.svg';
  export let loading = false;
</script>

<button
  class="border px-2 py-1 w-full flex justify-center items-center"
  on:click
  on:click={() => (loading = true)}
>
  {#if !loading}
    <slot />
  {:else}
    <img src={spinner} alt="Loading" class="w-6 h-6" />
  {/if}
</button>
