<script>
  import linkifyHtml from 'linkify-html';
  import autosize from 'svelte-autosize';
  import { tick, onMount } from 'svelte';
  export let value = '';

  let textarea, target;
  const reset = async () => {
    await tick();
    autosize.update(textarea);
    if (target) target.innerHTML = '';
  };

  $: if (!value || value === '') {
    reset();
  } else {
    handleInput();
  }

  onMount(() => {
    textarea.addEventListener('paste', function (e) {
      e.preventDefault();
      document.execCommand(
        'insertText',
        false,
        e.clipboardData.getData('text/plain')
      );
    });
  });

  const handleInput = () => {
    if (!target) return setTimeout(handleInput, 100);
    target.innerHTML = linkifyHtml(
      value.replace(/\n/g, '<br />').replaceAll('<br /><br />', '<br />'),
      {
        attributes: { class: 'text-link dark:text-link-dark' },
      }
    );
  };
</script>

<div class="relative">
  <div
    contenteditable
    use:autosize
    bind:this={textarea}
    bind:innerText={value}
    on:input={handleInput}
    {...$$props}
    class="p-2 pb-4 w-full text-lg placeholder-grey resize-none leading-tight box-border break-words border-b focus:outline-none z-10 text-transparent caret-black dark:caret-white"
  />
  <div
    bind:this={target}
    class="p-2 pb-4 w-full text-lg placeholder-grey resize-none leading-tight box-border break-words focus:outline-none absolute top-0 left-0 pointer-events-none"
  />
</div>
