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

<div class="flex flex-col justify-between bg-panel h-full border-r-2 h-screen">
  <div>
    <div class="p-2">
      <a
        use:link
        href="#/"
        class="flex items-center justify-center lg:justify-start gap-3 md:p-2 mt-3 mb-3"
      >
        <img src={logo} class="w-10 h-10" alt="logo" />
        <div class="hidden lg:block text-l font-bold">Portal</div>
      </a>
      <div>
        <NavItem
          icon={FeedIcon}
          title={'Feed'}
          collapsed={navCollapsed}
          on:click={() => push('#/feed')}
        />
        <!-- <NavItem
          icon={ExploreIcon}
          title={'Explore'}
          collapsed={navCollapsed}
          on:click={() => {}}
        />
        -->
        <NavItem
          icon={ActivityIcon}
          title={'Activity'}
          collapsed={navCollapsed}
          on:click={() => push('#/activity')}
        />
        <!--
        <NavItem
          icon={TipIcon}
          title={'Tips'}
          unreadCount={2}
          collapsed={navCollapsed}
          on:click={() => {}}
        /> -->
        <NavItem
          icon={FeedbackIcon}
          title={'Feedback'}
          collapsed={navCollapsed}
          on:click={() => window.open('/apps/talk/dm/~foddur-hodler')}
        />
      </div>
    </div>
    <div class="border w-full my-2" />
  </div>
  <div class="p-2">
    <a
      use:link
      href={`/${me}`}
      class="flex items-center justify-center gap-3 bg-transparent lg:bg-white w-full py-2 lg:px-3 rounded-lg"
    >
      <div class="w-6 h-6 rounded-sm overflow-hidden"><Sigil patp={me} /></div>
      <div class="hidden lg:block">{formatPatp(me)}</div>
    </a>
  </div>
</div>
