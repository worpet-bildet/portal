<script>
  import { link } from 'svelte-spa-router';
  import { Sigil } from '@components';
  import Inline from './Inline.svelte';

  export let memo;
  export let group;
  const { author, content } = memo;

  console.log({ content });
</script>

<div
  class="col-span-6 p-2 border rounded-lg grid grid-cols-12 gap-2 break-words"
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
        {#each content.story.inline as inline}
          <Inline {inline} />
        {/each}
      {/if}
    </div>
  </div>
</div>
