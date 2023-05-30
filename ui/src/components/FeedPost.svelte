<script>
  import { link } from 'svelte-spa-router';
  import { fade, slide } from 'svelte/transition';
  import { format } from 'timeago.js';
  import { me, subscribeToItem } from '@root/api';
  import {
    state,
    getItem,
    keyStrFromObj,
    getCurator,
    getReplies,
    getRepliesByTo,
  } from '@root/state';
  import { getMeta, fromUrbitTime } from '@root/util';
  import { ItemVerticalListPreview, Sigil, FeedPostForm } from '@components';
  import { CommentIcon, IconButton } from '@fragments';

  export let key;
  export let allowReplies = true;

  let item;
  let replies = [];
  state.subscribe((s) => {
    item = getItem(keyStrFromObj(key));
    if (s.isLoaded && !item) {
      return subscribeToItem(key);
    }
    // This is a little confusing but we're merging the global list of comments
    // with any comments that we have made ourselves on the post, which should
    // mean that our comment shows up instantly even if our connection to the
    // indexer is not good
    replies = [
      ...(getReplies(key.ship, key) || []),
      ...(getRepliesByTo(me, key) || []),
    ]
      .filter((a, i, arr) => {
        return (
          i === arr.findIndex((i) => keyStrFromObj(i) === keyStrFromObj(a))
        );
      })
      .sort((a, b) => fromUrbitTime(b.time) - fromUrbitTime(a.time));
    console.log({ replies });
  });

  let showCommentForm = false;

  // TODO: do some parsing of the blurb to figure out whether there are any
  // links that we should respect, and if those links are images we should work
  // out how to render them properly
</script>

{#if item}
  {@const { blurb, ship, createdAt, ref } = getMeta(item)}
  {@const {
    bespoke: { nickname },
  } = getCurator(ship)}
  <div
    class="grid grid-cols-12 rounded-lg shadow p-5 border gap-2 lg:gap-4"
    in:fade
  >
    <div class="col-span-1">
      <div class="rounded-md overflow-hidden shadow">
        <a href={`/${ship}`} use:link>
          <Sigil patp={ship} />
        </a>
      </div>
    </div>
    <div class="col-span-12 md:col-span-11 flex flex-col gap-2">
      <div class="flex gap-2 text-sm">
        <a href={`/${ship}`} use:link>{nickname || ship}</a>
        <span>·</span>
        <span>{format(createdAt)}</span>
      </div>
      <div class="whitespace-pre-wrap line-clamp-50">
        {blurb}
      </div>
      {#if ref}
        <div class="rounded-lg">
          <ItemVerticalListPreview key={ref} />
        </div>
      {/if}
    </div>
    {#if allowReplies}
      <div class="pt-4">
        <IconButton
          icon={CommentIcon}
          active={showCommentForm}
          on:click={() => (showCommentForm = !showCommentForm)}
        >
          {#if replies.length > 0}
            {replies.length}
          {/if}
        </IconButton>
      </div>
    {/if}
    {#if showCommentForm}
      <div class="flex flex-col gap-4 col-span-12" transition:slide>
        <FeedPostForm replyTo={item.keyObj} recommendButtons={false} />
        {#each replies as replyKey (keyStrFromObj(replyKey))}
          <svelte:self key={replyKey} allowReplies={false} />
        {/each}
      </div>
    {/if}
  </div>
{:else}
  <div class="rounded-lg shadow p-5" in:fade>Loading...</div>
{/if}
