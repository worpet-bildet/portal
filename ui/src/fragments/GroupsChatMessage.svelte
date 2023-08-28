<script>
  import { link } from 'svelte-spa-router';
  import { Sigil } from '@components';
  import { InlineChat } from '@fragments';

  export let author;
  export let group;
  export let content;
</script>

<div
  class="col-span-6 p-1 rounded-lg grid grid-cols-12 gap-2 break-words"
>
  <div class="col-span-1">
    <div class="rounded-md overflow-hidden">
      <Sigil patp={`${author}`} />
    </div>
  </div>
  <div class="col-span-11 flex flex-col">
    <div class="flex gap-1 text-grey">
      <a use:link href={`#/${author}`} class="text-sm hover:underline"
        >{author}</a
      >{#if group}<span>in</span><a
          use:link
          href={`/group/${group}/`}
          class="hover:underline">{group}</a
        >{/if}
    </div>
    <div class="text-base">
      {#if content?.story?.inline}
        {#each content.story.inline as chat}
          <InlineChat {chat} />
        {/each}
      {/if}
    </div>
  </div>
</div>
