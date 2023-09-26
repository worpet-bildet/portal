<script lang="ts">
  import { Item, ItemKey } from '$types/portal/item';

  import { link } from 'svelte-spa-router';

  import { me } from '@root/api';
  import {
    state,
    getItem,
    getPostChain,
    getReplies,
    getRepliesByTo,
    getCurator,
    keyStrToObj,
    keyStrFromObj,
  } from '@root/state';
  import { fromUrbitTime, getMeta } from '@root/util';

  import { FeedPost, FeedPostForm } from '@components';

  import { LoadingIcon, RightSidebar } from '@fragments';

  export let params;

  let item: Item;
  let replies: ItemKey[] = [];

  // This is a bit weird, but we're okay with this variable being continually
  // re-bound to the last post in the chain. Once the entire thing is loaded, we
  // will scroll the viewport to this element.
  let postOfInterest: HTMLDivElement;

  const byTime = (a: ItemKey, b: ItemKey) =>
    fromUrbitTime(a.time) - fromUrbitTime(b.time);
  const byMine = (a: ItemKey, b: ItemKey) => {
    if (a.ship === me) {
      return -1;
    } else if (b.ship === me) {
      return 1;
    } else {
      return 0;
    }
  };

  const loadItem = (_k) => {
    const keyStr = window.location.hash.includes('/other/')
      ? `/other/${params.wild}`
      : window.location.hash.includes('/retweet/')
      ? `/retweet/${params.wild}`
      : window.location.hash.includes('/groups-chat-msg/')
      ? `/groups-chat-msg/${params.wild}`
      : window.location.hash.includes('/groups-heap-curio/')
      ? `/groups-heap-curio/${params.wild}`
      : window.location.hash.includes('/groups-diary-note/')
      ? `/groups-diary-note/${params.wild}`
      : '';
    const keyObj = keyStrToObj(keyStr);
    // we don't want to clickjack after finding social connections
    if (!$state.social) return;
    item = getItem(keyStr);
    console.log({ keyStr, item });
    if (!item) return;
    replies = [
      ...(getReplies(keyObj) || []),
      ...(getRepliesByTo(me, keyObj) || []),
    ]
      .filter((a, i, arr) => {
        // dedupe
        return (
          i === arr.findIndex((i) => keyStrFromObj(i) === keyStrFromObj(a))
        );
      })
      .sort(byTime)
      .sort(byMine);
  };

  $: $state && loadItem(params.wild);
  $: postChain = item && [item.keyObj, ...getPostChain(item.keyObj)].reverse();
  $: replyingToNames = postChain
    ?.map(getItem)
    ?.map((i) => getCurator(i?.keyObj?.ship))
    ?.map(getMeta)
    ?.map((m) => m.nickname || m.ship);
  $: postOfInterest?.scrollIntoView();
</script>

<div class="grid grid-cols-12 gap-8 mb-4">
  <div class="flex flex-col gap-8 rounded-t-2xl col-span-12 md:col-span-7">
    <div>
      <a use:link href="/" class="hover:underline">&lt; Feed</a>
    </div>
    {#if !item || (postChain && postChain.length === 0)}
      <div class="flex items-center justify-center w-full h-1/2">
        <div class="w-10 h-10"><LoadingIcon /></div>
      </div>
    {/if}
    {#if postChain}
      {#if postChain.length === 1}
        <div class="mb-6">
          <FeedPost key={postChain[0]} isReplyFormOpen={true} />
          <FeedPostForm
            {replyingToNames}
            replyTo={postChain[0]}
            placeholder={`Respond to ${replyingToNames[0]}`}
          />
        </div>
        {#each replies as reply}
          <div class="pb-6">
            <FeedPost key={reply} />
          </div>
        {/each}
      {:else}
        {#each postChain as key, i}
          <div class="mb-6" bind:this={postOfInterest}>
            <FeedPost
              {key}
              indent={keyStrFromObj(key) !== keyStrFromObj(item.keyObj)}
              isReplyFormOpen={keyStrFromObj(key) ===
                keyStrFromObj(item.keyObj)}
            />
            {#if i === postChain.length - 1}
              <FeedPostForm
                {replyingToNames}
                replyTo={key}
                placeholder={`Respond to ${replyingToNames[0]}`}
              />
            {/if}
          </div>
        {/each}
        {#each replies as reply}
          <div class="pb-6">
            <FeedPost key={reply} />
          </div>
        {/each}
      {/if}
    {/if}
  </div>
  <RightSidebar />
</div>
