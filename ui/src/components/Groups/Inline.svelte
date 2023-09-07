<script lang="ts">
  import { isImage } from '@root/util';
  export let inline;
</script>

{#if typeof inline !== 'object' && !Array.isArray(inline)}
  <span>{inline}</span>
{:else if Array.isArray(inline)}
  {#each inline as c}
    <svelte:self inline={c} />
  {/each}
{:else if inline.hasOwnProperty('break')}
  <div class="p-2" />
{:else if inline['ship']}
  <span>{inline['ship']}</span>
{:else if inline['link']}
  <a
    href={inline['link'].href}
    target="_blank"
    class="hover:underline text-link dark:text-link-dark"
  >
    {#if isImage(inline['link'].href)}
      <img src={inline['link'].href} alt={inline['link'].content} />
    {:else}
      {inline['link'].content || inline['link'].href}
    {/if}
  </a>
{:else if inline['inline-code']}
  <span class="bg-offwhite font-mono rounded-md px-2 py-1 dark:bg-panels"
    >{inline['inline-code']}</span
  >
{:else if inline['italics']}
  <span class="italic"><svelte:self inline={inline['italics']} /></span>
{:else if inline['bold']}
  <span class="font-bold"><svelte:self inline={inline['bold']} /></span>
{:else if inline['blockquote']}
  <div class="border-l-4 p-2 text-offwhite">
    <svelte:self inline={inline['blockquote']} />
  </div>
{/if}
