<script>
  import Router, { location, push } from 'svelte-spa-router';
  import { GoogleAnalytics, ga } from '@beyonk/svelte-google-analytics';
  import { state, setReferredTo } from '@root/state';
  import config from '@root/config';

  import { Feed, Group, App, Explore, Api } from './pages';
  import { Curator, EditCurator } from './pages/Curator';
  import { Collection, EditCollection } from './pages/Collection';
  import { Navbar } from '@components';

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

  // Make a little flag so that we don't end up scrolling to this thing more
  // than once, which would be a bit annoying I suspect
  let scrolledAlready = false;
  state.subscribe((s) => {
    console.log({ state: s });
    if (s.referredTo) {
      const item = document.getElementById(s.referredTo.key);
      if (item) {
        item.scrollIntoView();
        scrolledAlready = true;
      }
    }
  });

  const urlParams = new URLSearchParams(window.location.hash.slice(3));
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
    const parts = notificationPath.split('/');
    const [_, __, type] = parts.slice(0, 3);
    const key = `/${parts.slice(3).join('/')}`;
    setReferredTo({ type, key });
    // we only need to navigate away from the feed if the post is a review
    if (type === 'review') push(`${key}`);
  }

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
  </div>
</main>
