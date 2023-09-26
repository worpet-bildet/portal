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
    ProfileIcon,
    SettingsIcon,
    TipIcon,
  } from '@fragments';
  import logo from '@assets/logo.svg';

  export let navCollapsed: boolean = false;
</script>

<div
  class="fixed left-0 h-24 bottom-0 flex w-full justify-between bg-white/80 backdrop-blur-xs"
>
  <NavItem
    icon={FeedIcon}
    title={'Feed'}
    collapsed={navCollapsed}
    on:click={() => {}}
  />
  <NavItem
    icon={ExploreIcon}
    title={'Explore'}
    collapsed={navCollapsed}
    on:click={() => {}}
  />
  <NavItem
    icon={ActivityIcon}
    title={'Activity'}
    unreadCount={4}
    collapsed={navCollapsed}
    on:click={() => {}}
  />
  <NavItem
    icon={TipIcon}
    title={'Tips'}
    unreadCount={2}
    collapsed={navCollapsed}
    on:click={() => {}}
  />
</div>
