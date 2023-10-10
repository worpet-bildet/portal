<script lang="ts">
  import { CurioHeart } from '$types/landscape/heap';

  import { dropTrailingBreaks, preSig } from '@root/util';

  import Block from './Block.svelte';
  import GroupsWrapper from './GroupsWrapper.svelte';
  import Inline from './Inline.svelte';

  export let heart: CurioHeart;
  export let group: string = '';
  export let isExpanded: boolean = false;
  export let headless: boolean = false;
  export let imageClickable: boolean = false;

  let { author, content } = heart;

  let unsupported =
    content.block.find((b) => {
      if ('cite' in b) {
        if ('chan' in b.cite) {
          return true;
        }
      }
    }) || false;
</script>

{#if unsupported}
  <div class="col-span-12">
    Links to curios which reference groups messages are not supported, please
    reference the groups message directly.
  </div>
{:else if !content}
  <div>Contacting {preSig(author)}...</div>
{:else}
  <GroupsWrapper {author} {group} {isExpanded} {headless} on:expand>
    {#if content?.inline}
      {#each dropTrailingBreaks(content.inline) as inline}
        <Inline {inline} />
      {/each}
    {/if}
    {#if content?.block}
      {#each dropTrailingBreaks(content.block) as block}
        <Block {block} {imageClickable}/>
      {/each}
    {/if}
  </GroupsWrapper>
{/if}
