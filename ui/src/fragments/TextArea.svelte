<script>
  import { isSubmitHotkey } from '@root/util';
  import linkifyHtml from 'linkify-html';
  import autosize from 'svelte-autosize';
  import { tick, onMount, createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let value = '';

  /**
   * This is one of the most annoying components I have ever made, and I only
   * have myself to blame. In order to get custom formatting within the textarea
   * we are using a contenteditable div for the input. On each input, the
   * innerText property of this div is read and converted to HTML for display
   * in an underlay div. The contenteditable div is transparent and sits atop
   * the actual display of the text. This was the only way I could really figure
   * out for a "rich" texteditor. In practice it's proving to be a little tricky
   * for a couple of main reasons:
   *
   * 1. We can't edit value directly. I've tried a bunch of ways of doing this,
   *    but they all result in the input caret being reset to the start of the
   *    input, which is a non-starter.
   *
   * 2. Browsers handle newline inputs in contenteditable divs in slightly
   *    different ways.
   *
   * We counteract point 1 by using the overlay div, and point 2 we mitigate
   * by detecting the user agent and modifying our newline behaviour
   * accordingly.
   */

  const isSafari = window.navigator.vendor === 'Apple Computer, Inc.';

  let textarea, target;
  const reset = async () => {
    await tick();
    autosize.update(textarea);
    if (target) target.innerHTML = '';
  };

  $: if (!value || value === '') {
    value = '\n';
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
    const inner = isSafari
      ? value.replace(/\n/g, '<br />')
      : value.replace(/\n\n/g, '\n').replace(/\n/g, '<br />');
    target.innerHTML = linkifyHtml(inner, {
      attributes: { class: 'text-link dark:text-link-dark' },
    });
  };

  const handleKeydown = (e) => {
    if (isSubmitHotkey(e)) {
      textarea.blur();
      dispatch('keyboardSubmit');
    } else if (e.keyCode === 13) {
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
    class="p-2 pb-4 w-full text-lg placeholder-grey text-black dark:text-white resize-none leading-tight box-border break-words focus:outline-none absolute top-0 left-0 pointer-events-none"
  />
</div>
