<script>
  import { FeedPost, TipModal } from '@components';
  import { LoadingIcon } from '@fragments';

  let handleTipRequest;
  export let feed;
</script>

{#if feed && feed.length > 0}
  {#each feed as item (item.time)}
    <FeedPost
      key={item.key}
      on:tipRequest={(e) => handleTipRequest(e.detail.key)}
    />
  {/each}
  <TipModal bind:handleTipRequest />
{:else}
  <div class="flex justify-center mt-4">
    <LoadingIcon />
  </div>
{/if}
