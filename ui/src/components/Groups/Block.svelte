<script>
  import { groupKeyToItemKey, deskKeyToItemKey } from '@root/state';
  import { ItemPreview } from '@components';

  export let block;
</script>

{#if block['cite']}
  {#if block['cite']['group']}
    <ItemPreview key={groupKeyToItemKey(block['cite']['group'])} />
  {/if}
  {#if block['cite']['desk']}
    <ItemPreview key={deskKeyToItemKey(block['cite']['desk']['flag'])} />
  {/if}
{:else if block.hasOwnProperty('rule')}
  <hr class="mb-2 p-2" />
{/if}
