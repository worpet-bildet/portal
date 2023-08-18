<script>
  export let chat;
</script>

{#if typeof chat !== 'object' && !Array.isArray(chat)}
  <span>{chat}</span>
{:else if chat.hasOwnProperty('break')}
  <div />
{:else if chat['ship']}
  <span>{chat['ship']}</span>
{:else if chat['link']}
  <a href={chat['link'].href} target="_blank"
    >{chat['link'].content || chat['link'].href}</a
  >
{:else if chat['inline-code']}
  <span class="bg-offwhite font-mono rounded-md px-2 py-1"
    >{chat['inline-code']}</span
  >
{:else if Array.isArray(chat)}
  {#each chat as c}
    <svelte:self chat={c} />
  {/each}
{:else if chat['italics']}
  <span class="italic"><svelte:self chat={chat['italics']} /></span>
{:else if chat['bold']}
  <span class="font-bold"><svelte:self chat={chat['bold']} /></span>
{:else if chat['blockquote']}
  <div class="border-l-4 p-2 text-offwhite">
    <svelte:self chat={chat['blockquote']} />
  </div>
{/if}
