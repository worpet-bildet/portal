<script lang="ts">
  import { Create as PortalCreate } from '$types/portal/poke';
  import { FeedItem, ItemKey } from '$types/portal/item';
  import { RadioStation } from '$types/apps/radio';

  import { push } from 'svelte-spa-router';

  import config from '@root/config';
  import { api, me } from '@root/api';
  import {
    state,
    getGlobalFeed,
    getCuratorFeed,
    keyStrToObj,
    getCollectedItemLeaderboard,
  } from '@root/state';
  import { fromUrbitTime, isValidPatp } from '@root/util';
  import {
    Feed,
    ItemPreview,
    SidebarPal,
    FeedPostForm,
    Sigil,
    FeedPromptForm,
  } from '@components';
  import {
    RightSidebar,
    SidebarGroup,
    SearchIcon,
    PersonIcon,
    LoadingIcon,
  } from '@fragments';

  let sortedPals: string[] = [];
  let sortedRecommendations: [string, number][] = [];
  let patpItemCount: { [key: string]: number } = {};
  let feed: FeedItem[] = [];
  let promptedFeed: FeedItem[] = [];
  let loading: boolean;

  const subToGlobalFeed = (): void => {
    return api.portal.do.subscribe({
      struc: 'feed',
      ship: config.indexer,
      cord: '',
      time: 'global',
    });
  };

  function handleShipSearchKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      search();
    }
  }

  const globalFeed = (): FeedItem[] =>
    getGlobalFeed().concat(getCuratorFeed(me));

  state.subscribe((s) => {
    let { pals } = s;
    if (!s.isLoaded) return;
    if (s.isLoaded && !getGlobalFeed()) {
      return subToGlobalFeed();
    }

    feed = globalFeed()
      .filter((a) => !!a)
      .filter((a, idx) => {
        return globalFeed().findIndex((b) => b.time === a.time) === idx;
      });

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

    sortedRecommendations = getCollectedItemLeaderboard(me).slice(0, 4);
  });

  const handlePost = ({
    detail: { content, uploadedImageUrl, ref, time },
  }): void => {
    // let post = { time } as PortalCreate;
    // if (ref) {
    //   // Here we need to create the retweet post instead of the type "other"
    //   post = {
    //     ...post,
    //     bespoke: {
    //       retweet: {
    //         ref: ref,
    //         blurb: content || '',
    //       },
    //     },
    //   };
    // } else {
    //   post = {
    //     ...post,
    //     bespoke: {
    //       other: {
    //         title: '',
    //         blurb: content || '',
    //         link: '',
    //         image: uploadedImageUrl || '',
    //       },
    //     },
    //   };
    // }
    // post = {
    //   ...post,
    //   'prepend-to-feed': [
    //     {
    //       ship: me,
    //       struc: 'feed',
    //       time: '~2000.1.1',
    //       cord: '',
    //     },
    //   ],
    //   'tags-to': [],
    // };
    // // check each word of the content for a mention, and if so, create a social
    // // graph tag for the mention
    // content
    //   .split(' ')
    //   .filter((word) => word.substr(0, 1) === '~' && isValidPatp(word))
    //   .forEach((word) => {
    //     post = {
    //       ...post,
    //       'tags-to': [
    //         ...post['tags-to'],
    //         {
    //           key: { struc: 'ship', ship: word, cord: '', time: '' },
    //           'tag-to': `/${me}/mention-to`,
    //           'tag-from': `/${word}/mention-from`,
    //         },
    //       ],
    //     };
    //   });
    // api.portal.do.create(post);
  };

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
  const sortRadioStations = (stations: RadioStation[]) => {
    return stations
      .sort((a, b) => b.time - a.time)
      .filter((s) => s.viewers > 0)
      .filter((s) => !!s.description)
      .slice(0, 4);
  };

  const tuneRadio = (patp: string) => {
    window.open(
      `${window.location.origin}/apps/radio?station=${encodeURIComponent(patp)}`
    );
  };

  const recommendedApps: ItemKey[] = [
    { struc: 'app', ship: '~paldev', cord: 'pals', time: '' },
    { struc: 'app', ship: '~nodmyn-dosrux', cord: 'radio', time: '' },
  ];
</script>

<div class="grid grid-cols-9 gap-8 mb-4">
  <div class="flex flex-col gap-8 rounded-t-2xl col-span-12 md:col-span-6">
    <div>
      <FeedPostForm
        on:post={handlePost}
        placeholder="Share a limerick, maybe..."
      />
    </div>
    <div>
      {#if loading}
        <div class="flex justify-center dark:fill-white items-center py-20">
          <div class="w-10 h-10"><LoadingIcon /></div>
        </div>
      {:else}
        <Feed feed={promptedFeed.length > 0 ? promptedFeed : feed} />
      {/if}
    </div>
  </div>
  <RightSidebar>
    {#if sortedRecommendations.length > 0}
      <SidebarGroup>
        <div class="text-xl font-bold mx-2">Most recommended</div>
        {#each sortedRecommendations as [recommendation]}
          <ItemPreview key={keyStrToObj(recommendation)} small />
        {/each}
        <button
          class="text-left rounded-lg text-grey hover:text-black dark:hover:text-white px-4"
          on:click={() => push('/explore')}
        >
          Show more
        </button>
      </SidebarGroup>
    {/if}
    {#if $state.radioStations}
      <SidebarGroup>
        <div class="text-xl font-bold mx-2">Jump into %radio 📻</div>
        <div class="flex flex-col gap-4">
          {#each sortRadioStations($state.radioStations) as { description, viewers, location }}
            <button
              class="flex flex-col gap-2 rounded-md p-2 hover:bg-panels-hover dark:hover:bg-transparent dark:border dark:border-transparent dark:hover:border-white hover:duration-500 text-left"
              on:click={() => tuneRadio(location)}
            >
              <div>{description}</div>
              <div
                class="flex items-center w-full justify-between gap-2 text-xs"
              >
                <div>by {location}</div>
                <div class="flex items-center gap-1">
                  <div class="w-4 dark:fill-white"><PersonIcon /></div>
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
          <div class="flex flex-col gap-2">
            {#each recommendedApps as key}
              <ItemPreview {key} small />
            {/each}
          </div>
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
