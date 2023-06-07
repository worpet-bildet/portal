<script>
  import linkifyHtml from 'linkify-html';
  import autosize from 'svelte-autosize';
  import { tick } from 'svelte';
  import { getAllLinks } from '@root/util';
  export let value = '';

  let textarea, target;
  const reset = async () => {
    await tick();
    autosize.update(textarea);
    target.innerHTML = '';
  };

  $: if (value === '') {
    reset();
  }

  const handleInput = () => {
    target.innerHTML = linkifyHtml(value, {
      attributes: { class: 'text-link' },
    });
  };

  let html;
</script>

<div class="relative">
  <div
    contenteditable
    use:autosize
    bind:this={textarea}
    bind:innerText={value}
    on:input={handleInput}
    {...$$props}
    class="p-2 pb-4 w-full text-lg placeholder-grey resize-none leading-tight box-border break-words border-b focus:outline-none z-10 text-transparent"
  />
  <div
    bind:this={target}
    class="p-2 pb-4 w-full text-lg placeholder-grey resize-none leading-tight box-border break-words focus:outline-none absolute top-0 left-0 pointer-events-none"
  >
    &nbsp;
  </div>
</div>
