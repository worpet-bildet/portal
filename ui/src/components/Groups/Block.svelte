<script>
  import { groupKeyToItemKey } from '@root/state';
  import { ItemPreview } from '@components';

  export let block;
</script>

{#if block['cite']}
  {#if block['cite']['group']}
    <ItemPreview key={groupKeyToItemKey(block['cite']['group'])} />
  {/if}
{/if}
