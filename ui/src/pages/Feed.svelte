<script>
  import { push } from 'svelte-spa-router';
  import config from '@root/config';
  import { me, subscribeToItem } from '@root/api';
  import { state, getGlobalFeed, getCuratorFeed } from '@root/state';
  import {
    Feed,
    ItemVerticalListPreview,
    SidebarPal,
    FeedPostForm,
  } from '@components';
  import { RightSidebar, SidebarGroup, SearchIcon, Sigil } from '@fragments';
  import { fromUrbitTime, isValidPatp } from '@root/util';

  let pals, feed;
  state.subscribe((s) => {
    ({ pals } = s);
    if (!s.isLoaded) return;
    if (s.isLoaded && !getGlobalFeed()) {
      return subscribeToItem({
        struc: 'feed',
        ship: config.indexer,
        cord: '',
        time: 'global',
      });
    }
    let mergedFeed = getGlobalFeed().concat(getCuratorFeed(me));
    feed = mergedFeed
      .filter((a) => !!a)
      .filter((a, idx) => {
        return mergedFeed.findIndex((b) => b.time === a.time) === idx;
      })
      .sort((a, b) => fromUrbitTime(b.time) - fromUrbitTime(a.time));
  });

  let searchShip;
  let lastValidShip = searchShip;
  $: {
    if (isValidPatp(searchShip)) {
      lastValidShip = isValidPatp(searchShip);
    }
  }
  const search = () => {
    if (!lastValidShip) return;
    push(`/${lastValidShip}`);
  };
</script>

<div class="grid grid-cols-9 gap-8">
  <div class="flex flex-col gap-4 col-span-12 md:col-span-6">
    <FeedPostForm />
    <Feed {feed} />
  </div>
  <RightSidebar>
    <SidebarGroup>
      <div class="flex flex-col gap-4">
        <div class="text-xl font-bold">Find a curator</div>
        <div
          class="flex w-full gap-4 items-center border shadow rounded-lg p-4 justify-between"
        >
          <div class="flex gap-4">
            <div class="w-6"><Sigil patp={lastValidShip || '~zod'} /></div>
            <input
              type="text"
              class="bg-transparent border-b"
              placeholder="~worpet-bildet"
              bind:value={searchShip}
              on:keydown={(e) => (e.key === 'Enter' ? search() : null)}
            />
          </div>
          <button class="w-5" on:click={search}><SearchIcon /></button>
        </div>
      </div>
    </SidebarGroup>
    <SidebarGroup>
      {#if $state.palsLoaded && !pals}
        <div>
          <div class="text-xl font-bold">Portal is better with Pals!</div>
          <ItemVerticalListPreview
            small
            key={{ struc: 'app', ship: '~paldev', cord: 'pals', time: '' }}
          />
        </div>
      {:else if pals}
        <div class="flex flex-col gap-4">
          <div class="text-xl font-bold">Your pals</div>
          <div class="flex flex-col gap-2">
            {#each Object.keys(pals) as pal}
              <SidebarPal pal={`~${pal}`} />
            {/each}
          </div>
        </div>
      {:else}
        Loading...
      {/if}
    </SidebarGroup>
  </RightSidebar>
</div>
