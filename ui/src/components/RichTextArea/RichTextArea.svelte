<script lang="ts">
  import { Editor, Extension } from '@tiptap/core';
  import { CharacterCount } from '@tiptap/extension-character-count';
  import { Placeholder } from '@tiptap/extension-placeholder';
  import StarterKit from '@tiptap/starter-kit';
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';

  import CommandList from './CommandList.svelte';
  import InlineItemReference from './InlineItemReference';
  import Commands from './command';
  import { sigItems, sigProps, sigVisible } from './stores';
  import suggestion from './suggestion';

  const dispatch = createEventDispatcher();

  export let placeholder;
  export let editor: Editor;
  export let content: string;

  $: content = editor && editor.getText();

  let selectedIndex = 0;
  $: selectedIndex = $sigVisible ? selectedIndex : 0;

  let element;

  export const handleKeydown = (event: KeyboardEvent) => {
    if (!$sigVisible) return;
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      selectedIndex = (selectedIndex + $sigItems.length - 1) % $sigItems.length;
      return true;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      selectedIndex = (selectedIndex + 1) % $sigItems.length;
      return true;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      selectItem(selectedIndex);
      return true;
    }

    return false;
  };

  function selectItem(index) {
    const item = $sigItems[index];

    if (item) {
      let range = $sigProps.range;
      item.command({ editor, range });
    }
  }

  const KeyboardShortcuts = Extension.create({
    addKeyboardShortcuts() {
      return {
        'Mod-Enter': () => {
          return dispatch('keyboardSubmit');
        },
      };
    },
  });

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [
        StarterKit.configure({
          // paragraph: {
          //   HTMLAttributes: {
          //     class: 'flex grow items-center',
          //   },
          // },
        }),
        KeyboardShortcuts,
        // BlockGroupsReference,
        CharacterCount,
        InlineItemReference,
        Commands.configure({
          suggestion,
        }),
        Placeholder.configure({
          placeholder:
            placeholder ??
            "Penny for your thoughts? Type '~' to insert a reference",
        }),
      ],
      editorProps: {
        attributes: {
          class: 'h-full',
        },
      },
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
      },
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

<div
  bind:this={element}
  on:keydown|capture={handleKeydown}
  class="py-3 ml-2 px-3 w-full text-lg resize-none leading-tight break-words focus:outline-none caret-black dark:caret-white bg-panel dark:bg-darkpanel dark:text-white rounded-lg"
/>
<CommandList {selectedIndex} />

<style>
  :global(.ProseMirror:focus) {
    outline: none;
  }
  :global(.tiptap p.is-editor-empty:first-child::before) {
    color: #6d6d6d;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
    white-space: nowrap;
  }
</style>
