<script lang="ts">
  import { FeedItem, ItemKey } from '$types/portal/item';

  import { FeedPost, TipModal } from '@components';
  import { LoadingIcon } from '@fragments';
  import { keyStrFromObj } from '@root/state';

  export let feed: FeedItem[] = [];

  let handleTipRequest: (key: ItemKey) => void;
</script>

{#if feed && feed.length > 0}
  <div class="flex flex-col gap-6 mb-20">
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
    <div class="w-10 h-10 dark:stroke-white"><LoadingIcon /></div>
  </div>
{/if}
