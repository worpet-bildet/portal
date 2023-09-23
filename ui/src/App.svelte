<script lang="ts">
  import Router, { location, push } from 'svelte-spa-router';
  import { GoogleAnalytics, ga } from '@beyonk/svelte-google-analytics';
  import { state, setReferredTo } from '@root/state';
  import config from '@root/config';

  import { Feed, Group, App, Other, Explore, Api } from './pages';
  import { Curator, EditCurator } from './pages/Curator';
  import { Collection, EditCollection } from './pages/Collection';
  import { Navbar, GlobalSearch } from '@components';

  const routes = {
    '/': Feed,
    '/feed': Feed,
    '/explore': Explore,
    '/group/:host/:cord': Group,
    '/app/*': App,
    '/other/*': Other,
    '/retweet/*': Other,
    '/collection/*': Collection,
    '/collection-edit/*': EditCollection,
    '/:patp': Curator,
    '/:patp/edit': EditCurator,
  };

  let navCollapsed: boolean = false;
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
  const handleRouteLoaded = ({ detail: { route } }) => {
    isSearchGlassy = route === '/:patp';
  };
</script>

<main class:dark={$state.darkmode}>
  <div class="grid grid-cols-12 dark:text-white h-screen">
    <GoogleAnalytics properties={[config.googleAnalyticsId]} />
    <div class:col-span-2={!navCollapsed} class:col-span-1={navCollapsed}>
      <Navbar bind:navCollapsed />
    </div>
    <div
      bind:this={main}
      id="main"
      class="px-10 bg-white overflow-y-auto grid grid-cols-12 relative"
      class:col-span-10={!navCollapsed}
      class:col-span-11={navCollapsed}
    >
      <div class="pt-4 col-span-12 grid grid-cols-12">
        <div class="col-span-7 pr-3">
          <GlobalSearch isGlassy={isSearchGlassy} />
        </div>
      </div>
      <div class="col-span-12 min-h-screen pb-8">
        <Router {routes} on:routeLoaded={handleRouteLoaded} />
      </div>
    </div>
  </div>
</main>
