<script lang="ts">
  import { ItemKey, Item } from '$types/portal/item';

  import { link, location, push } from 'svelte-spa-router';
  import { format } from 'timeago.js';
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import { api, me } from '@root/api';
  import {
    state,
    getItem,
    keyStrFromObj,
    getReplies,
    getRepliesByTo,
    getLikes,
  } from '@root/state';
  import { getMeta, fromUrbitTime, getAnyLink, isValidPatp } from '@root/util';
  import { ItemPreview, InlineShip } from '@components';
  import { ChatIcon, LikeIcon, LikedIcon, LinkPreview } from '@fragments';
  import InlineItem from '../InlineItem.svelte';

  export let key: ItemKey;
  export let allowRepliesDepth = 2;
  export let showRating = false;
  export let indent = false;
  export let isReplyFormOpen = false;

  let item: Item;
  let replies: ItemKey[] = [];
  let numLikes: number;
  let isLikedByMe: boolean;
  let showReplies = false;

  const loadPost = (_k) => {
    item = getItem(key);
    if ($state.isLoaded && !item) {
      return api.portal.do.subscribe(key);
    }

    // This is a little confusing but we're merging the global list of comments
    // with any comments that we have made ourselves on the post, which should
    // mean that our comment shows up instantly even if our connection to the
    // indexer is not good
    replies = [...(getReplies(key) || []), ...(getRepliesByTo(me, key) || [])]
      .filter((a, i, arr) => {
        return (
          i === arr.findIndex((i) => keyStrFromObj(i) === keyStrFromObj(a))
        );
      })
      .sort((a, b) => fromUrbitTime(a.time) - fromUrbitTime(b.time));

    let likes = [...(getLikes(key.ship, key) || [])];

    numLikes = likes.length;
    if (isLikedByMe && !likes.find((l) => l.ship === me)) numLikes++;
    isLikedByMe = isLikedByMe || !!likes.find((l) => l.ship === me);
  };

  $: $state && loadPost(key);

  const likePost = () => {
    isLikedByMe = true;
    numLikes++;
    return api.portal.do.addTag({
      our: { struc: 'ship', ship: me, cord: '', time: '' },
      their: key,
      'tag-to': `/${me}/like-to`,
      'tag-from': `/${key.ship}/like-from`,
    });
  };

  // TODO: this is quite not good
  const linkifyMentions = (html) => {
    return html
      .split(' ')
      .map((word) => {
        if (word.substr(0, 1) === '~' && isValidPatp(word)) {
          return `<a href="#/${word}" use:link class="text-link">${word}</a>`;
        }
        return word;
      })
      .join(' ');
  };

  const dispatch = createEventDispatcher();
  const handleTipRequest = (key: ItemKey): boolean =>
    dispatch('tipRequest', { key });

  const showMore = () => {
    postContainer.classList.remove('max-h-96');
    showAll = true;
  };
  const showLess = () => {
    postContainer.classList.add('max-h-96');
    showAll = false;
  };

  const getRef = (s) => {
    try {
      const { ref } = JSON.parse(s.trim());
      return ref;
    } catch (e) {
      return false;
    }
  };

  let postContainer;
  let longPost = false;
  let showAll = true;
  $: if (postContainer) {
    // if the client height of the post container is more than 24 rem, we should
    // show a "see more" button on the post, so that you can scroll past it
    if (postContainer.clientHeight > 36 * 16) {
      longPost = true;
      showAll = false;
      postContainer.classList.add('max-h-96');
    }
  }
  $: expandPreview = $location.includes(keyStrFromObj(key));
  $: previewNavigate = () => push(keyStrFromObj(key));
</script>

{#if item}
  {@const { blurb, ship, createdAt, ref, image, rating } = getMeta(item)}
  {@const blurbLink = getAnyLink(blurb)}
  <div class="flex flex-col gap-2 w-full" in:fade>
    <div class="flex items-center justify-between px-3">
      <div class="flex items-center gap-1">
        <InlineShip patp={ship} />
      </div>
      <div class="text-xs text-light">{format(createdAt)}</div>
    </div>
    <div class="flex w-full gap-4">
      {#if indent}
        <div class="border-2 ml-6 mr-1" />
      {/if}
      <div
        class="flex flex-col w-full bg-panel text-posttext px-3 py-5 whitespace-pre-wrap break-words gap-5"
        class:rounded-t-xl={isReplyFormOpen}
        class:rounded-xl={!isReplyFormOpen}
      >
        <p>
          {#each blurb.split(/(\s)/) as word}
            {#if getRef(word)}
              <InlineItem keyStr={getRef(word)} />
            {:else}
              {word}
            {/if}
          {/each}
        </p>
        {#if ref}
          <ItemPreview key={ref} {expandPreview} on:expand={previewNavigate} />
        {/if}
        {#if blurbLink}
          <LinkPreview url={blurbLink} />
        {/if}
        <div class="grid grid-cols-8">
          <div class="col-span-1 flex items-center gap-2">
            {#if isLikedByMe}
              <div class="w-6 h-6 text-greyicon"><LikedIcon /></div>
              <div class="text-light">{numLikes}</div>
            {:else}
              <div class="w-6 h-6 text-greyicon"><LikeIcon /></div>
              <div class="text-light">{numLikes}</div>
            {/if}
          </div>
          <a
            use:link
            href={keyStrFromObj(item.keyObj)}
            class="col-span-1 flex items-center gap-2"
          >
            <div class="w-6 h-6 text-darkgreyicon"><ChatIcon /></div>
            <div class="text-light">{replies.length}</div>
          </a>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="p-5 border-b border-x text-grey" in:fade>
    Contacting {key.ship}...
  </div>
{/if}
