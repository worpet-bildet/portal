<script>
  import { groupKeyToItemKey, deskKeyToItemKey } from '@root/state';
  import { ItemPreview } from '@components';

  export let block;

  console.log({ block });
</script>

{#if block['cite']}
  {#if block['cite']['group']}
    <ItemPreview key={groupKeyToItemKey(block['cite']['group'])} />
  {/if}
  {#if block['cite']['desk']}
    <ItemPreview key={deskKeyToItemKey(block['cite']['desk']['flag'])} />
  {/if}
{/if}
