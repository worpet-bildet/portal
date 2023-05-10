<script>
  import { FeedPost } from '@components';

  export let feed;
</script>

{#if Object.values(feed).length > 0}
  {#each Object.values(feed) as item (item.keyStr)}
    <FeedPost {item} />
  {/each}
{:else}
  <div>Loading...</div>
{/if}
