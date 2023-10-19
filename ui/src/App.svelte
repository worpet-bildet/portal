<script lang="ts">
  import { GoogleAnalytics } from '@beyonk/svelte-google-analytics';
  import config from '@root/config';
  import { state } from '@root/state';
  import Router, { location, push } from 'svelte-spa-router';

  import {
    GlobalSearch,
    HorizontalNavbar,
    MobileHeader,
    VerticalNavbar,
  } from '@components';
  import { Modal } from '@fragments';
  import { slide } from 'svelte/transition';
  import {
    Activity,
    Api,
    App,
    Compose,
    Explore,
    Feed,
    Group,
    Other,
    Search,
  } from './pages';
  import { Collection, EditCollection } from './pages/Collection';
  import { Curator, EditCurator } from './pages/Curator';

  const routes = {
    '/': Feed,
    '/feed': Feed,
    '/activity': Activity,
    '/explore': Explore,
    '/group/:host/:cord': Group,
    '/app/*': App,
    '/other/*': Other,
    '/retweet/*': Other,
    '/groups-chat-msg/*': Other,
    '/groups-heap-curio/*': Other,
    '/groups-diary-note/*': Other,
    '/tip/*': Other,
    '/collection/*': Collection,
    '/collection-edit/*': EditCollection,
    '/compose': Compose,
    '/search': Search,
    '/:patp': Curator,
    '/:patp/edit': EditCurator,
  };

  let main: HTMLDivElement;

  console.log('ENV', config.env);
  if (config.env === 'development') {
    routes['/dev/api'] = Api;
  }

  let isComposing: boolean = false;
  let isSearching: boolean = false;
  let isOnboarding: boolean = false;
  state.subscribe((s) => {
    console.log({ state: s });
    ({ isSearching, isComposing, isOnboarding } = s);
  });

  location.subscribe(() => {
    if (main) main.scrollTo(0, 0);
  });

  const urlParams = new URLSearchParams(window.location.search);
  const notificationPath = urlParams.get('landscape-note');

  /**
   * The schema is
   * /portal/reply/op-key
   * /portal/tip/key
   * /portal/mention/post-key
   * /portal/review/app-key
   *
   * */
  if (notificationPath) {
    window.history.replaceState({}, document.title, '/apps/portal/#/');
    const parts = notificationPath.split('/');
    const key = `/${parts.slice(3).join('/')}`;
    push(`${key}`);
  }

  let isSearchGlassy: boolean = false;
  let isHome: boolean = false;
  const handleRouteLoaded = ({ detail: { route } }) => {
    isSearchGlassy =
      route === '/:patp' ||
      route === '/group/:host/:cord' ||
      route === '/app/*';
    // isComposing = route === '/compose';
    // isSearching = route === '/search';
    isHome = route === '/';

    if (isHome) {
      document.getElementById($state.lastViewedPost)?.scrollIntoView();
    }
  };

  const handleOnboard = () => {
    window.open('https://tlon.network/lure/~worpet-bildet/portal', '_blank');
  };
</script>

<main class:dark={$state.darkmode}>
  <div class="grid grid-cols-12 dark:text-white h-screen overflow-hidden">
    <GoogleAnalytics properties={[config.googleAnalyticsId]} />
    <div class="hidden sm:block sm:col-span-1 lg:col-span-2">
      <VerticalNavbar />
    </div>
    <div
      bind:this={main}
      id="main"
      class="relative lg:px-10 sm:px-3 bg-white dark:bg-black grid grid-cols-12 col-span-12 sm:col-span-11 lg:col-span-10"
      class:px-3={!isComposing && !isSearching}
      class:overflow-hidden={isSearching}
      class:overflow-y-auto={!isSearching}
    >
      {#if !isComposing}
        {#if !isSearching}
          <div
            class="sm:hidden pt-4 col-span-12"
            transition:slide={{ duration: isComposing ? 0 : 150 }}
          >
            <MobileHeader />
          </div>
        {/if}
        <div
          class="pt-4 col-span-12 md:col-span-7 md:pr-3 {isSearching
            ? ''
            : 'hidden sm:block'}"
        >
          <GlobalSearch isGlassy={isSearchGlassy} {isSearching} />
        </div>
      {/if}
      <div
        class="col-span-12 min-h-screen h-full sm:block"
        class:mb-24={!isComposing && !isSearching}
        class:pb-8={!isComposing}
        class:mb-0={isSearching || isComposing}
        class:hidden={isSearching}
      >
        <Router {routes} on:routeLoaded={handleRouteLoaded} />
      </div>
      <div class="sm:hidden" class:hidden={isSearching}>
        <HorizontalNavbar {isHome} {main} />
      </div>
    </div>
  </div>
  <Modal open={isOnboarding}>
    <div class="flex flex-col gap-4 p-4">
      <div class="text-xl">Join Portal!</div>
      <div>
        Portal is a vibrant community. In order to participate, you require an
        Urbit. They're free, and you can get one here:
      </div>
      <div class="flex justify-center">
        <button
          class="px-3 py-2 rounded-lg bg-black text-white dark:bg-white text-black font-bold border dark:border-glass w-fit"
          on:click={handleOnboard}
        >
          Get your Urbit!
        </button>
      </div>
    </div>
  </Modal>
</main>
