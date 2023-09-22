<script lang="ts">
  import DOMPurify from 'dompurify';
  import linkifyHtml from 'linkify-html';
  import autosize from 'svelte-autosize';
  import { tick, createEventDispatcher } from 'svelte';
  import { isSubmitHotkey } from '@root/util';
  const dispatch = createEventDispatcher();
  export let value = '';

  let textarea: HTMLTextAreaElement;
  let target: HTMLDivElement;

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

  const handleInput = () => {
    if (!target) return setTimeout(handleInput, 100);
    target.innerHTML = linkifyHtml(DOMPurify.sanitize(value), {
      attributes: { class: 'text-link dark:text-link-dark' },
    });
  };

  const handleKeydown = (e) => {
    if (isSubmitHotkey(e)) {
      textarea.blur();
      dispatch('keyboardSubmit');
    }
  };
</script>

<div class="relative">
  <textarea
    use:autosize
    bind:this={textarea}
    bind:value
    on:input={handleInput}
    on:keydown={handleKeydown}
    {...$$props}
    class="p-2 pb-4 w-full text-lg placeholder-grey resize-none leading-tight box-border break-words border-b focus:outline-none z-10 text-transparent bg-transparent caret-black dark:caret-white"
  />
  <div
    bind:this={target}
    class="p-2 pb-4 w-full text-lg placeholder-grey text-black dark:text-white resize-none leading-tight box-border break-words focus:outline-none absolute top-0 left-0 pointer-events-none whitespace-pre-wrap"
  />
</div>
