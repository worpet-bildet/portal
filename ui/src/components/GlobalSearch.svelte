<script lang="ts">
  import { Item } from '$types/portal/item';

  import { push } from 'svelte-spa-router';
  import { fade, slide } from 'svelte/transition';

  import { me } from '@root/api';
  import {
    contacts,
    getCurator,
    getCuratorAllCollectionItems,
    getGlobalFeed,
    getItem,
    items,
    keyStrFromObj,
    pals,
    setIsSearching,
    state,
  } from '@root/state';
  import {
    contains,
    formatPatp,
    getMeta,
    getPossiblePatps,
    matchItem,
  } from '@root/util';

  import { Sigil } from '@components';
  import { HomeIcon, SearchIcon } from '@fragments';
  import ItemImage from '@root/fragments/ItemImage.svelte';

  export let isGlassy: boolean = false;
  export let isSearching: boolean = false;

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
  let numResults: number = 0;

  const setDefaultResults = () => {
    searchResults = {
      items: (getCuratorAllCollectionItems(me) || []).slice(0, 3).map(getItem),
      posts: (getGlobalFeed() || []).slice(0, 3).map(({ key }) => getItem(key)),
      ships: Object.keys(pals())
        .slice(0, 3)
        .map((patp) => getCurator(`~${patp}`)),
      pages: [{ title: 'Feed', icon: HomeIcon, action: () => push('/') }],
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
    setIsSearching(false);
    selectedIndex = -1;
    searchString = '';
    setDefaultResults();
  };

  /**
   * This component handles globally searching Portal. It should sit standalone at
   * the top of each page, and it should also handle being invoked via cmd+k as a
   * modal.
   */

  const updateResults = (_search) => {
    if (!_search) return setDefaultResults();
    searchResults = {
      items: collectedItems
        .filter((item) => {
          return (
            ['app', 'group', 'collection'].includes(item?.keyObj?.struc) &&
            matchItem(item, searchString)
          );
        })
        .slice(0, 5),
      posts: all
        .filter((item) => {
          return (
            item?.keyObj?.struc === 'other' && matchItem(item, searchString)
          );
        })
        .slice(0, 5),
      ships: getPossiblePatps(searchString, contacts())
        .map((patp) => getCurator(patp))
        .slice(0, 5),
      pages: searchResults.pages
        .filter((page) => {
          return contains(page.title, searchString);
        })
        .slice(0, 5),
    };
    searchResults = searchResults;
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
      return (selectedIndex = Math.min(selectedIndex + 1, numResults - 1));
    }
    if (e.key === 'ArrowUp') {
      return (selectedIndex = Math.max(selectedIndex - 1, 0));
    }
    if (e.key === 'Enter') {
      if (selectedIndex !== -1) {
        buttons[selectedIndex].dispatchEvent(new Event('mousedown'));
      } else {
        return;
      }
      return searchInput.blur();
    }
  };

  let searchString: string = '';
  let searchInput: HTMLInputElement;
  let selectedIndex: number = -1;
  let buttons: HTMLButtonElement[] = [];

  $: updateResults(searchString);
  $: numResults =
    searchResults.items.length +
    searchResults.posts.length +
    searchResults.ships.length +
    searchResults.pages.length;

  // feels dumb
  $: glass = isGlassy;
  $: if (isGlassy) {
    searchInput.onfocus = () => (glass = false);
    searchInput.onblur = () => (glass = true);
  } else if (searchInput) {
    searchInput.onfocus = () => {};
    searchInput.onblur = () => {};
  }
</script>

<svelte:window on:keydown={handleKeydownGlobal} />

