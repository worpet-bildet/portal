<script>
  import Router, { location } from 'svelte-spa-router';
  import { GoogleAnalytics, ga } from '@beyonk/svelte-google-analytics';
  import { state } from '@root/state';
  import config from '@root/config';

  import { Feed, Group, App, Explore, Api } from './pages';
  import { Curator, EditCurator } from './pages/Curator';
  import { Collection, EditCollection } from './pages/Collection';
  import { Navbar, Onboard } from '@components';

  const routes = {
    '/': Feed,
    '/feed': Feed,
    '/explore': Explore,
    '/group/:host/:cord': Group,
    '/app/*': App,
    '/collection/*': Collection,
    '/collection-edit/*': EditCollection,
    '/:patp': Curator,
    '/:patp/edit': EditCurator,
  };

  console.log('ENV', config.env);
  if (config.env === 'development') {
    routes['/dev/api'] = Api;
  }

  state.subscribe((s) => {
    console.log({ state: s });
  });

  location.subscribe((loc) => {
    window.scrollTo(0, 0);
    ga.addEvent('pageview', { location: loc });
  });
</script>

<main class:dark={$state.darkmode}>
  <div
    class="dark:bg-gradient-to-b from-darkgrey to-gradientdark dark:text-white min-h-screen"
  >
    <GoogleAnalytics properties={[config.googleAnalyticsId]} />
    <div class="relative z-10">
      <Navbar />
    </div>
    <div class="p-2 z-0 md:px-16 lg:px-32 2xl:px-56">
      <Router {routes} />
    </div>
    <Onboard />
  </div>
</main>
