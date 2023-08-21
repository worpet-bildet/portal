<script>
  import { FeedPost, TipModal } from '@components';

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
  <div>Loading...</div>
{/if}