{#if isSearching}
  <div
    class="hidden sm:block sm:absolute top-0 left-0 w-full h-full bg-white/30 z-10 backdrop-blur-xs"
    in:fade
  />
{/if}
<div class="flex flex-col w-full relative z-20">
  <div class="flex flex-row items-center mb-4 sm:px-0" class:px-3={isSearching}>
    <div
      transition:slide={{ duration: $state.isComposing ? 0 : 150 }}
      class="flex bg-input dark:bg-black dark:border-glass w-full justify-between rounded-lg border p-3"
      class:z-20={isSearching}
      class:sm:bg-input={!glass}
      class:sm:bg-glass={glass}
      class:sm:backdrop-blur-md={glass}
      class:border-glass={glass}
    >
      <div
        class="flex items-center gap-4 w-full"
        class:sm:text-glasstext={glass}
      >
        <div class="w-6 h-6 flex items-center">
          <SearchIcon />
        </div>
        <input
          on:focus={() => setIsSearching(true)}
          on:blur={reset}
          bind:value={searchString}
          type="text"
          class="w-full bg-transparent outline-none placeholder-secondary mr-2"
          class:placeholder:sm:text-glasstext={glass}
          placeholder="Search Portal..."
          bind:this={searchInput}
          on:keydown|capture={handleKeydownInput}
        />
      </div>
      <div
        class="hidden sm:block text-xs px-2 py-1 rounded-md text-secondary dark:bg-glass dark:text-white"
        class:bg-panelhover={!glass}
        class:text-panelicon={!glass}
        class:sm:bg-glass={glass}
        class:sm:text-glasstext={glass}
      >
        ⌘K
      </div>
    </div>
    {#if isSearching}
      <div class="sm:hidden p-1">
        <button
          class="sm:hidden text-tertiary"
          on:click={() => {
            searchInput.blur();
            setIsSearching(false);
          }}
          transition:slide={{ axis: 'x', duration: 200 }}>Cancel</button
        >
      </div>
    {/if}
  </div>
  {#if isSearching}
    <div class="relative">
      <div
        class="flex flex-col border dark:border-glass rounded-lg p-3 z-20 absolute bg-white dark:bg-black w-full gap-3 drop-shadow-search"
      >
        {#if numResults === 0}
          <div
            class="flex items-center justify-center h-full w-full text-black py-5"
          >
            No results found
          </div>
        {/if}
        {#if searchResults.items.length > 0}
          <div class="flex flex-col gap-2">
            <div class="text-light">Apps, Groups & Collections</div>
            {#each searchResults.items as item, i (keyStrFromObj(item.keyObj))}
              {@const { title, image, displayStruc, color } = getMeta(item)}
              <button
                on:mousedown={() => {
                  push(keyStrFromObj(item.keyObj));
                  setIsSearching(false);
                }}
                class="flex justify-between items-center px-2 py-1 rounded-md hover:bg-panel dark:hover:bg-darkpanel"
                class:bg-panel={selectedIndex === i}
                class:dark:bg-darkpanel={selectedIndex === i}
                bind:this={buttons[i]}
              >
                <div class="flex items-center gap-4 w-full">
                  <div class="w-7 h-7 overflow-hidden rounded-md">
                    <ItemImage {image} {title} {color} />
                  </div>
                  <div
                    class="text-left line-clamp-1 overflow-ellipsis break-all"
                  >
                    {title}
                  </div>
                </div>
                <div
                  class="text-xs text-strucpilltext bg-strucpill dark:bg-transparent rounded-full px-3 py-1"
                >
                  {displayStruc.toUpperCase()}
                </div>
              </button>
            {/each}
          </div>
        {/if}

        {#if searchResults.posts.length > 0}
          <div class="flex flex-col gap-2">
            <div class="text-light">Recent posts</div>
            {#each searchResults.posts as item, _i (keyStrFromObj(item.keyObj))}
              {@const i = _i + searchResults.items.length}
              {@const { blurb, ship } = getMeta(item)}
              <button
                on:mousedown={() => {
                  push(keyStrFromObj(item.keyObj));
                  setIsSearching(false);
                }}
                class="flex flex-row gap-2 text-start px-2 py-1 rounded-md hover:bg-panel dark:hover:bg-darkpanel line-clamp-1"
                class:bg-panel={selectedIndex === i}
                class:dark:bg-darkpanel={selectedIndex === i}
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
          </div>
        {/if}

        {#if searchResults.ships.length > 0}
          <div class="flex flex-col gap-2">
            <div class="text-light">Ships</div>
            {#each searchResults.ships as item, _i (keyStrFromObj(item.keyObj))}
              {@const { nickname, ship } = getMeta(item)}
              {@const i =
                _i + searchResults.items.length + searchResults.posts.length}
              <button
                on:mousedown={() => {
                  push(`/${item.keyObj.ship}`);
                  setIsSearching(false);
                }}
                class="flex flex-row gap-2 text-start px-2 py-1 rounded-md hover:bg-panel dark:hover:bg-darkpanel line-clamp-1"
                class:bg-panel={selectedIndex === i}
                class:dark:bg-darkpanel={selectedIndex === i}
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
          </div>
        {/if}

        {#if searchResults.pages.length > 0}
          <div class="flex flex-col gap-2">
            <div class="text-light">Pages</div>
            {#each searchResults.pages as page, _i (page.title)}
              {@const i =
                _i +
                searchResults.items.length +
                searchResults.posts.length +
                searchResults.ships.length}
              <button
                on:mousedown={() => {
                  page.action();
                  setIsSearching(false);
                }}
                class="flex justify-between items-center px-2 py-1 rounded-md hover:bg-panel dark:hover:bg-darkpanel"
                class:bg-panel={selectedIndex === i}
                class:dark:bg-darkpanel={selectedIndex === i}
                bind:this={buttons[i]}
              >
                <div class="flex items-center gap-4">
                  <div class="w-7 h-full overflow-hidden rounded-sm">
                    <svelte:component this={page.icon} />
                  </div>
                  <div>{page.title}</div>
                </div>
                {#if page.unreadCount}
                  <div
                    class="text-xs text-strucpilltext bg-strucpill dark:bg-transparent rounded-full px-3 py-1"
                  >
                    {page.unreadCount}
                  </div>
                {/if}
              </button>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>
