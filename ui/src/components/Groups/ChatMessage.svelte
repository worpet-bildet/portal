<script lang="ts">
  import { ChatMessage } from '$types/landscape/chat';

  import { link } from 'svelte-spa-router';
  import { getGroup } from '@root/state';
  import { getMeta, preSig, formatPatp } from '@root/util';
  import { ItemImage } from '@fragments';

  import GroupsWrapper from './GroupsWrapper.svelte';
  import Inline from './Inline.svelte';
  import Block from './Block.svelte';

  export let group: string = '';
  export let author: string = '';
  export let content: ChatMessage;

  const dropTrailingBreaks = (i) => {
    if (Array.isArray(i) && i[i.length - 1].hasOwnProperty('break')) {
      return i.slice(0, i.length - 1);
    }
    return i;
  };
</script>

{#if !content}
  <div>Contacting {preSig(author)}...</div>
{:else}
  <GroupsWrapper {group} {author}>
    {#if 'story' in content}
      {#if content.story?.inline}
        {#each dropTrailingBreaks(content.story.inline) as inline}
          <Inline {inline} />
        {/each}
      {/if}
      {#if content?.story?.block}
        {#each content.story.block as block}
          <Block {block} />
        {/each}
      {/if}
    {/if}
  </GroupsWrapper>
{/if}
