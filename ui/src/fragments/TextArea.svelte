<script>
	import { isSubmitHotkey } from '@root/util';
  import linkifyHtml from 'linkify-html';
  import autosize from 'svelte-autosize';
  import { tick, onMount, createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let value = '';

  let textarea, target;
  const reset = async () => {
    await tick();
    autosize.update(textarea);
    if (target) target.innerHTML = '';
  };

  $: if (!value || value === '') {
    value = '\n';
    reset();
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

  const handleInput = (e) => {
    if (!target) return setTimeout(handleInput, 100);
    target.innerHTML = linkifyHtml(
      value.replace(/\n\n/g, '\n').replace(/\n/g, '<br />'),
      {
        attributes: { class: 'text-link dark:text-link-dark' },
      }
    );
  };

  const handleKeydown = (e) => {
    if (isSubmitHotkey(e)) {
      textarea.blur();
      dispatch('keyboardSubmit');
    } else if (e.keyCode == 13 && e.shiftKey === true) {
      e.preventDefault();
      document.execCommand('insertText', false, '\n');
    }
  };
</script>

<div class="relative">
  <div
    contenteditable
    use:autosize
    bind:this={textarea}
    bind:innerText={value}
    on:input={handleInput}
    on:keydown={handleKeydown}
    {...$$props}
    class="p-2 pb-4 w-full text-lg placeholder-grey resize-none leading-tight box-border break-words border-b focus:outline-none z-10 text-transparent caret-black dark:caret-white"
  />
  <div
    bind:this={target}
    class="p-2 pb-4 w-full text-lg placeholder-grey resize-none leading-tight box-border break-words focus:outline-none absolute top-0 left-0 pointer-events-none"
  />
</div>
