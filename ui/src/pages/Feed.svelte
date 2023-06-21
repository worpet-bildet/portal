<script>
  import { push } from 'svelte-spa-router';
  import config from '@root/config';
  import { me, subscribeToItem, poke } from '@root/api';
  import {
    state,
    getGlobalFeed,
    getCuratorFeed,
    keyStrToObj,
    getCollectedItemLeaderboard,
  } from '@root/state';
  import {
    Feed,
    ItemVerticalListPreview,
    SidebarPal,
    FeedPostForm,
    Sigil,
  } from '@components';
  import {
    RightSidebar,
    SidebarGroup,
    SearchIcon,
    PersonIcon,
  } from '@fragments';
  import { fromUrbitTime, isValidPatp } from '@root/util';

  let sortedPals = [];
  let sortedRecommendations = [];
  let patpItemCount = {};
  let feed;
  state.subscribe((s) => {
    let { pals } = s;
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

    // We also want to sort the pals here by how many posts they have made
    if (pals) {
      patpItemCount = {};
      Object.keys(s).forEach((k) => {
        let keyObj = keyStrToObj(k);
        if (keyObj.struc !== 'other') return;
        if (!patpItemCount[keyObj.ship]) {
          return (patpItemCount[keyObj.ship] = 1);
        }
        patpItemCount[keyObj.ship]++;
      });
      // now we sort the pals list
      sortedPals = Object.keys(pals).sort((a, b) => {
        return (patpItemCount[`~${b}`] || 0) - (patpItemCount[`~${a}`] || 0);
      });
    }

    sortedRecommendations = getCollectedItemLeaderboard(me).slice(0, 4);
  });

  const handlePost = ({ detail: { content, uploadedImageUrl } }) => {
    poke({
      app: 'portal-manager',
      mark: 'portal-action',
      json: {
        create: {
          bespoke: {
            other: {
              title: '',
              blurb: content || '',
              link: '',
              image: uploadedImageUrl || '',
            },
          },
          'prepend-to-feed': [
            {
              ship: me,
              struc: 'feed',
              time: '~2000.1.1',
              cord: '',
            },
          ],
        },
      },
    });
  };

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
  const sortRadioStations = (stations) => {
    return stations
      .sort((a, b) => b.time - a.time)
      .filter((s) => s.viewers > 0)
      .filter((s) => !!s.description)
      .slice(0, 4);
  };
  const tuneRadio = (location) => {
    window.open(
      `${window.location.origin}/apps/radio?station=${encodeURIComponent(
        location
      )}`
    );
  };
</script>

<div class="grid grid-cols-9 gap-8 mb-4">
  <div class="flex flex-col gap-4 col-span-12 md:col-span-6">
    <FeedPostForm on:post={handlePost} />
    <Feed {feed} />
  </div>
  <RightSidebar>
    <SidebarGroup>
      <div class="flex flex-col gap-4 mx-2 mb-1 overflow-hidden">
        <div class="text-xl font-bold">Find a curator</div>
        <div
          class="flex w-full gap-4 items-center rounded-lg p-4 justify-between"
        >
          <div class="flex gap-4">
            <div class="w-6"><Sigil patp={lastValidShip || '~zod'} /></div>
            <input
              type="text"
              class="border-b focus:outline-none placeholder-grey"
              placeholder="~worpet-bildet"
              bind:value={searchShip}
              on:keydown={(e) => (e.key === 'Enter' ? search() : null)}
            />
          </div>
          <button class="w-5" on:click={search}><SearchIcon /></button>
        </div>
      </div>
    </SidebarGroup>
    {#if sortedRecommendations.length > 0}
      <SidebarGroup>
        <div class="text-xl font-bold mx-2">Most recommended</div>
        {#each sortedRecommendations as [recommendation, count]}
          <ItemVerticalListPreview key={keyStrToObj(recommendation)} small />
        {/each}
      </SidebarGroup>
    {/if}
    {#if $state.radioStations}
      <SidebarGroup>
        <div class="text-xl font-bold mx-2">Jump into %radio 📻</div>
        <div class="flex flex-col gap-4">
          {#each sortRadioStations($state.radioStations) as { description, viewers, location }}
            <button
              class="flex flex-col gap-2 rounded-md p-2 hover:bg-hover dark:hover:border-white hover:duration-500 text-left"
              on:click={() => tuneRadio(location)}
            >
              <div>{description}</div>
              <div
                class="flex items-center w-full justify-between gap-2 text-xs"
              >
                <div>by {location}</div>
                <div class="flex items-center gap-1">
                  <div class="w-4"><PersonIcon /></div>
                  <div>{viewers}</div>
                </div>
              </div>
            </button>
          {/each}
        </div>
      </SidebarGroup>
    {/if}
    <SidebarGroup>
      {#if $state.palsLoaded && !$state.pals}
        <div>
          <div class="text-xl font-bold pb-4 px-2">
            Portal is better with %pals
          </div>
          <ItemVerticalListPreview
            small
            key={{ struc: 'app', ship: '~paldev', cord: 'pals', time: '' }}
          />
        </div>
      {:else if sortedPals && sortedPals.length > 0}
        <div class="flex flex-col gap-4 px-2">
          <div class="text-xl font-bold">Your pals</div>
          <div class="flex flex-col gap-2">
            {#each sortedPals as pal (pal)}
              <SidebarPal pal={`~${pal}`} score={patpItemCount[`~${pal}`]} />
            {/each}
          </div>
        </div>
      {:else}
        Loading...
      {/if}
    </SidebarGroup>
  </RightSidebar>
</div>
