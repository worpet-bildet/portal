<script lang="ts">
  import { push, link, location } from 'svelte-spa-router';
  import { format } from 'timeago.js';
  import {
    state,
    toggleDarkmode,
    getNotifications,
    getItem,
    updateNotificationsLastChecked,
    toggleMuteNotifications,
    keyStrFromObj,
    setIsComposing,
  } from '@root/state';
  import { me } from '@root/api';
  import { formatPatp } from '@root/util';
  import { Sigil } from '@components';
  import {
    ActivityIcon,
    ExploreIcon,
    FeedIcon,
    FeedbackIcon,
    NavItem,
    PlusIcon,
    ProfileIcon,
    SettingsIcon,
    TipIcon,
  } from '@fragments';
  import logo from '@assets/logo.svg';

  export let isHome: boolean = false;

  const handleNewPostClick = () => {
    setIsComposing(true);
    // push('/compose');
  };
</script>

{#if !$state.isComposing}
  <div
    class="fixed left-0 h-24 bottom-0 flex w-full justify-between bg-white/80 backdrop-blur-xs"
  >
    <NavItem icon={FeedIcon} title={'Feed'} on:click={() => {}} />
    <!-- <NavItem
    icon={ExploreIcon}
    title={'Explore'}
    collapsed={navCollapsed}
    on:click={() => {}}
  /> -->
    <NavItem icon={ActivityIcon} title={'Activity'} on:click={() => {}} />
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
    class="fixed rounded-full bottom-28 right-4 h-20 w-20 bg-black text-white"
    on:click={handleNewPostClick}
  >
    <div class="flex w-full h-full items-center justify-center">
      <div class="w-8 h-8">
        <PlusIcon />
      </div>
    </div>
  </button>
{/if}
