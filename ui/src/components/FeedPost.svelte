<script>
  import linkifyHtml from 'linkify-html';
  import { link } from 'svelte-spa-router';
  import { fade, slide } from 'svelte/transition';
  import { format } from 'timeago.js';
  import { poke, me, subscribeToItem } from '@root/api';
  import {
    state,
    getItem,
    keyStrFromObj,
    getCurator,
    getReplies,
    getRepliesByTo,
  } from '@root/state';
  import { getMeta, fromUrbitTime, getAnyLink, isImage } from '@root/util';
  import { ItemVerticalListPreview, Sigil, FeedPostForm } from '@components';
  import { ChatIcon, IconButton, LinkPreview, StarRating } from '@fragments';

  export let key;
  export let allowReplies = true;
  export let showRating;

  let item;
  let subscribingTo = {};
  let replies = [];
  state.subscribe((s) => {
    item = getItem(keyStrFromObj(key));
    if (s.isLoaded && !item && !subscribingTo[keyStrFromObj(key)]) {
      subscribingTo[keyStrFromObj(key)] = true;
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
  });

  let showCommentForm = false;

  const handlePostComment = ({
    detail: { content, uploadedImageUrl, replyTo },
  }) => {
    poke({
      app: 'portal-manager',
      mark: 'portal-action',
      json: {
        create: {
          bespoke: {
            other: {
              title: '',
              blurb: content,
              link: '',
              image: uploadedImageUrl,
            },
          },
          'tags-to': [
            {
              key: replyTo,
              'tag-to': `/${me}/reply-to`,
              'tag-from': `/${replyTo.ship}/reply-from`,
            },
          ],
        },
      },
    });
  };

  const customFetcher = async (url) => {
    const response = await fetch(
      `https://preview.foddur-hodler.one/v2?url=${url}`
    );
    const json = await response.json();
    return json.metadata;
  };
</script>

{#if item}
  {@const { blurb, ship, createdAt, ref, image, rating } = getMeta(item)}
  {@const {
    bespoke: { nickname },
  } = getCurator(ship)}
  {@const blurbLink = getAnyLink(blurb)}
  <div
    class="grid grid-cols-12 bg-panels rounded-lg p-5 gap-2 lg:gap-4"
    in:fade
  >
    <div class="col-span-1">
      <div class="rounded-md overflow-hidden">
        <a href={`/${ship}`} use:link>
          <Sigil patp={ship} />
        </a>
      </div>
    </div>
    <div class="col-span-12 md:col-span-10 flex flex-col gap-2">
      <div class="flex gap-2 text-sm">
        <a href={`/${ship}`} use:link>{nickname || ship}</a>
        <span>·</span>
        <span>{format(createdAt)}</span>
      </div>
      <div
        class="whitespace-pre-wrap line-clamp-50 flex flex-col gap-2 break-words"
      >
        <div>
          {@html linkifyHtml(blurb)}
        </div>
        {#if blurbLink}
          {#if isImage(blurbLink)}
            <img src={blurbLink} class="object-cover" alt={blurb} />
          {:else}
            <div>
              <LinkPreview url={blurbLink} fetcher={customFetcher} />
            </div>
          {/if}
        {/if}
      </div>
      {#if image}
        <a href={image} target="_blank">
          <div
            class="flex justify-center border shadow rounded-lg overflow-hidden"
          >
            <img src={image} class="object-cover" alt={blurb} />
          </div>
        </a>
      {/if}
      {#if ref}
        <div class="rounded-lg">
          <ItemVerticalListPreview key={ref} />
        </div>
      {/if}
    </div>
    {#if showRating}
      <div class="flex justify-start col-span-12 col-start-2">
        <StarRating
          config={{
            readOnly: true,
            countStars: 5,
            range: {
              min: 0,
              max: 5,
              step: 1,
            },
            score: rating,
          }}
        />
      </div>
    {/if}
    <div class="col-span-12">
      {#if allowReplies}
        <div class="pt-4">
          <IconButton
            icon={ChatIcon}
            active={showCommentForm}
            on:click={() => (showCommentForm = !showCommentForm)}
          >
            {#if replies.length > 0}
              {replies.length}
            {/if}
          </IconButton>
        </div>
      {/if}
    </div>
    {#if showCommentForm}
      <div class="flex flex-col gap-4 col-span-12" transition:slide>
        <FeedPostForm
          replyTo={item.keyObj}
          recommendButtons={false}
          on:post={handlePostComment}
        />
        {#each replies as replyKey (keyStrFromObj(replyKey))}
          <svelte:self key={replyKey} allowReplies={false} />
        {/each}
      </div>
    {/if}
  </div>
{:else}
  <div class="rounded-lg p-5" in:fade>Loading...</div>
{/if}
