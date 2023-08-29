<script>
  import { link } from 'svelte-spa-router';
  import { format } from 'timeago.js';
  import { getGroup } from '@root/state';
  import { Sigil } from '@components';
  import { getMeta } from '@root/util';

  import Block from './Block.svelte';
  import Inline from './Inline.svelte';

  export let essay;
  export let group;

  const { author, content, title, image, sent } = essay;
</script>

<div
  class="col-span-6 p-2 border rounded-lg grid grid-cols-12 gap-2 break-words"
>
  <div class="col-span-12 grid grid-cols-12 items-center gap-4 text-sm">
    <div class="col-span-1">
      <div class="rounded-md overflow-hidden">
        <Sigil patp={`${author}`} />
      </div>
    </div>
    <div class="col-span-11 flex justify-between text-grey">
      <div class="flex gap-1">
        <a use:link href={`#/~${author}`} class="hover:underline">~{author}</a
        >{#if group}<span>in</span><a
            use:link
            href={`/group/${group}/`}
            class="hover:underline">{getMeta(getGroup(group)).title}</a
          >{/if}
      </div>
      {#if sent}
        <div>
          {format(sent)}
        </div>
      {/if}
    </div>
  </div>
  <div class="col-span-12 flex flex-col">
    {#if image}
      <img src={image} class="object-cover rounded-md" alt="cover" />
    {/if}
    <div class="text-2xl font-bold py-4">{title}</div>
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
