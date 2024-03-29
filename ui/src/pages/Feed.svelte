<script lang="ts">
  import { FeedItem, ItemKey } from '$types/portal/item';

  import { push } from 'svelte-spa-router';

  import { Feed, FeedPostForm, ItemPreview, RadioStations } from '@components';
  import {
    GitHubIcon,
    LoadingIcon,
    RightSidebar,
    SidebarGroup,
    UrbitIcon,
    XIcon,
  } from '@fragments';
  import { api, me } from '@root/api';
  import config from '@root/config';
  import {
    getCollectedItemLeaderboard,
    getCuratorFeed,
    getGlobalFeed,
    getGroupsFeed,
    keyStrToObj,
    state,
  } from '@root/state';
  import { fromUrbitTime, isValidPatp } from '@root/util';

  let sortedPals: string[] = [];
  let sortedRecommendations: [string, number][] = [];
  let patpItemCount: { [key: string]: number } = {};
  let feed: FeedItem[] = [];
  let groupsFeed: FeedItem[] = [];
  let promptedFeed: FeedItem[] = [];
  let loading: boolean;
  const maxFeedLength: number = 100;

  const subToGlobalFeed = (): void => {
    return api.portal.do.subscribe({
      struc: 'feed',
      ship: config.indexer,
      cord: '',
      time: 'global',
    });
  };

  $: groupsFeed = ($state ? getGroupsFeed(me) : [])
    .sort((a, b) => fromUrbitTime(b.time) - fromUrbitTime(a.time))
    .slice(0, maxFeedLength);

  const globalFeed = (): FeedItem[] =>
    getGlobalFeed().concat(getCuratorFeed(me)).concat(groupsFeed);

  state.subscribe((s) => {
    let { pals } = s;
    if (!s.isLoaded) return;
    if (s.isLoaded && !getGlobalFeed()) {
      return subToGlobalFeed();
    }

    feed = globalFeed()
      .filter((a) => !!a)
      .filter(
        (a, idx) => globalFeed().findIndex((b) => b.time === a.time) === idx
      )
      .filter(
        (a) => fromUrbitTime(a.time) > Date.now() - 1000 * 60 * 60 * 24 * 14
      )
      .sort((a, b) => fromUrbitTime(b.time) - fromUrbitTime(a.time))
      .slice(0, maxFeedLength);

    // Get the latest post, if it was more than six hours ago, send another sub
    if (
      feed[0] &&
      fromUrbitTime(feed[0].time) < Date.now() - 1000 * 60 * 60 * 6
    ) {
      subToGlobalFeed();
    }

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

    sortedRecommendations = getCollectedItemLeaderboard(me)
      .filter((a) => !a[0].includes('ship'))
      .slice(0, 4);
  });

  let searchShip: string;
  let lastValidShip: string | false = searchShip;
  $: {
    if (isValidPatp(searchShip)) {
      lastValidShip = isValidPatp(searchShip);
    }
  }
  const search = () => {
    if (!lastValidShip) return;
    push(`/${lastValidShip}`);
  };

  const recommendedApps: ItemKey[] = [
    { struc: 'app', ship: '~paldev', cord: 'pals', time: '' },
    { struc: 'app', ship: '~nodmyn-dosrux', cord: 'radio', time: '' },
  ];
</script>

<div class="grid grid-cols-12 gap-8 mb-4 h-full">
  <div class="flex flex-col gap-8 rounded-t-2xl col-span-12 md:col-span-7">
    <div
      class="sm:block w-full h-full"
      class:hidden={!$state.isComposing}
      class:block={$state.isComposing}
    >
      <FeedPostForm
        placeholder="Penny for your thoughts? Type '~' to insert a reference"
      />
    </div>
    {#if !$state.isComposing}
      <div>
        {#if loading}
          <div class="flex justify-center dark:fill-white items-center py-20">
            <div class="w-10 h-10 dark:stroke-white"><LoadingIcon /></div>
          </div>
        {:else}
          <Feed feed={promptedFeed.length > 0 ? promptedFeed : feed} />
        {/if}
      </div>
    {/if}
  </div>
  <RightSidebar>
    <RadioStations />
    {#if ($state.palsLoaded && !$state.pals) || !$state.radioStations}
      <SidebarGroup>
        <div>
          <div class="text-xl font-bold pb-4 px-2">
            Portal is better with %pals
          </div>
          <div class="flex flex-col gap-2">
            {#each recommendedApps as key}
              <ItemPreview {key} small />
            {/each}
          </div>
        </div>
      </SidebarGroup>
    {/if}
    {#if sortedRecommendations.length}
      <SidebarGroup>
        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-1 px-2">
            <div class="flex items-start justify-between text-xl font-bold">
              <div>Discover More Urbit Content</div>
              <!-- <a use:link href={'#/explore'} class="text-flavour text-xs"
                >See all</a
              > -->
            </div>
            <div class="text-flavour text-sm">Apps, Groups & Collections</div>
          </div>
          {#each sortedRecommendations as item}
            <ItemPreview key={item[0]} keyStr={item[0]} />
          {/each}
        </div>
        <div class="flex flex-col gap-4" />
      </SidebarGroup>
    {/if}
    <div
      class="flex justify-between items-center gap-2 mx-2 text-secondary text-sm"
    >
      <div class="text-left">© 2023 Terra Nova Labs Limited</div>
      <div class="flex gap-2">
        <a href="https://twitter.com/portal__gm" class="w-4 h-4"><XIcon /></a>
        <a href="https://github.com/worpet-bildet/portal/" class="w-4 h-4"
          ><GitHubIcon /></a
        >
        <a href="https://urbit.org" class="w-4 h-4"><UrbitIcon /></a>
      </div>
    </div>
  </RightSidebar>
</div>
