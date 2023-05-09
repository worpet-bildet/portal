<script>
  export let value = '';
  export let minRows = 1;
  export let maxRows;

  $: minHeight = `${1 + minRows * 1.2}em`;
  $: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;
</script>

<div class="relative">
  <div
    aria-hidden="true"
    class="p-2 invisible leading-tight box-border break-words"
    style="min-height: {minHeight}; max-height: {maxHeight}"
  >
    {value + '\n'}
  </div>

  <textarea
    bind:value
    {...$$props}
    class="p-2 overflow-hidden absolute w-full h-full top-0 resize-none leading-tight box-border break-words"
  />
</div>
