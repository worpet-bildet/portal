<script lang="ts">
  /**
   * Handles the rendering of Groups content. At this point in time, that is
   * Notes, Chat Messages, and Curios.
   */
  import Inline from './Inline.svelte';
  import Block from './Block.svelte';

  export let content;
</script>

{#if content}
  {#if Object.keys(content.block).length > 0}
    <Block block={content.block} />
  {/if}
  {#if Object.keys(content.inline).length > 0}
    <Inline inline={content.inline} />
  {/if}
{/if}
