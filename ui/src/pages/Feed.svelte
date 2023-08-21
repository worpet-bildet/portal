<script>
  import { push } from 'svelte-spa-router';
  import config from '@root/config';
  import { api, me } from '@root/api';
  import {
    state,
    reScoreItems,
    getGlobalFeed,
    getCuratorFeed,
    keyStrToObj,
    getCollectedItemLeaderboard,
    getItem,
    getTips,
  } from '@root/state';
  import {
    Feed,
    ItemPreview,
    SidebarPal,
    FeedPostForm,
    Sigil,
  } from '@components';
  import {
    RightSidebar,
    SidebarGroup,
    SearchIcon,
    PersonIcon,
    UpRightArrowIcon,
    OpenAIIcon,
    LoadingIcon,
    VerticalExpandIcon,
    VerticalCollapseIcon,
  } from '@fragments';
  import { fromUrbitTime, isValidPatp, isHappeningSoon } from '@root/util';

  let sortedPals = [];
  let sortedRecommendations = [];
  let patpItemCount = {};
  let feed;

  const subToGlobalFeed = () => {
    return api.portal.do.subscribe({
      struc: 'feed',
      ship: config.indexer,
      cord: '',
      time: 'global',
    });
  };

  let positiveFeedPrompt, negativeFeedPrompt, loading, canResetFeed;
  const handlePromptFeed = async () => {
    loading = true;
    canResetFeed = true;
    await reScoreItems(positiveFeedPrompt, negativeFeedPrompt);
    loading = false;
  };

  const handleResetFeed = () => {
    feed = feed.sort((a, b) => fromUrbitTime(b.time) - fromUrbitTime(a.time));
    canResetFeed = false;
    positiveFeedPrompt = '';
    negativeFeedPrompt = '';
  };

  state.subscribe((s) => {
    let { pals } = s;
    if (!s.isLoaded) return;
    if (s.isLoaded && !getGlobalFeed()) {
      return subToGlobalFeed();
    }
    let mergedFeed = getGlobalFeed()
      .concat(getCuratorFeed(me))
      .concat(getTips());
    feed = mergedFeed
      .filter((a) => !!a)
      .filter((a, idx) => {
        return mergedFeed.findIndex((b) => b.time === a.time) === idx;
      });

    if (canResetFeed) {
      feed = feed.sort((a, b) => getItem(b.key)?.score - getItem(a.key)?.score);
    } else {
      feed = feed.sort((a, b) => fromUrbitTime(b.time) - fromUrbitTime(a.time));
    }
    // .sort((a, b) => getItem(b.key)?.score - getItem(a.key)?.score);
    // .sort((a, b) => fromUrbitTime(b.time) - fromUrbitTime(a.time));

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

  const handlePost = ({ detail: { content, uploadedImageUrl } }) => {
    api.portal.do.create({
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
    { struc: 'app', ship: '~nodmyn-dosrux', cord: 'radio', time: '' },
  ];

  const events = [
    {
      title: 'On-nomi happy hour',
      link: 'https://app.gather.town/app/xAYeiPI2XDYhRM9t/urbit-hacker-house',
      startDate: '2023-06-29T18:30:00-04:00',
      endDate: '2023-06-29T20:00:00-04:00',
      frequency: 'every other week',
      location: 'in the hacker house',
      happeningSoon: 'false',
    },
    {
      title: 'Turf Build Party',
      link: 'https://app.gather.town/app/xAYeiPI2XDYhRM9t/urbit-hacker-house',
      startDate: '2023-06-23T12:00:00-04:00',
      endDate: '2023-06-23T14:00:00-04:00',
      frequency: '',
      location: 'in the hacker house',
      happeningSoon: 'false',
    },
    {
      title: 'Build Party',
      link: 'https://app.gather.town/app/xAYeiPI2XDYhRM9t/urbit-hacker-house',
      startDate: '2023-06-27T14:00:00-04:00',
      endDate: '2023-06-27T17:00:00-04:00',
      frequency: '',
      location: 'in the hacker house',
      happeningSoon: 'false',
    },
  ];
  let showExpandedForm = false;

  const happeningSoonTuple = isHappeningSoon(events);
</script>

<div class="grid grid-cols-9 gap-8 mb-4">
  <div class="flex flex-col gap-8 rounded-t-2xl col-span-12 md:col-span-6">
    <div
      class="flex gap-2 border p-4 flex-col rounded-2xl col-span-12 md:col-span-6"
    >
      <div class="flex gap-2">
        <div
          class="border rounded-2xl bg-panels-hover flex w-full justify-between items-center"
        >
          <div class="flex items-center justify-center w-full">
            <div
              class="w-9 h-9 ml-3 p-1.5 rounded-xl bg-gradient-to-b from-ai-purple to-ai-blue"
            >
              <OpenAIIcon />
            </div>
            <input
              type="text"
              class="focus:outline-none p-3 placeholder-grey text-black text-lg dark:text-white flex-grow"
              placeholder="What do you want to see?"
              bind:value={positiveFeedPrompt}
              on:keydown={(e) => {
                if (e.key === 'Enter') {
                  handlePromptFeed();
                }
              }}
            />
          </div>
          <button
            class="bg-panels-hover rounded-md w-7 h-7 mr-2 flex items-center justify-center"
            on:click={() => (showExpandedForm = !showExpandedForm)}
          >
            {#if showExpandedForm}
              <VerticalCollapseIcon />
            {:else}
              <VerticalExpandIcon />
            {/if}
          </button>
        </div>
      </div>
      <div class="flex flex-col overflow-x-scroll scrollbar-hide">
        <div class="flex gap-4">
          <button
            class="rounded-lg bg-panels-hover text-grey hover:bg-blueish dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
            on:click={() => {
              positiveFeedPrompt = 'Jokes, funny, sarcasm, amusement';
              negativeFeedPrompt = 'seriousness, work, productivity';
              handlePromptFeed();
            }}>Shitposts</button
          >
          <button
            class="rounded-lg bg-panels-hover text-grey hover:bg-blueish dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
            on:click={() => {
              positiveFeedPrompt = 'poetry';
              negativeFeedPrompt = '';
              handlePromptFeed();
            }}>Poetry</button
          >
          <button
            class="rounded-lg bg-panels-hover text-grey hover:bg-blueish dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
            on:click={() => {
              positiveFeedPrompt = 'https://';
              negativeFeedPrompt = '';
              handlePromptFeed();
            }}>Links</button
          >
          <button
            class="rounded-lg bg-panels-hover text-grey hover:bg-blueish dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
            on:click={() => {
              positiveFeedPrompt = 'productivity, work, learning';
              negativeFeedPrompt = '';
              handlePromptFeed();
            }}>Productivity</button
          >
          <button
            class="rounded-lg bg-panels-hover text-grey hover:bg-blueish dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
            on:click={() => {
              positiveFeedPrompt = 'high wordCount';
              negativeFeedPrompt = '';
              handlePromptFeed();
            }}>Longform</button
          >
          <button
            class="rounded-lg bg-panels-hover hover:bg-blueish dark:border dark:hover:bg-transparent dark:hover:border-white text-grey p-2 px-4"
            on:click={() => {
              positiveFeedPrompt = 'retweet';
              negativeFeedPrompt = '';
              handlePromptFeed();
            }}>Recommendations</button
          >
          <button
            class="rounded-lg bg-panels-hover text-grey hover:bg-blueish dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
            on:click={() => {
              positiveFeedPrompt = 'tech, programming, hoon';
              negativeFeedPrompt = '';
              handlePromptFeed();
            }}>Tech</button
          >
          <button
            class="rounded-lg bg-panels-hover text-grey hover:bg-blueish dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
            on:click={() => {
              positiveFeedPrompt = 'politics';
              negativeFeedPrompt = '';
              handlePromptFeed();
            }}>Politics</button
          >
          <button
            class="rounded-lg bg-panels-hover text-grey hover:bg-blueish dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
            on:click={() => {
              positiveFeedPrompt = 'crypto';
              negativeFeedPrompt = '';
              handlePromptFeed();
            }}>Crypto</button
          >
        </div>
      </div>
      <div>
        {#if showExpandedForm}
          <div
            class="border rounded-2xl bg-panels-hover flex w-full justify-between items-center mt-4"
          >
            <div class="flex items-center justify-center w-full">
              <div
                class="w-9 h-9 ml-3 p-1.5 rounded-xl bg-gradient-to-b from-ai-purple to-ai-blue"
              >
                <OpenAIIcon />
              </div>
              <input
                type="text"
                class="focus:outline-none p-3 placeholder-grey text-black text-lg dark:text-white flex-grow"
                placeholder="Show me less ..."
                bind:value={negativeFeedPrompt}
                on:keydown={(e) => {
                  if (e.key === 'Enter') {
                    handlePromptFeed();
                  }
                }}
              />
            </div>
          </div>
          <div class="flex flex-col mt-4">
            <div class="flex gap-4">
              <button
                class="rounded-lg bg-panels-hover text-grey hover:bg-blueish dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
                on:click={() => {
                  positiveFeedPrompt = '';
                  negativeFeedPrompt = 'abortion, racism, sexism, classism';
                  handlePromptFeed();
                }}>Culture wars</button
              >
              <button
                class="rounded-lg bg-panels-hover text-grey hover:bg-blueish dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
                on:click={() => {
                  positiveFeedPrompt = '';
                  negativeFeedPrompt = 'Jokes, funny, sarcasm, amusement';
                  handlePromptFeed();
                }}>Shitposts</button
              >
              <button
                class="rounded-lg bg-panels-hover text-grey hover:bg-blueish dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
                on:click={() => {
                  positiveFeedPrompt = '';
                  negativeFeedPrompt = 'politics';
                  handlePromptFeed();
                }}>Politics</button
              >
              <button
                class="rounded-lg bg-panels-hover text-grey hover:bg-blueish dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
                on:click={() => {
                  positiveFeedPrompt = '';
                  negativeFeedPrompt = 'crypto';
                  handlePromptFeed();
                }}>Crypto</button
              >
            </div>
          </div>
        {/if}
      </div>
      {#if canResetFeed}
        <div class="flex justify-end">
          <button class="underline" on:click={handleResetFeed}>Reset</button>
        </div>
      {/if}
    </div>
    <div>
      <FeedPostForm on:post={handlePost} />
      {#if loading}
        <div class="flex justify-center items-center py-20">
          <LoadingIcon />
        </div>
      {:else}
        <Feed {feed} />
      {/if}
    </div>
  </div>
  <RightSidebar>
    <SidebarGroup>
      <div class="flex flex-col gap-4 mx-2 mb-2 overflow-hidden">
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
                class="flex flex-col gap-2 rounded-md p-2 border border-transparent dark:hover:border-white dark:hover:bg-transparent hover:bg-panels-hover hover:duration-500 text-left"
                on:click={() => window.open(`${link}`, '_blank')}
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
          <ItemPreview key={keyStrToObj(recommendation)} small />
        {/each}
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
