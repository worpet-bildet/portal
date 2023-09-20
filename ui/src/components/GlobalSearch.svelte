<script lang="ts">
  import { Item, ItemKey } from '$types/portal/item';

  import { push } from 'svelte-spa-router';
  import { fade } from 'svelte/transition';

  import { me } from '@root/api';
  import {
    state,
    getItem,
    getCuratorAllCollectionItems,
    keyStrFromObj,
    items,
    pals,
    contacts,
    getCurator,
    getGlobalFeed,
  } from '@root/state';
  import { getMeta, formatPatp, getPossiblePatps } from '@root/util';

  import { Sigil } from '@components';
  import { PlaceholderIcon } from '@fragments';
  import ItemImage from '@root/fragments/ItemImage.svelte';

  let searchResults: {
    items: Item[];
    posts: Item[];
    ships: Partial<Item>[];
    pages: any[];
  } = {
    items: [],
    posts: [],
    ships: [],
    pages: [],
  };

  let all: Item[];
  let collectedItems: Item[];

  const setDefaultResults = () => {
    searchResults = {
      items: (getCuratorAllCollectionItems(me) || []).slice(0, 3).map(getItem),
      posts: (getGlobalFeed() || []).slice(0, 3).map(({ key }) => getItem(key)),
      ships: Object.keys(pals())
        .slice(0, 3)
        .map((patp) => getCurator(`~${patp}`)),
      pages: [
        { title: 'Feed', icon: PlaceholderIcon, action: () => push('/') },
        {
          title: 'Activity',
          icon: PlaceholderIcon,
          unreadCount: 4,
          action: () => push('/activity'),
        },
        {
          title: 'Explore',
          icon: PlaceholderIcon,
          action: () => push('/explore'),
        },
      ],
    };
  };

  state.subscribe((s) => {
    if (searchResults.items.length > 0) return;
    if (!s.isLoaded) return;
    all = Object.values(items());
    collectedItems = (getCuratorAllCollectionItems(me) || []).map(getItem);
    setDefaultResults();
  });

  const reset = () => {
    focused = false;
    selectedIndex = -1;
    searchString = '';
    setDefaultResults();
  };

  /**
   * This component handles globally searching Portal. It should sit standalone at
   * the top of each page, and it should also handle being invoked via cmd+k as a
   * modal.
   */

  // Fetch from the state everything which contains the search string, and order
  // them by the most recent first
  const lc = (s: string) => (s ? s.toLowerCase() : '');
  const contains = (s: string) => lc(s).includes(lc(searchString.trim()));
  const match = (i: Item) => {
    return (
      contains(i?.keyObj?.ship) ||
      contains(i?.keyObj?.cord) ||
      contains(i?.keyObj?.time) ||
      contains(i?.bespoke?.title) ||
      contains(i?.bespoke?.description) ||
      contains(i?.bespoke?.blurb) ||
      contains(i?.bespoke?.treaty?.title) ||
      contains(i?.bespoke?.treaty?.info)
    );
  };

  const updateResults = (_search) => {
    if (!_search) return setDefaultResults();
    searchResults = {
      items: collectedItems
        .filter((item) => {
          return (
            ['app', 'group', 'collection'].includes(item?.keyObj?.struc) &&
            match(item)
          );
        })
        .slice(0, 5),
      posts: all
        .filter((item) => {
          return item?.keyObj?.struc === 'other' && match(item);
        })
        .slice(0, 5),
      ships: getPossiblePatps(searchString, contacts())
        .map((patp) => getCurator(patp))
        .slice(0, 5),
      pages: searchResults.pages
        .filter((page) => {
          return contains(page.title);
        })
        .slice(0, 5),
    };
  };

  const numResults = () => {
    return (
      searchResults.items.length +
      searchResults.posts.length +
      searchResults.ships.length +
      searchResults.pages.length
    );
  };

  const handleKeydownGlobal = (e: KeyboardEvent) => {
    if (e.metaKey && e.key === 'k') {
      return searchInput.focus();
    }
  };

  const handleKeydownInput = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      return searchInput.blur();
    }
    if (e.key === 'ArrowDown') {
      return (selectedIndex = Math.min(selectedIndex + 1, numResults() - 1));
    }
    if (e.key === 'ArrowUp') {
      return (selectedIndex = Math.max(selectedIndex - 1, 0));
    }
    if (e.key === 'Enter') {
      if (selectedIndex !== -1) {
        buttons[selectedIndex].dispatchEvent(new Event('mousedown'));
      }
      return searchInput.blur();
    }
  };

  let searchString: string = '';
  let searchInput: HTMLInputElement;
  let focused: boolean = false;
  let selectedIndex: number = -1;
  let buttons: HTMLButtonElement[] = [];

  $: updateResults(searchString);
</script>

<svelte:window on:keydown={handleKeydownGlobal} />

