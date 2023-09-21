<script lang="ts">
  import { NoteEssay } from '$types/landscape/diary';

  import GroupsWrapper from './GroupsWrapper.svelte';
  import Block from './Block.svelte';
  import Inline from './Inline.svelte';

  export let essay: NoteEssay;
  export let group = '';

  const { author, content, title, image, sent } = essay;
</script>

<GroupsWrapper {group} {author}>
  <div class="w-full flex flex-col">
    {#if image}
      <img src={image} class="object-cover rounded-md" alt="cover" />
    {/if}
    <div class="text-2xl font-bold py-4">{title}</div>
    <div class="text-base">
      {#if content?.length > 0}
        {#each content as c}
          {#if 'inline' in c}
            <Inline {...c} />
          {:else if 'block' in c}
            <Block {...c} />
          {/if}
        {/each}
      {/if}
    </div>
  </div>
</GroupsWrapper>
