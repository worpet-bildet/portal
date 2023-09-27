<script lang="ts">
  import Router, { location, push } from 'svelte-spa-router';
  import { GoogleAnalytics, ga } from '@beyonk/svelte-google-analytics';
  import { state, setReferredTo } from '@root/state';
  import config from '@root/config';

  import {
    Feed,
    Group,
    App,
    Other,
    Explore,
    Api,
    Compose,
    Search,
  } from './pages';
  import { Curator, EditCurator } from './pages/Curator';
  import { Collection, EditCollection } from './pages/Collection';
  import {
    VerticalNavbar,
    HorizontalNavbar,
    MobileHeader,
    GlobalSearch,
  } from '@components';

  const routes = {
    '/': Feed,
    '/feed': Feed,
    '/explore': Explore,
    '/group/:host/:cord': Group,
    '/app/*': App,
    '/other/*': Other,
    '/retweet/*': Other,
    '/groups-chat-msg/*': Other,
    '/groups-heap-curio/*': Other,
    '/groups-diary-note/*': Other,
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

  state.subscribe((s) => {
    console.log({ state: s });
  });

  location.subscribe(() => {
    if (main) main.scrollTo(0, 0);
  });

  const urlParams = new URLSearchParams(window.location.search);
  const notificationPath = urlParams.get('grid-note');

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
    const [_, __, type] = parts.slice(0, 3);
    const key = `/${parts.slice(3).join('/')}`;
    setReferredTo({ type, key });
    push(`${key}`);
  }

  let isSearchGlassy = false;
  let isComposing = false;
  const handleRouteLoaded = ({ detail: { route } }) => {
    isSearchGlassy = route === '/:patp';
    isComposing = route === '/compose';
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
      class="lg:px-10 bg-white overflow-y-auto grid grid-cols-12 relative col-span-12 sm:col-span-11 lg:col-span-10"
      class:px-3={!isComposing}
    >
      {#if !isComposing}
        <div class="sm:hidden pt-4 col-span-12">
          <MobileHeader />
        </div>
        <div class="pt-4 col-span-12 md:col-span-7 md:pr-3">
          <GlobalSearch isGlassy={isSearchGlassy} />
        </div>
      {/if}
      <div class="col-span-12 min-h-screen" class:pb-8={!isComposing}>
        <Router {routes} on:routeLoaded={handleRouteLoaded} />
      </div>
      <div class="sm:hidden"><HorizontalNavbar bind:isComposing /></div>
    </div>
  </div>
</main>
