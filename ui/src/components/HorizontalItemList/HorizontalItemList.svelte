<script>
  import { getTitle, getDescription, getPayload } from '@root/util';
  import Item from './Item.svelte';

  export let list;
</script>

{#if list && getPayload(list.item).length !== 0}
  <div class="flex flex-col text-left">
    <div>
      <div>{getTitle(list.item)}</div>
      <div>{getDescription(list.item)}</div>
    </div>
    <div class="flex flex-row overflow-x-scroll">
      {#each getPayload(list.item) as { keyStr }}
        <div>
          <Item {keyStr} />
        </div>
      {/each}
    </div>
  </div>
{:else}
  <div />
{/if}
