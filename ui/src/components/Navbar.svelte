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
  import { NavItem, PlaceholderIcon } from '@fragments';
  import logo from '@assets/logo.svg';

  export let navCollapsed: boolean = false;
</script>

<div class="flex flex-col justify-between bg-panel h-full border-r-2 h-screen">
  <div>
    <div class="p-2">
      <a use:link href="#/" class="flex items-center gap-3 p-2 mt-3 mb-5">
        <img src={logo} class="w-10 h-10" alt="logo" />
        <div class="text-l font-bold">Portal</div>
      </a>
      <div>
        <NavItem
          icon={PlaceholderIcon}
          title={'Feed'}
          collapsed={navCollapsed}
          on:click={() => {}}
        />
        <NavItem
          icon={PlaceholderIcon}
          title={'Explore'}
          collapsed={navCollapsed}
          on:click={() => {}}
        />
        <NavItem
          icon={PlaceholderIcon}
          title={'Activity'}
          unreadCount={4}
          collapsed={navCollapsed}
          on:click={() => {}}
        />
        <NavItem
          icon={PlaceholderIcon}
          title={'Tips'}
          unreadCount={2}
          collapsed={navCollapsed}
          on:click={() => {}}
        />
        <NavItem
          icon={PlaceholderIcon}
          title={'Feedback'}
          collapsed={navCollapsed}
          on:click={() => {}}
        />
      </div>
    </div>
    <div class="border w-full my-2" />
    <div class="p-2">
      <NavItem
        icon={PlaceholderIcon}
        title={'Apps'}
        collapsed={navCollapsed}
        on:click={() => {}}
      />
      <NavItem
        icon={PlaceholderIcon}
        title={'Groups'}
        collapsed={navCollapsed}
        on:click={() => {}}
      />
      <NavItem
        icon={PlaceholderIcon}
        title={'Collections'}
        collapsed={navCollapsed}
        on:click={() => {}}
      />
    </div>
  </div>
  <div class="p-2">
    <a
      use:link
      href={`/${me}`}
      class="flex items-center gap-3 bg-white w-full py-2 px-3 rounded-lg"
    >
      <div class="w-6 h-6 rounded-sm overflow-hidden"><Sigil patp={me} /></div>
      <div class="text-sm">{formatPatp(me)}</div>
    </a>
  </div>
</div>
