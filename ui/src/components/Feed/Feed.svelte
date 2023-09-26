<script lang="ts">
  import { FeedItem, ItemKey } from '$types/portal/item';

  import { keyStrFromObj } from '@root/state';
  import { FeedPost, TipModal } from '@components';
  import { LoadingIcon } from '@fragments';

  export let feed: FeedItem[] = [];

  let handleTipRequest: (key: ItemKey) => void;
</script>

{#if feed && feed.length > 0}
  <div class="flex flex-col gap-12 mb-20">
    {#each feed as item (keyStrFromObj(item.key))}
      <div>
        <FeedPost
          key={item.key}
          on:tipRequest={({ detail: { key } }) => handleTipRequest(key)}
        />
      </div>
    {/each}
  </div>
  <TipModal bind:handleTipRequest />
{:else}
  <div class="flex justify-center dark:fill-white mt-20">
    <div class="w-10 h-10"><LoadingIcon /></div>
  </div>
{/if}
