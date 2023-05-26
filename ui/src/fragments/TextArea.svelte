<script>
  import autosize from 'svelte-autosize';
  import { tick } from 'svelte';
  export let value = '';

  let textarea;
  const reset = async () => {
    await tick();
    autosize.update(textarea);
  };

  $: if (value === '') {
    reset();
  }
</script>

<div class="relative">
  <textarea
    use:autosize
    bind:this={textarea}
    bind:value
    {...$$props}
    class="p-2 w-full text-lg h-full resize-none leading-tight box-border break-words border-b focus:outline-none"
  />
</div>

<style>
  textarea {
    background: transparent;
  }
</style>
