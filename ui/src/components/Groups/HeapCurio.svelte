<script>
  import { link } from 'svelte-spa-router';
  import { Sigil } from '@components';

  import Block from './Block.svelte';
  import Inline from './Inline.svelte';

  export let heart;
  export let group;
  let { author, content } = heart;

  let unsupported;
  if (content.block.find((b) => b?.cite?.chan)) {
    unsupported = true;
  }
</script>

<div
  class="col-span-6 p-2 border rounded-lg grid grid-cols-12 gap-2 break-words"
>
  {#if unsupported}
    <div class="col-span-12">
      Links to curios which reference groups messages are not supported, please
      reference the groups message directly.
    </div>
  {:else}
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
        {#if content?.inline}
          {#each content.inline as inline}
            <Inline {inline} />
          {/each}
        {/if}
        {#if content?.block}
          {#each content.block as block}
            <Block {block} />
          {/each}
        {/if}
      </div>
    </div>
  {/if}
</div>
