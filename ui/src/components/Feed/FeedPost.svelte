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
    getLikes,
  } from '@root/state';
  import {
    getMeta,
    fromUrbitTime,
    getAnyLink,
    isImage,
    isValidPatp,
    formatPatp,
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

  export let key;
  export let allowRepliesDepth = 2;
  export let showRating = false;

  let item: Item;
  let replies: ItemKey[] = [];
  let likeCount: number;
  let likedByMe: boolean;
  let showReplies = false;

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
      .sort((a, b) => fromUrbitTime(a.time) - fromUrbitTime(b.time));

    // Open the comments if we've been referred to this specific reply
    const referredTo = s.referredTo;
    if (
      referredTo &&
      referredTo.key === keyStrFromObj(item.keyObj) &&
      referredTo.type === 'reply'
    ) {
      showReplies = true;
    } else if (
      referredTo &&
      replies.find((r) => keyStrFromObj(r) === referredTo?.key)
    ) {
      showReplies = true;
    }

    let likes = [...(getLikes(key.ship, key) || [])];

    likeCount = likes.length;
    if (likedByMe && !likes.find((l) => l.ship === me)) likeCount++;
    likedByMe = likedByMe || !!likes.find((l) => l.ship === me);
  });

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
    likedByMe = true;
    likeCount++;
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
  {@const {
    bespoke: { nickname },
  } = getCurator(ship)}
  {@const blurbLink = getAnyLink(blurb)}
  <div class="flex flex-col gap-2 w-full my-6" in:fade>
    <div class="flex items-center justify-between px-3">
      <InlineShip patp={me} {nickname} />
      <div class="text-xs text-light">{format(createdAt)}</div>
    </div>
    <div
      class="flex flex-col bg-panel text-paneltext rounded-xl px-3 py-5 whitespace-pre-wrap break-words gap-5"
    >
      <div>{@html linkifyHtml(DOMPurify.sanitize(blurb))}</div>
      <div class="grid grid-cols-8">
        <div class="col-span-1 flex items-center gap-2">
          {#if likedByMe}
            <div class="w-6 h-6 text-greyicon"><LikedIcon /></div>
            <div class="text-light">{likeCount}</div>
          {:else}
            <div class="w-6 h-6 text-greyicon"><LikeIcon /></div>
            <div class="text-light">{likeCount}</div>
          {/if}
        </div>
        <div class="col-span-1 flex items-center gap-2">
          <div class="w-6 h-6 text-darkgreyicon"><ChatIcon /></div>
          <div class="text-light">{replies.length}</div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="p-5 border-b border-x text-grey" in:fade>
    Contacting {key.ship}...
  </div>
{/if}
