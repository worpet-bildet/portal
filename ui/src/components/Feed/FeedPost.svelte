<script>
  import linkifyHtml from 'linkify-html';
  import { link } from 'svelte-spa-router';
  import { format } from 'timeago.js';
  import { fade, slide } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import { api, me } from '@root/api';
  import {
    state,
    getItem,
    keyStrFromObj,
    getCurator,
    getReplies,
    getRepliesByTo,
    getLikes,
  } from '@root/state';
  import { getMeta, fromUrbitTime, getAnyLink, isImage } from '@root/util';
  import { ItemPreview, Sigil, FeedPostForm } from '@components';
  import {
    ChatIcon,
    LikeIcon,
    LikedIcon,
    IconButton,
    LinkPreview,
    StarRating,
    EthereumIcon,
  } from '@fragments';

  export let key;
  export let allowReplies = true;
  export let showRating;

  let item;
  let replies = [];
  let likeCount, likedByMe;
  state.subscribe((s) => {
    item = getItem(keyStrFromObj(key));
    if (s.isLoaded && !item) {
      return api.portal.do.subscribe(key);
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

    let likes = [...(getLikes(key.ship, key) || [])];

    likeCount = likes.length;
    if (likedByMe && !likes.find((l) => l.ship === me)) likeCount++;
    likedByMe = likedByMe || likes.find((l) => l.ship === me);
  });

  let showCommentForm = false;

  function handlePostComment({
    detail: { content, uploadedImageUrl, replyTo, ref },
  }) {
    // TODO: Merge this function with the one from /pages/Feed.svelte
    let post = {};
    if (ref) {
      // Here we need to create the retweet post instead of the type "other"
      post = {
        ...post,
        bespoke: { retweet: { ref: ref, blurb: content || '' } },
      };
    } else {
      post = {
        ...post,
        bespoke: {
          other: {
            title: '',
            blurb: content || '',
            link: '',
            image: uploadedImageUrl || '',
          },
        },
      };
    }
    post = {
      ...post,
      'tags-to': [
        {
          key: replyTo,
          'tag-to': `/${me}/reply-to`,
          'tag-from': `/${replyTo.ship}/reply-from`,
        },
      ],
    };
    return api.portal.do.create(post);
  }

  const likePost = () => {
    likedByMe = true;
    likeCount++;
    return api.portal.do.addTag({
      our: { struc: 'ship', ship: me, cord: '', time: '' },
      their: key,
      'tag-to': `/${me}/like-to`,
      'tag-from': `/${key.ship}/like-from`,
    });
  };

  const dispatch = createEventDispatcher();
  const handleTipRequest = (key) => {
    console.log('woooooo');
    dispatch('tipRequest', { key });
  };
</script>

{#if item}
  {@const { blurb, ship, createdAt, ref, image, rating } = getMeta(item)}
  {@const {
    bespoke: { nickname },
  } = getCurator(ship)}
  {@const blurbLink = getAnyLink(blurb)}
  <div
    id={createdAt}
    class="grid grid-cols-12 bg-panels dark:bg-darkgrey border-b border-x px-5 pt-5 gap-2 lg:gap-4 lg:gap-y-0"
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
      <div class="flex gap-2 text-sm text-grey">
        <a class="text-black dark:text-white" href={`/${ship}`} use:link
          >{nickname || ship}</a
        >
        <span>·</span>
        <span>{format(createdAt)}</span>
      </div>
      <div
        class="whitespace-pre-wrap line-clamp-50 flex flex-col gap-2 break-words"
      >
        <div>
          {@html linkifyHtml(blurb, {
            attributes: {
              class: 'text-link dark:text-link-dark',
              target: '_blank',
            },
          })}
        </div>
        {#if blurbLink}
          {#if isImage(blurbLink)}
            <img src={blurbLink} class="object-cover" alt={blurb} />
          {:else}
            <div>
              <LinkPreview url={blurbLink} />
            </div>
          {/if}
        {/if}
      </div>
      {#if image}
        <a href={image} target="_blank">
          <div class="flex justify-center border rounded-lg overflow-hidden">
            <img src={image} class="object-cover" alt={blurb} />
          </div>
        </a>
      {/if}
      {#if ref}
        <div class="rounded-lg">
          <ItemPreview key={ref} />
        </div>
      {/if}
    </div>
    {#if showRating}
      <div class="flex justify-start col-span-12 col-start-2">
        <StarRating
          config={{
            readOnly: true,
            countStars: 5,
            range: { min: 0, max: 5, step: 1 },
            score: rating,
          }}
        />
      </div>
    {/if}
    <div class="col-span-12 col-start-2 py-2">
      <div class="-ml-2.5 flex gap-8">
        {#if allowReplies}
          <div class="flex">
            <div class="rounded-full overflow-hidden">
              <IconButton
                icon={ChatIcon}
                on:click={() => (showCommentForm = !showCommentForm)}
                class="fill-grey hover:fill-black dark:hover:fill-white"
              />
            </div>
            <div class="pt-2 text-sm w-2 text-grey">
              {#if replies.length > 0}
                {replies.length}
              {/if}
            </div>
          </div>
        {/if}
        <div class="flex items-center">
          {#if likedByMe}
            <div class="w-5 h-5 ml-2 text-error">
              <LikedIcon />
            </div>
            <span class="p-2 text-sm text-error">
              {#if likeCount > 0}
                {likeCount}
              {/if}
            </span>
          {:else}
            <div class="rounded-full overflow-hidden">
              <IconButton
                icon={LikeIcon}
                on:click={likePost}
                class="stroke-grey hover:stroke-error dark:hover:stroke-error"
              />
            </div>
            <div class="pt-2 pb-2 text-sm text-grey">
              {#if likeCount > 0}
                {likeCount}
              {/if}
            </div>
          {/if}
        </div>
        {#if me !== item.keyObj.ship}
          <div class="flex items-center">
            <IconButton
              icon={EthereumIcon}
              on:click={() => handleTipRequest(item.keyObj)}
              class="text-grey hover:text-black dark:hover:text-white"
            />
          </div>
        {/if}
      </div>
    </div>
    {#if showCommentForm}
      <div class="flex flex-col col-span-12 py-4" transition:slide>
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
  <div class="p-5 border-b border-x text-grey" in:fade>
    Contacting {key.ship}...
  </div>
{/if}
