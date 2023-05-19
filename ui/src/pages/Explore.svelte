<script>
  import { me } from '@root/api';
  import {
    state,
    getCuratorAllCollectionItems,
    groupKeyToItemKey,
    keyStrFromObj,
  } from '@root/state';
  import { ItemVerticalListPreview } from '@components';
  import { IconButton, SparklesIcon, AppIcon, GroupIcon } from '@fragments';

  let items, activeItems, myItems;

  const refreshItems = () => {
    activeItems = items;
    if (filters.includes('new')) {
      activeItems = [
        ...items.filter((k) => !myItems.includes(keyStrFromObj(k))),
      ];
    }
    if (filters.includes('apps')) {
      activeItems = [...activeItems.filter((k) => k?.struc === 'app')];
    }
    if (filters.includes('groups')) {
      activeItems = [...activeItems.filter((k) => k?.struc === 'group')];
    }
  };

  let filters = [];
  const toggleFilter = (filter) => {
    if (filters.includes(filter)) {
      filters = filters.filter((f) => f !== filter);
    } else {
      filters = [...filters, filter];
    }
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
    ];

    refreshItems();
  });
</script>

<div class="flex flex-col gap-4">
  <div class="text-2xl font-bold">Everything you have ever seen on Portal</div>
  <p>
    Items you come across on your travels will accrue here, but it's not yet an
    exhaustive index of all the things on Portal.
  </p>
  <div class="flex gap-4">
    <IconButton
      icon={SparklesIcon}
      active={filters.includes('new')}
      on:click={() => toggleFilter('new')}>New to me</IconButton
    >
    <IconButton
      icon={AppIcon}
      active={filters.includes('apps')}
      on:click={() => {
        if (filters.includes('groups')) toggleFilter('groups');
        toggleFilter('apps');
      }}>Apps</IconButton
    >
    <IconButton
      icon={GroupIcon}
      active={filters.includes('groups')}
      on:click={() => {
        if (filters.includes('apps')) toggleFilter('apps');
        toggleFilter('groups');
      }}>Groups</IconButton
    >
  </div>
  {#if items}
    <div class="flex flex-col gap-4">
      {#if activeItems.length > 0}
        {#each activeItems as key}
          <ItemVerticalListPreview {key} />
        {/each}
      {:else}
        <div class="border shadow p-10">
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
