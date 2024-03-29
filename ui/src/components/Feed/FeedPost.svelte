<script lang="ts">
  import { Item, ItemKey } from '$types/portal/item';

  import { GroupsItem, InlineShip, ItemPreview } from '@components';
  import {
    ChatIcon,
    ImageLoader,
    ItemImage,
    LikeIcon,
    LinkPreview,
  } from '@fragments';
  import { api, me } from '@root/api';
  import {
    getGroup,
    getIndexerAndLocalReplies,
    getItem,
    getLikes,
    keyStrFromObj,
    state,
  } from '@root/state';
  import {
    getAnyLink,
    getGroupsLink,
    getMeta,
    isUrl,
    isValidPatp,
  } from '@root/util';
  import { createEventDispatcher } from 'svelte';
  import { link, location, push } from 'svelte-spa-router';
  import { fade } from 'svelte/transition';
  import { format } from 'timeago.js';
  import InlineItem from '../InlineItem.svelte';

  export let key: ItemKey;
  export let allowRepliesDepth = 2;
  export let showRating = false;
  export let indent = false;
  export let isReplyFormOpen = false;

  let item: Item;
  let numLikes: number;
  let isLikedByMe: boolean;
  let allReplies = new Set();

  const isGroupsItem = (struc) => {
    return [
      'groups-chat-msg',
      'groups-heap-curio',
      'groups-diary-note',
    ].includes(struc);
  };

  const loadPost = (_k) => {
    item = getItem(key);
    if ($state.isLoaded && !item) {
      return api.portal.do.subscribe(key);
    }

    let likes = [...(getLikes(key.ship, key) || [])];

    numLikes = likes.length;
    if (isLikedByMe && !likes.find((l) => l.ship === me)) numLikes++;
    isLikedByMe = isLikedByMe || !!likes.find((l) => l.ship === me);
  };

  // recursively fetch replies so we can display the total number of replies per OP
  const getNestedReplies = (replies) => {
    if (Array.isArray(replies) && replies.length > 0) {
      for (let reply of replies) {
        allReplies.add(keyStrFromObj(reply));
        const repliesToReply = getIndexerAndLocalReplies(reply);
        if (repliesToReply) {
          getNestedReplies(repliesToReply);
        }
      }
    }
    allReplies = allReplies;
  };

  const loadNestedReplies = () => {
    getNestedReplies(getIndexerAndLocalReplies(key));
  };

  $: $state && loadNestedReplies();

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

  // clicking the post should only take you to groups if we're already on the post's 'other' page.
  export const getExternalLink = () => {
    let postUrl = `${window.location.origin}/apps/portal/#${keyStrFromObj(
      item?.keyObj
    )}`;
    if (window.location.href === postUrl) {
      return getGroupsLink(item);
    } else {
      return '';
    }
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
  $: expandPreview =
    $location.includes(keyStrFromObj(key)) ||
    $location.includes('retweet') ||
    key.struc === 'groups-heap-curio' ||
    key.struc === 'groups-chat-msg';
  $: previewNavigate = () => push(keyStrFromObj(key));
</script>

{#if item}
  {@const { blurb, groupsBlurb, ship, createdAt, ref, image, group } =
    getMeta(item)}
  {@const blurbLink = getAnyLink(blurb || groupsBlurb)}
  <div class="flex flex-col text-left gap-2 w-full" id={item.keyStr} in:fade>
    <div class="flex items-center justify-between px-3">
      <div class="flex items-center gap-1">
        <InlineShip patp={ship} />
        {#if group}
          {@const { title, image, color } = getMeta(getGroup(group))}
          <span class="text-xs sm:text-base px-1">in</span>
          <a
            use:link
            href={`/group/${group}/`}
            class="flex items-center gap-1 text-black text-xs sm:text-base"
          >
            <div class="w-5 h-5">
              <ItemImage {title} {image} {color} />
            </div>
            {title}
          </a>
        {/if}
      </div>
      <div class="text-xs text-secondary">{format(createdAt)}</div>
    </div>
    <div class="flex w-full gap-4">
      {#if indent}
        <div class="border-2 dark:border-secondary ml-6 mr-1" />
      {/if}
      <a
        draggable="false"
        class="flex flex-col w-full bg-panel dark:bg-darkpanel text-black dark:text-white px-3 py-5 whitespace-pre-wrap break-words gap-5 select-text rounded-xl"
        class:hover:bg-panelhover={!isReplyFormOpen}
        class:cursor-default={isReplyFormOpen}
        href={getExternalLink() ||
          `/apps/portal/#${keyStrFromObj(item?.keyObj)}`}
        target={getExternalLink() ? '_blank' : '_self'}
      >
        {#if blurb}
          <p>
            {#each blurb.split(/(\s)/) as word}
              {#if getRef(word)}
                <InlineItem keyStr={getRef(word)} />
              {:else if isUrl(word)}
                <a href={word} target="_blank" class="text-navtextactive"
                  >{word}</a
                >
              {:else}
                {word}
              {/if}
            {/each}
          </p>
        {/if}
        {#if image}
          <a href={image} target="_blank" class="w-full">
            <ImageLoader
              src={image}
              alt="attachment"
              class="rounded-xl w-full h-full object-cover"
            />
          </a>
        {/if}
        {#if ref}
          <ItemPreview key={ref} on:expand={previewNavigate} {expandPreview} />
        {:else if group}
          <GroupsItem
            {item}
            headless
            isExpanded={expandPreview}
            on:expand={previewNavigate}
          />
        {/if}
        {#if blurbLink}
          <LinkPreview url={blurbLink} />
        {/if}
        <div class="grid grid-cols-6 lg:grid-cols-10">
          <a
            use:link
            href={keyStrFromObj(item.keyObj)}
            class="col-span-1 flex items-center gap-2"
          >
            <div class="w-5 h-5 text-secondary"><ChatIcon /></div>
            <div class="text-secondary">{allReplies.size}</div>
          </a>
          <div class="col-span-1 flex items-center gap-2">
            {#if isLikedByMe}
              <div class="w-5 h-5 text-error" in:fade>
                <LikeIcon />
              </div>
              <div class="text-error">{numLikes}</div>
            {:else}
              <button
                class="w-5 h-5 text-transparent stroke-secondary"
                on:click|stopPropagation|preventDefault={likePost}
              >
                <LikeIcon />
              </button>
              <div class="text-secondary">{numLikes}</div>
            {/if}
          </div>
        </div>
      </a>
    </div>
  </div>
{:else}
  <div class="p-5 rounded-xl bg-panel dark:bg-darkpanel text-grey" in:fade>
    Contacting {key.ship}...
  </div>
{/if}
