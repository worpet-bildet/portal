<script lang="ts">
  import { Item, ItemKey } from '$types/portal/item';

  import { pop } from 'svelte-spa-router';

  import { me } from '@root/api';
  import {
    getCurator,
    getItem,
    getPostChain,
    getIndexerAndLocalReplies,
    keyStrFromObj,
    keyStrToObj,
    setLastViewedPost,
    state,
  } from '@root/state';
  import { collapseNames, fromUrbitTime, getMeta } from '@root/util';

  import { FeedPost, FeedPostForm, ProfileCard } from '@components';

  import { ArrowBackIcon, LoadingIcon } from '@fragments';

  export let params;

  let item: Item;
  let replies: ItemKey[] = [];

  // This is a bit weird, but we're okay with this variable being continually
  // re-bound to the last post in the chain. Once the entire thing is loaded, we
  // will scroll the viewport to this element.
  let postOfInterest: HTMLDivElement;

  const loadItem = (_k) => {
    const keyStr = window.location.hash.includes('/other/')
      ? `/other/${params.wild}`
      : window.location.hash.includes('/retweet/')
      ? `/retweet/${params.wild}`
      : window.location.hash.includes('/tip/')
      ? `/tip/${params.wild}`
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
    if (!item) return;

    replies = getIndexerAndLocalReplies(keyObj, me);
  };

  $: $state && loadItem(params.wild);
  $: postChain = item && [item.keyObj, ...getPostChain(item.keyObj)].reverse();
  $: replyingToNames = postChain
    ?.map(getItem)
    ?.map((i) => getMeta(i).ship)
    ?.map(getCurator)
    ?.map(getMeta)
    ?.map((m) => m.nickname || m.ship);
  $: postOfInterest?.scrollIntoView();
  $: $state && item && setLastViewedPost(item.keyStr);
</script>

<div class="grid grid-cols-12 gap-8 mb-4 pb-20">
  <div class="flex flex-col gap-4 rounded-t-2xl col-span-12 md:col-span-7">
    <div>
      <button
        on:click={pop}
        class="flex gap-2 items-center border border-panelicon rounded-lg text-panelicon px-2 py-1"
        ><div class="w-4 h-4">
          <ArrowBackIcon />
        </div>
        <div>Back</div></button
      >
    </div>
    {#if !item || (postChain && postChain.length === 0)}
      <div class="flex items-center justify-center w-full h-1/2">
        <div class="w-10 h-10 dark:stroke-white"><LoadingIcon /></div>
      </div>
    {/if}
    {#if postChain}
      {#if postChain.length === 1}
        <FeedPost key={postChain[0]} isReplyFormOpen={true} />
        <FeedPostForm
          {replyingToNames}
          replyTo={postChain[0]}
          placeholder={`Respond to ${collapseNames(replyingToNames)}`}
        />
        {#each replies as reply}
          <div>
            <FeedPost key={reply} />
          </div>
        {/each}
      {:else}
        {#each postChain as key, i}
          <div bind:this={postOfInterest}>
            <FeedPost
              {key}
              indent={keyStrFromObj(key) !== keyStrFromObj(item.keyObj)}
              isReplyFormOpen={keyStrFromObj(key) ===
                keyStrFromObj(item.keyObj)}
            />
            {#if i === postChain.length - 1}
              <div class="mt-4">
                <FeedPostForm
                  {replyingToNames}
                  replyTo={key}
                  placeholder={`Respond to ${collapseNames(replyingToNames)}`}
                />
              </div>
            {/if}
          </div>
        {/each}
        {#each replies as reply}
          <div>
            <FeedPost key={reply} />
          </div>
        {/each}
      {/if}
    {/if}
  </div>

  <div class="hidden md:block md:col-span-5">
    <div class="sticky top-4">
      <ProfileCard patp={getMeta(item).ship} />
    </div>
  </div>
</div>
