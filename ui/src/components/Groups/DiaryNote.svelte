<script>
  import { link } from 'svelte-spa-router';
  import { Sigil } from '@components';

  import Block from './Block.svelte';
  import Inline from './Inline.svelte';

  export let essay;

  const { author, group, content } = essay;

  console.log({ essay });
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
      {#if content?.length > 0}
        {#each content as c}
          {#if c.inline}
            <Inline {...c} />
          {:else if c.block}
            <Block {...c} />
          {/if}
        {/each}
      {/if}
    </div>
  </div>
</div>
