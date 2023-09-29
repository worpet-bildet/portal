<script lang="ts">
  import { NoteEssay } from '$types/landscape/diary';

  import Block from './Block.svelte';
  import GroupsWrapper from './GroupsWrapper.svelte';
  import Inline from './Inline.svelte';

  export let essay: NoteEssay;
  export let group: string = '';
  export let isExpanded: boolean = false;
  export let headless: boolean = false;

  const { author, content, title, image, sent } = essay;
</script>

<GroupsWrapper
  {group}
  {author}
  {image}
  {title}
  {isExpanded}
  {headless}
  on:expand
>
  {#if content?.length > 0}
    {#each content as c}
      {#if 'inline' in c}
        <Inline {...c} />
      {:else if 'block' in c}
        <Block {...c} />
      {/if}
    {/each}
  {/if}
</GroupsWrapper>
