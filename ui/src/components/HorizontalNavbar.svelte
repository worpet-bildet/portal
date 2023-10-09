<script lang="ts">
  import { ActivityIcon, FeedIcon, NavItem, PlusIcon, ExploreIcon } from '@fragments';
  import { Sigil } from '@components';
  import { me } from '@root/api';
  import { setIsComposing, state, setIsSearching } from '@root/state';
  import { push } from 'svelte-spa-router';

  export let isHome: boolean = false;
  export let main: HTMLDivElement;

  const handleNewPostClick = () => {
    setIsComposing(true);
    // push('/compose');
  };
</script>

{#if !$state.isComposing}
  <div
    class="fixed left-0 h-20 bottom-0 flex w-full justify-between bg-white/80 backdrop-blur-xs"
  >
    <NavItem
      icon={FeedIcon}
      title={'Feed'}
      on:click={() => {
        if (isHome) main.scrollTo({ top: 0, behavior: 'smooth' });
        push('#/');
      }}
    />
    <NavItem
      icon={ExploreIcon}
      title={'Explore'}
      on:click={() => {setIsSearching(true)}}
    />
    <!-- <NavItem
      icon={ActivityIcon}
      title={'Activity'}
      on:click={() => push('#/activity')}
    /> -->
    <NavItem
      icon={Sigil}
      title={'Profile'}
      on:click={() => push(`#/${me}`)}
    />
    <!-- <NavItem
    icon={TipIcon}
    title={'Tips'}
    unreadCount={2}
    collapsed={navCollapsed}
    on:click={() => {}}
  /> -->
  </div>
{/if}
{#if !$state.isComposing && isHome}
  <button
    class="fixed rounded-full bottom-24 right-4 h-16 w-16 bg-black text-white"
    on:click={handleNewPostClick}
  >
    <div class="flex w-full h-full items-center justify-center">
      <div class="w-6 h-6">
        <PlusIcon />
      </div>
    </div>
  </button>
{/if}
