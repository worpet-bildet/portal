<script lang="ts">
  import { ItemKey, Item } from '$types/portal/item';

  import linkifyHtml from 'linkify-html';
  import DOMPurify from 'dompurify';
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
    getPostChain,
    getLikes,
  } from '@root/state';
  import {
    getMeta,
    fromUrbitTime,
    getAnyLink,
    isImage,
    isValidPatp,
    formatPatp,
    collapseNames,
  } from '@root/util';
  import { ItemPreview, Sigil, FeedPostForm, InlineShip } from '@components';
  import {
    ChatIcon,
    LikeIcon,
    LikedIcon,
    IconButton,
    LinkPreview,
    StarRating,
    EthereumIcon,
    VerticalCollapseIcon,
    VerticalExpandIcon,
  } from '@fragments';
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
    item = getItem(keyStrFromObj(key));
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

  function handlePostComment({
    detail: { content, uploadedImageUrl, replyTo, ref, time },
  }) {
    // TODO: Merge this function with the one from /pages/Feed.svelte
    let post = { 'tags-to': [], time } as any;
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
    // check each word of the content for a mention, and if so, create a social
    // graph tag for the mention
    content
      .split(' ')
      .filter(
        (word: string) => word.substring(0, 1) === '~' && isValidPatp(word)
      )
      .forEach((taggedShip: string) => {
        post = {
          ...post,
          'tags-to': [
            ...post['tags-to'],
            {
              key: { struc: 'ship', ship: taggedShip, cord: '', time: '' },
              'tag-to': `/${me}/mention-to`,
              'tag-from': `/${taggedShip}/mention-from`,
            },
          ],
        };
      });

    post = {
      ...post,
      'tags-to': [
        ...post['tags-to'],
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
</script>

{#if item}
  {@const { blurb, ship, createdAt, ref, image, rating } = getMeta(item)}
  {@const blurbLink = getAnyLink(blurb)}
  <div class="flex flex-col gap-2 w-full" in:fade>
    <div class="flex items-center justify-between px-3">
      <div class="flex items-center gap-1 text-sm">
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
