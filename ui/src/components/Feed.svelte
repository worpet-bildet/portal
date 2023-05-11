<script>
  import { FeedPost } from '@components';

  export let feed;
</script>

{#if feed && feed.length > 0}
  {#each feed as item (item.time)}
    <FeedPost key={item.key} />
  {/each}
{:else}
  <div>Loading...</div>
{/if}
