<script lang="ts">
  import logo from '@assets/logo.svg';
  import { Sigil } from '@components';
  import {
    ActivityIcon,
    FeedIcon,
    FeedbackIcon,
    NavItem,
    PostIcon,
  } from '@fragments';
  import { me } from '@root/api';
  import { formatPatp } from '@root/util';
  import { link, location, push } from 'svelte-spa-router';

  export let navCollapsed: boolean = false;
</script>

<div class="flex flex-col justify-between bg-panel h-full border-r-2 h-screen">
  <div>
    <div class="p-2">
      <a
        use:link
        href="#/"
        class="flex items-center justify-center lg:justify-start gap-1 md:p-2 mt-3 mb-3"
      >
        <img src=https://nyc3.digitaloceanspaces.com/toptyr-bilder/2023.10.04..22.20.48-Frame%20137.png class="w-10 h-10 mr-3" alt="logo" />
        <div class="hidden lg:block text-2xl tracking-widest font-sans text-secondary mr-3">PORTAL</div>
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
        <NavItem
          icon={ActivityIcon}
          title={'Activity'}
          collapsed={navCollapsed}
          newFeature
          active={$location === '/activity'}
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
    <div class="p-2">
      <button
        class="flex gap-3 items-center justify-center lg:justify-start py-2 px-3 rounded-lg w-full relative bg-black text-white"
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
    <a
      use:link
      href={`/${me}`}
      class="flex items-center justify-center md:justify-start border gap-3 bg-transparent lg:bg-white w-full py-2 lg:px-3 rounded-lg"
    >
      <div class="w-6 h-6 rounded-sm overflow-hidden"><Sigil patp={me} /></div>
      <div class="hidden lg:block">{formatPatp(me)}</div>
    </a>
  </div>
</div>
