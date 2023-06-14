<script>
  import { onMount } from 'svelte';
  import { me } from '@root/api';
  import {
    state,
    getCuratorAllCollectionItems,
    groupKeyToItemKey,
    profileKeyToItemKey,
    collectionKeyToItemKey,
    keyStrFromObj,
  } from '@root/state';
  import { ItemVerticalListPreview } from '@components';
  import {
    IconButton,
    SparklesIcon,
    AppIcon,
    GroupIcon,
    PersonIcon,
    CollectionIcon,
  } from '@fragments';

  let items, activeItems, myItems, urlQuery;

  const refreshItems = () => {
    activeItems = items;
    if (filters.has('new')) {
      activeItems = [
        ...items.filter((k) => !myItems.includes(keyStrFromObj(k))),
      ];
    }
    if (filters.has('apps')) {
      activeItems = [...activeItems.filter((k) => k?.struc === 'app')];
    }
    if (filters.has('groups')) {
      activeItems = [...activeItems.filter((k) => k?.struc === 'group')];
    }
    if (filters.has('ships')) {
      activeItems = [...activeItems.filter((k) => k?.struc === 'ship')];
    }
    if (filters.has('collections')) {
      activeItems = [...activeItems.filter((k) => k?.struc === 'collection')];
    }
  };

  let filters = new Set();
  const toggleFilter = (filter) => {
    if (filters.has(filter)) {
      filters.delete(filter);
    } else {
      filters.add(filter);
    }

    urlQuery = `?filters=`;
    for (const q of filters) {
      urlQuery += `${q},`;
    }

    window.location.href = `${window.location.origin}${window.location.pathname}#/explore${urlQuery}`;

    refreshItems();
  };

  state.subscribe((s) => {
    if (!s.apps || !s.groups) return;
    items = getCuratorAllCollectionItems(me);

    myItems = [
      ...Object.keys(s.groups).map(groupKeyToItemKey),
      ...Object.entries(s.apps).map(
        ([cord, { ship }]) => `/app/${ship}/${cord}/`
      ),
      ...Object.keys(s.profiles).map(profileKeyToItemKey),
      ...Object.keys(
        Object.fromEntries(
          Object.entries(s).filter(([key]) => key.includes('/collection/'))
        )
      ).map(collectionKeyToItemKey),
    ];

    let url = window.location.href;
    if (url.includes('filters=')) {
      let f = url.substring(url.indexOf('filters=') + 8);
      f.split(',')
        .filter((f) => !!f)
        .forEach((filter) => toggleFilter(filter));
    }

    refreshItems();
  });
</script>

<div class="flex flex-col gap-4 mb-4">
  <div class="text-2xl font-bold">Everything you have ever seen on Portal</div>
  <p>
    Items you come across on your travels will accrue here, but it's not yet an
    exhaustive index of all the things on Portal.
  </p>
  <div class="flex gap-4">
    <IconButton
      icon={SparklesIcon}
      active={filters.has('new')}
      on:click={() => toggleFilter('new')}>New to me</IconButton
    >
    <IconButton
      icon={AppIcon}
      active={filters.has('apps')}
      on:click={() => {
        if (filters.has('groups')) toggleFilter('groups');
        if (filters.has('ships')) toggleFilter('ships');
        if (filters.has('collections')) toggleFilter('collections');
        toggleFilter('apps');
      }}>Apps</IconButton
    >
    <IconButton
      icon={GroupIcon}
      active={filters.has('groups')}
      on:click={() => {
        if (filters.has('apps')) toggleFilter('apps');
        if (filters.has('ships')) toggleFilter('ships');
        if (filters.has('collections')) toggleFilter('collections');
        toggleFilter('groups');
      }}>Groups</IconButton
    >
    <IconButton
      icon={PersonIcon}
      active={filters.has('ships')}
      on:click={() => {
        if (filters.has('apps')) toggleFilter('apps');
        if (filters.has('groups')) toggleFilter('groups');
        if (filters.has('collections')) toggleFilter('collections');
        toggleFilter('ships');
      }}>People</IconButton
    >
    <IconButton
      icon={CollectionIcon}
      active={filters.has('collections')}
      on:click={() => {
        if (filters.has('apps')) toggleFilter('apps');
        if (filters.has('groups')) toggleFilter('groups');
        if (filters.has('ships')) toggleFilter('ships');
        toggleFilter('collections');
      }}>Collections</IconButton
    >
  </div>
  {#if items}
    <div class="flex flex-col gap-4 bg-panels p-6 rounded-lg">
      {#if activeItems.length > 0}
        {#each activeItems as key}
          <ItemVerticalListPreview {key} />
        {/each}
      {:else}
        <div class="p-10">
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
  {/if}
</div>
