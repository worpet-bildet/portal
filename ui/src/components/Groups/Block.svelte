<script lang="ts">
  import { ItemPreview } from '@components';
  import { ImageLoader } from '@fragments';
  import { deskKeyToItemKey, groupKeyToItemKey } from '@root/state';

  export let block;
</script>

{#if block['cite']}
  {#if block['cite']['group']}
    <ItemPreview key={groupKeyToItemKey(block['cite']['group'])} />
  {/if}
  {#if block['cite']['desk']}
    <ItemPreview key={deskKeyToItemKey(block['cite']['desk']['flag'])} />
  {/if}
{:else if block['image']}
  <a href={block['image']['src']} target="_blank">
    <ImageLoader
      src={block['image']['src']}
      alt={block['image']['alt']}
      class="w-full h-full object-cover rounded-xl my-2"
    />
  </a>
{:else if block.hasOwnProperty('rule')}
  <hr class="mb-2 p-2" />
{/if}
