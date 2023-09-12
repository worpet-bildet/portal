<script lang="ts">
  import DOMPurify from 'dompurify';
  import linkifyHtml from 'linkify-html';
  import autosize from 'svelte-autosize';
  import { tick, createEventDispatcher } from 'svelte';
  import { isSubmitHotkey } from '@root/util';
  const dispatch = createEventDispatcher();

  export let value: string = '';

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

<div class="relative w-full">
  <textarea
    bind:value
    bind:this={textarea}
    use:autosize
    rows={1}
    on:input={handleInput}
    on:keydown={handleKeydown}
    {...$$props}
    class="py-4 px-3 w-full text-lg placeholder-light resize-none leading-tight break-words focus:outline-none z-10 text-transparent caret-black dark:caret-white bg-panel rounded-lg"
  />
  <div
    bind:this={target}
    class="py-4 px-3 w-full text-lg text-black dark:text-white resize-none leading-tight break-words focus:outline-none absolute top-0 left-0 pointer-events-none whitespace-pre-wrap"
  />
</div>
