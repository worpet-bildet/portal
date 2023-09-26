<script lang="ts">
  import { ChatMessage } from '$types/landscape/chat';

  import { preSig, dropTrailingBreaks } from '@root/util';

  import GroupsWrapper from './GroupsWrapper.svelte';
  import Inline from './Inline.svelte';
  import Block from './Block.svelte';

  export let group: string = '';
  export let author: string = '';
  export let content: ChatMessage;
  export let isExpanded: boolean = false;
  export let headless: boolean = false;
</script>

{#if !content}
  <div>Contacting {preSig(author)}...</div>
{:else}
  <GroupsWrapper {group} {author} {isExpanded} {headless} on:expand>
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
