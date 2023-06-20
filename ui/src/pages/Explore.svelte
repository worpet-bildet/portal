<script>
  import { me } from '@root/api';
  import {
    state,
    getCuratorAllCollectionItems,
    groupKeyToItemKey,
    profileKeyToItemKey,
    collectionKeyToItemKey,
    keyStrFromObj,
    getItem,
  } from '@root/state';
  import { getMeta } from '@root/util';
  import { ItemVerticalListPreview } from '@components';
  import {
    IconButton,
    SparklesIcon,
    AppIcon,
    GroupIcon,
    PersonIcon,
    CollectionIcon,
    SearchIcon,
  } from '@fragments';

  let items, activeItems, myItems, urlQuery, searchString, fullString;

  const createUrl = (toggleFilters) => {
    urlQuery = `?filters=`;
    for (const q of toggleFilters) {
      urlQuery += `${q},`;
    }

    // if (strFilter) {
    //   urlQuery += `strFilter`
    // }

    window.location.href = `${window.location.origin}${window.location.pathname}#/explore${urlQuery}`;
  }

  const refreshItems = () => {
    activeItems = items;
    if (filters.has('new')) {
      activeItems = [
        ...items.filter((k) => !myItems.includes(keyStrFromObj(k))),
      ];
    }
    if (filters.has('apps')) {
      activeItems = activeItems.filter((k) => k?.struc === 'app');
    }
    if (filters.has('groups')) {
      activeItems = activeItems.filter((k) => k?.struc === 'group');
    }
    if (filters.has('ships')) {
      activeItems = activeItems.filter((k) => k?.struc === 'ship');
    }
    if (filters.has('collections')) {
      activeItems = activeItems.filter((k) => k?.struc === 'collection');
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

    // console.log(_filters)
    // console.log("_filters")
    // // _filters = _filters + searchString
    console.log(searchString)
    console.log("searchString")
    console.log(_filters)
    console.log("_filters")

    createUrl(_filters)

    filters = _filters;
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

  const filterBySearchString = (str) => {
    fullString = fullString + str
    createUrl(filters + fullString )
    refreshItems();
    if (!activeItems || !str) return [];
    activeItems = [
      ...activeItems.filter((i) => {
        const { title, blurb, ship } = getMeta(getItem(keyStrFromObj(i)));
        if (
          (title && title.toLowerCase().indexOf(str.toLowerCase()) !== -1) ||
          (blurb && blurb.toLowerCase().indexOf(str.toLowerCase()) !== -1) ||
          (ship && ship.toLowerCase().indexOf(str.toLowerCase()) !== -1)
        ) {
          return true;
        }
        return false;
      }),
    ];
  };

  $: filterBySearchString(searchString);
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
        toggleFilter('apps');
      }}>Apps</IconButton
    >
    <IconButton
      icon={GroupIcon}
      active={filters.has('groups')}
      on:click={() => {
        toggleFilter('groups');
      }}>Groups</IconButton
    >
    <IconButton
      icon={PersonIcon}
      active={filters.has('ships')}
      on:click={() => {
        toggleFilter('ships');
      }}>People</IconButton
    >
    <IconButton
      icon={CollectionIcon}
      active={filters.has('collections')}
      on:click={() => {
        toggleFilter('collections');
      }}>Collections</IconButton
    >
  </div>
  <div class="flex gap-4">
    <input
      type="text"
      class="border-b focus:outline-none placeholder-grey"
      placeholder="try searching"
      bind:value={searchString}
    />
    <div class="w-5"><SearchIcon /></div>
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
