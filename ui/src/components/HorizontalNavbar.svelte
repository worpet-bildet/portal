<script lang="ts">
  import { ActivityIcon, FeedIcon, NavItem, PlusIcon } from '@fragments';
  import { setIsComposing, state } from '@root/state';
  import { push } from 'svelte-spa-router';

  export let isHome: boolean = false;

  const handleNewPostClick = () => {
    setIsComposing(true);
    // push('/compose');
  };
</script>

{#if !$state.isComposing}
  <div
    class="fixed left-0 h-20 bottom-0 flex w-full justify-between bg-white/80 backdrop-blur-xs"
  >
    <NavItem icon={FeedIcon} title={'Feed'} on:click={() => push('#/')} />
    <!-- <NavItem
    icon={ExploreIcon}
    title={'Explore'}
    collapsed={navCollapsed}
    on:click={() => {}}
  /> -->
    <NavItem
      icon={ActivityIcon}
      title={'Activity'}
      on:click={() => push('#/activity')}
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
    class="fixed rounded-full bottom-24 right-4 h-20 w-20 bg-black text-white"
    on:click={handleNewPostClick}
  >
    <div class="flex w-full h-full items-center justify-center">
      <div class="w-8 h-8">
        <PlusIcon />
      </div>
    </div>
  </button>
{/if}