{#if focused}
  <div
    class="absolute top-0 left-0 w-full h-full bg-white/30 dark:opacity-40 z-10 backdrop-blur-xs"
    in:fade
  />
{/if}
<div class="flex flex-col w-full gap-4 relative z-20">
  <div
    class="flex w-full justify-between rounded-lg bg-input border p-3"
    class:z-20={focused}
  >
    <div class="flex items-center gap-4 w-full">
      <PlaceholderIcon />
      <input
        on:focus={() => (focused = true)}
        on:blur={reset}
        bind:value={searchString}
        type="text"
        class="w-full bg-transparent outline-none mr-2"
        placeholder="Search Portal..."
        bind:this={searchInput}
        on:keydown|capture={handleKeydownInput}
      />
    </div>
    <div class="bg-indicator text-indicatortext text-xs px-2 py-1 rounded-md">
      ⌘K
    </div>
  </div>
  <div class="relative">
    {#if focused}
      <div
        class="flex flex-col border rounded-lg p-3 z-20 absolute bg-white w-full gap-3 drop-shadow-search"
      >
        <div class="flex flex-col gap-2">
          {#if searchResults.items.length > 0}
            <div class="text-light">Apps, Groups & Collections</div>
            {#each searchResults.items as item, i (keyStrFromObj(item.keyObj))}
              {@const { title, image, struc, color } = getMeta(item)}
              <button
                on:mousedown={() => push(keyStrFromObj(item.keyObj))}
                class="flex justify-between items-center px-2 py-1 rounded-md hover:bg-panel"
                class:bg-panel={selectedIndex === i}
                bind:this={buttons[i]}
              >
                <div class="flex items-center gap-4 w-full">
                  <div class="w-7 h-7 overflow-hidden rounded-md">
                    <ItemImage {image} {title} {color} />
                  </div>
                  <div class="text-left line-clamp-1 overflow-ellipsis">
                    {title}
                  </div>
                </div>
                <div
                  class="text-xs text-strucpilltext bg-strucpill rounded-full px-3 py-1"
                >
                  {struc.toUpperCase()}
                </div>
              </button>
            {/each}
          {/if}
        </div>

        <div class="flex flex-col gap-2">
          {#if searchResults.posts.length > 0}
            <div class="text-light">Recent posts</div>
            {#each searchResults.posts as item, _i (keyStrFromObj(item.keyObj))}
              {@const i = _i + searchResults.items.length}
              {@const { blurb, ship } = getMeta(item)}
              <button
                on:mousedown={() => push(keyStrFromObj(item.keyObj))}
                class="flex flex-row gap-2 text-start px-2 py-1 rounded-md hover:bg-panel line-clamp-1"
                class:bg-panel={selectedIndex === i}
                bind:this={buttons[i]}
              >
                <div class="font-bold whitespace-nowrap">
                  {formatPatp(ship)}:
                </div>
                <div class="text-left overflow-ellipsis line-clamp-1">
                  "{blurb.replace(/\n/g, ' ').trim()}"
                </div>
              </button>
            {/each}
          {/if}
        </div>

        <div class="flex flex-col gap-2">
          {#if searchResults.ships.length > 0}
            <div class="text-light">Ships</div>
            {#each searchResults.ships as item, _i (keyStrFromObj(item.keyObj))}
              {@const { nickname, ship } = getMeta(item)}
              {@const i =
                _i + searchResults.items.length + searchResults.posts.length}
              <button
                on:mousedown={() => push(`/${item.keyObj.ship}`)}
                class="flex flex-row gap-2 text-start px-2 py-1 rounded-md hover:bg-panel line-clamp-1"
                class:bg-panel={selectedIndex === i}
                bind:this={buttons[i]}
              >
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 overflow-hidden rounded-md">
                    <Sigil patp={ship} />
                  </div>
                  <div>
                    {nickname ? nickname : ship}
                  </div>
                </div>
              </button>
            {/each}
          {/if}
        </div>

        <div class="flex flex-col gap-2">
          {#if searchResults.pages.length > 0}
            <div class="text-light">Pages</div>
            {#each searchResults.pages as page, _i (page.title)}
              {@const i =
                _i +
                searchResults.items.length +
                searchResults.posts.length +
                searchResults.ships.length}
              <button
                on:mousedown={() => page.action()}
                class="flex justify-between items-center px-2 py-1 rounded-md hover:bg-panel"
                class:bg-panel={selectedIndex === i}
                bind:this={buttons[i]}
              >
                <div class="flex items-center gap-4">
                  <div class="w-7 h-full overflow-hidden rounded-sm">
                    <PlaceholderIcon />
                  </div>
                  <div>{page.title}</div>
                </div>
                {#if page.unreadCount}
                  <div
                    class="text-xs text-strucpilltext bg-strucpill rounded-full px-3 py-1"
                  >
                    {page.unreadCount}
                  </div>
                {/if}
              </button>
            {/each}
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>
