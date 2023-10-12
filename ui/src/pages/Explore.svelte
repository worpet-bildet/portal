<script lang="ts">
  import { ItemPreview, RadioStations, TopCreators } from '@components';
  import {
    AppsIcon,
    CollectionIcon,
    GroupsIcon,
    LoadingIcon,
    RightSidebar,
    SparkleIcon,
    Tabs,
  } from '@fragments';
  import { me } from '@root/api';
  import {
    collectionKeyToItemKey,
    getCollectedItemLeaderboard,
    getCuratorAllCollectionItems,
    getItem,
    groupKeyToItemKey,
    keyStrFromObj,
    state,
  } from '@root/state';
  import { uniqBy } from 'lodash';

  let items, activeItems, myItems, urlQuery;
  let activeTab = 'Spotlight';

  const refreshItems = () => {
    activeItems = items;
    switch (activeTab) {
      case 'Spotlight':
        activeItems = items;
        break;
      case 'Apps':
        activeItems = items.filter((k) => k?.struc === 'app');
        break;
      case 'Groups':
        activeItems = items.filter((k) => k?.struc === 'group');
        break;
      case 'Collections':
        activeItems = items.filter((k) => k?.struc === 'collection');
        break;
    }
  };

  let filters = new Set();
  const toggleFilter = (filter) => {
    let _filters = new Set();

    if (filters.has('new') && filter !== 'new') {
      _filters.add('new');
    }

    if (filters.has(filter)) {
      _filters.delete(filter);
    } else {
      _filters.add(filter);
    }

    urlQuery = `?filters=`;
    for (const q of _filters) {
      urlQuery += `${q},`;
    }

    window.location.href = `${window.location.origin}${window.location.pathname}#/explore${urlQuery}`;
    filters = _filters;
    refreshItems();
  };

  state.subscribe((s) => {
    items = uniqBy(
      getCollectedItemLeaderboard()
        .map(([keyStr]) => getItem(keyStr))
        .map((i) => i?.keyObj)
        .concat(getCuratorAllCollectionItems(me))
        .filter((i) => !!i),
      keyStrFromObj
    );

    myItems =
      new Set([
        ...Object.keys(s.groups || {}).map(groupKeyToItemKey),
        ...Object.entries(s.apps || {}).map(
          ([cord, { ship }]) => `/app/${ship}/${cord}/`
        ),
        ...Object.keys(
          Object.fromEntries(
            Object.entries(s).filter(([key]) => key.includes('/collection/'))
          )
        ).map(collectionKeyToItemKey),
      ]) || [];

    let url = window.location.href;
    if (url.includes('filters=')) {
      let f = url.substring(url.indexOf('filters=') + 8);
      f.split(',')
        .filter((f) => !!f)
        .forEach((filter) => toggleFilter(filter));
    }

    refreshItems();
  });

  $: if (activeTab) {
    refreshItems();
  }
</script>

<div class="grid grid-cols-12 gap-8 mb-4 h-full">
  <div class="flex flex-col gap-8 rounded-t-2xl col-span-12 md:col-span-7">
    <div class="flex flex-col gap-2">
      <div class="text-3xl font-bold">Explore</div>
      <div class="text-secondary">
        Discover Urbit apps, groups and collections in Portal
      </div>
    </div>

    <Tabs
      bold={false}
      bind:activeTab
      tabs={[
        { tab: 'Spotlight', icon: SparkleIcon },
        { tab: 'Apps', icon: AppsIcon },
        { tab: 'Groups', icon: GroupsIcon },
        { tab: 'Collections', icon: CollectionIcon },
      ]}
    />
    {#if items}
      <div class="flex flex-col gap-4 w-full rounded-lg">
        {#if activeItems.length > 0}
          {#each activeItems as key, i}
            <div class="flex gap-2">
              <div class="pt-1">{i + 1}</div>
              <ItemPreview {key} />
            </div>
          {/each}
        {:else}
          <div class="p-10 text-xs">
            <pre>
 _   _  ____ _______ _    _ _____ _   _  _____   _______ ____
| \ | |/ __ \__   __| |  | |_   _| \ | |/ ____| |__   __/ __ \
|  \| | |  | | | |  | |__| | | | |  \| | |  __     | | | |  | |
| . ` | |  | | | |  |  __  | | | | . ` | | |_ |    | | | |  | |
| |\  | |__| | | |  | |  | |_| |_| |\  | |__| |    | | | |__| |
|_| \_|\____/  |_|  |_|  |_|_____|_| \_|\_____|    |_|  \____/

   ____ ______ ______   _    _ ______ ____   ______
 / ____|  ____|  ____| | |  | |  ____|  __ \|  ____|
| (___ | |__  | |__    | |__| | |__  | |__) | |__
 \___ \|  __| |  __|   |  __  |  __| |  _  /|  __|
 ____) | |____| |____  | |  | | |____| | \ \| |____
|_____/|______|______| |_|  |_|______|_|  \_\______|
        </pre>
          </div>
        {/if}
      </div>
    {:else}
      <div class="flex justify-center">
        <LoadingIcon />
      </div>
    {/if}
  </div>
  <RightSidebar>
    <RadioStations />
    <TopCreators />
  </RightSidebar>
  <!-- <RightSidebar>
    {#if items.length > 0}
      <SidebarGroup>
        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-1 px-2">
            <div class="flex items-start justify-between text-xl font-bold">
              <div>Discover More Urbit Content</div>
            </div>
            <div class="text-flavour text-sm">Apps, Groups & Collections</div>
          </div>
          {#each items.slice(0, 3) as item}
            <ItemPreview key={item} />
          {/each}
        </div>
        <div class="flex flex-col gap-4" />
      </SidebarGroup>
    {/if}
  </RightSidebar> -->
</div>
