<script>
  import { getItem, state } from '@root/state';
  import { FeedPost } from '@components';
  import { FeedPostForm } from '@components';

  export let params;
  const { itemkey } = params;

  // not a huge fan of the fact that we have to do something like this on
  // every root page, there must be a better more global way to do this
  let item;
  state.subscribe(() => {
    item = getItem(itemkey);
  });

  // TODO: Save as a comment to the original post
  const post = (detail) => {
    console.log({ detail });
  };

  // we also want to grab all the comments here, not 100% sure how we do that
  // yet, but it should not be too difficult once we have the backend reworked
</script>

{#if item}
  <div class="grid gap-y-5 mb-4">
    <FeedPost {item} />
    <FeedPostForm on:post={({ detail }) => post(detail)} />
  </div>
{:else}
  Loading...
{/if}
