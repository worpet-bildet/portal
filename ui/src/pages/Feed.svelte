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
    UpRightArrowIcon
  } from '@fragments';
  import { fromUrbitTime, isValidPatp, isHappeningSoon } from '@root/util';

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

    // TODO
    // Get the latest post, if it was more than six hours ago, send another sub
    if (
      feed[0] &&
      fromUrbitTime(feed[0].time) < Date.now() - 1000 * 60 * 60 * 6
    ) {
      subscribeToItem({
        struc: 'feed',
        ship: config.indexer,
        cord: '',
        time: 'global',
      });
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

  const recommendedApps = [
      { struc: 'app', ship: '~paldev', cord: 'pals', time: '' },
      { struc: 'app', ship: '~nodmyn-dosrux', cord: 'radio', time: '' }
  ]

  const events = [
      { title: 'On-nomi happy hour', link: 'https://app.gather.town/app/xAYeiPI2XDYhRM9t/urbit-hacker-house', startDate: '2023-06-29T18:30:00-04:00', endDate: '2023-06-29T20:00:00-04:00', frequency: 'every other week', location: 'in the hacker house', happeningSoon: 'false'},
      { title: 'Core Dev PR Blitz', link: 'https://app.gather.town/app/xAYeiPI2XDYhRM9t/urbit-hacker-house', startDate: '2023-06-19T11:00:00-04:00', endDate: '2023-06-19T12:00:00-04:00', frequency: 'weekdays', location: 'in the hacker house', happeningSoon: 'false'},
      { title: 'Turf Build Party', link: 'https://app.gather.town/app/xAYeiPI2XDYhRM9t/urbit-hacker-house', startDate: '2023-06-23T12:00:00-04:00', endDate: '2023-06-23T14:00:00-04:00', frequency: '', location: 'in the hacker house', happeningSoon: 'false'},
      { title: 'Build Party', link: 'https://app.gather.town/app/xAYeiPI2XDYhRM9t/urbit-hacker-house', startDate: '2023-06-27T14:00:00-04:00', endDate: '2023-06-27T17:00:00-04:00', frequency: '', location: 'in the hacker house', happeningSoon: 'false'}
  ]

  const happeningSoonTuple = isHappeningSoon(events)

</script>

<div class="grid grid-cols-9 gap-8 mb-4">
  <div class="flex flex-col gap-4 col-span-12 md:col-span-6">
    <FeedPostForm on:post={handlePost} />
    <Feed {feed} />
  </div>
  <RightSidebar>
    <SidebarGroup>
      <div class="flex flex-col gap-4 mx-2 mb-1 overflow-hidden">
        <div class="text-xl font-bold">Find a ship</div>
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
    {#if happeningSoonTuple[0]}
      <SidebarGroup>
        <div class="text-xl font-bold mx-2">Upcoming Events</div>
        <div class="flex flex-col gap-4">
          {#each happeningSoonTuple[1] as { title, link, startDate, endDate, frequency, location, happeningSoon, formattedStart }}
            {#if happeningSoon}
              <button
                class="flex flex-col gap-2 rounded-md p-2 hover:bg-hover dark:hover:border-white hover:duration-500 text-left"
                on:click={() => window.open(`${link}`,'_blank')}
              >
                <div>{title}</div>
                <div
                  class="flex items-center w-full justify-between gap-2 text-xs text-grey"
                >
                  <div>Starts {formattedStart}</div>
                  <div class="flex items-center gap-1">
                    <div>{location}</div>
                    <div class="w-4"><UpRightArrowIcon /></div>
                  </div>
                </div>
              </button>
            {/if}
          {/each}
        </div>
      </SidebarGroup>
    {/if}
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
          <div class="flex flex-col gap-2">
            {#each recommendedApps as key}
              <ItemVerticalListPreview {key} small/>
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
