<script lang="ts">
  import { FeedItem, ItemKey } from '$types/portal/item';

  import { keyStrFromObj } from '@root/state';
  import { FeedPost, TipModal } from '@components';
  import { LoadingIcon } from '@fragments';

  export let feed: FeedItem[] = [];

  let handleTipRequest: (key: ItemKey) => void;
</script>

{#if feed && feed.length > 0}
  {#each feed.slice(0, 200) as item (keyStrFromObj(item.key))}
    <FeedPost
      key={item.key}
      on:tipRequest={({ detail: { key } }) => handleTipRequest(key)}
    />
  {/each}
  <TipModal bind:handleTipRequest />
{:else}
  <div class="flex justify-center dark:fill-white mt-4">
    <LoadingIcon />
  </div>
{/if}
