<script lang="ts">
  import logo from '@assets/logo.svg';
  import { Sigil } from '@components';
  import {
    FeedIcon,
    FeedbackIcon,
    MoonIcon,
    NavItem,
    PostIcon,
    SunIcon,
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
          icon={FeedIcon}
          title={'Feed'}
          collapsed={navCollapsed}
          active={$location === '/'}
          on:click={() => push('#/')}
        />
        <!-- <NavItem
          icon={ExploreIcon}
          title={'Explore'}
          collapsed={navCollapsed}
          on:click={() => {}}
        />
        -->
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
        <NavItem
          icon={FeedbackIcon}
          title={'Feedback'}
          collapsed={navCollapsed}
          on:click={() => window.open('/apps/talk/dm/~foddur-hodler')}
        />
      </div>
    </div>
    <div class="border dark:border-glass w-full my-2" />
    <div class="p-2">
      <button
        class="flex gap-3 items-center justify-center lg:justify-start py-2 px-3 rounded-lg w-full relative bg-black text-white dark:bg-white dark:text-black"
        on:click={() => {
          push('/');
        }}
      >
        <div class="w-5 h-5">
          <PostIcon />
        </div>
        <div class="hidden lg:block">Post</div>
      </button>
    </div>
  </div>
  <div class="p-2">
    <button class="p-2 w-10" on:click={toggleDarkmode}>
      {#if $state.darkmode}
        <SunIcon />
      {:else}
        <MoonIcon />
      {/if}
    </button>

    <a
      use:link
      href={`/${me}`}
      class="flex items-center justify-center md:justify-start border gap-3 bg-transparent lg:bg-white w-full py-2 lg:px-3 rounded-lg dark:bg-black dark:text-white dark:border-none"
    >
      <div class="w-6 h-6 rounded-sm overflow-hidden"><Sigil patp={me} /></div>
      <div class="hidden lg:block">{formatPatp(me)}</div>
    </a>
  </div>
</div>
