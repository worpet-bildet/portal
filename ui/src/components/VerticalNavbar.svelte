<script lang="ts">
  import logo from '@assets/logo.svg';
  import { Sigil } from '@components';
  import {
    ChatIcon,
    ExploreIcon,
    HomeIcon,
    NavItem,
    PostIcon,
    ShadowIcon,
  } from '@fragments';
  import { me } from '@root/api';
  import { state, toggleDarkmode } from '@root/state';
  import { formatPatp } from '@root/util';
  import { link, location, push } from 'svelte-spa-router';

  export let navCollapsed: boolean = false;
</script>

<div
  class="flex flex-col justify-between bg-panel dark:bg-black h-full border-r-2 dark:border-glass h-screen"
>
  <div>
    <div class="p-2">
      <a
        use:link
        href="#/"
        class="flex items-center justify-center lg:justify-start gap-3 md:p-2 mt-3 mb-3"
      >
        <img src={logo} class="w-10 h-10" alt="logo" />
        <div
          class="hidden lg:block text-2xl tracking-widest font-sans text-secondary dark:text-white"
        >
          PORTAL
        </div>
      </a>
      <div>
        <NavItem
          icon={HomeIcon}
          title={'Feed'}
          collapsed={navCollapsed}
          active={$location === '/'}
          on:click={() => push('#/')}
        />
        <NavItem
          icon={ShadowIcon}
          title={$state.darkmode ? 'Light Mode' : 'Dark Mode'}
          collapsed={navCollapsed}
          newFeature
          on:click={toggleDarkmode}
        />
        <NavItem
          icon={ExploreIcon}
          title={'Explore'}
          collapsed={navCollapsed}
          on:click={() => push('#/explore')}
        />
        <NavItem
          icon={ChatIcon}
          title={'Feedback'}
          collapsed={navCollapsed}
          on:click={() => window.open('/apps/talk/dm/~foddur-hodler')}
        />
        <NavItem
          icon={PostIcon}
          title={'Post'}
          collapsed={navCollapsed}
          prominent
          on:click={() => {
            push('/');
          }}
        />
        <!-- <NavItem
          icon={ActivityIcon}
          title={'Activity'}
          collapsed={navCollapsed}
          newFeature
          active={$location === '/activity'}
          on:click={() => push('#/activity')}
        /> -->
        <!--
        <NavItem
          icon={TipIcon}
          title={'Tips'}
          unreadCount={2}
          collapsed={navCollapsed}
          on:click={() => {}}
        /> -->
      </div>
    </div>
  </div>
  <div class="p-2">
    <a
      use:link
      href={`/${me}`}
      class="flex items-center justify-center md:justify-start border gap-3 bg-transparent lg:bg-white w-full py-2 lg:px-3 rounded-lg dark:bg-black dark:text-white dark:border-grey dark:hover:bg-blackhover"
    >
      <div class="w-6 h-6 rounded-sm overflow-hidden"><Sigil patp={me} /></div>
      <div class="hidden lg:block">{formatPatp(me)}</div>
    </a>
  </div>
</div>
