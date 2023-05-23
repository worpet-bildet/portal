<script>
  import Router, { location } from 'svelte-spa-router';
  import { state } from '@root/state';

  import {
    CuratorIndex,
    Feed,
    Item,
    Group,
    App,
    Other,
    Explore,
  } from './pages';
  import { Curator, EditCurator } from './pages/Curator';
  import { Collection, EditCollection } from './pages/Collection';
  import { Navbar, Onboard } from '@components';

  const routes = {
    '/': Feed,
    '/index': CuratorIndex,
    '/feed': Feed,
    '/explore': Explore,
    '/item/:itemkey': Item,
    '/group/:host/:cord': Group,
    '/app/:host/:cord': App,
    '/other/*': Other,
    '/collection/*': Collection,
    '/collection-edit/*': EditCollection,
    '/:patp': Curator,
    '/:patp/edit': EditCurator,
  };

  state.subscribe((s) => {
    console.log({ state: s });
  });

  location.subscribe(() => {
    window.scrollTo(0, 0);
  });
</script>

<main>
  <div class="relative z-10">
    <Navbar />
  </div>
  <div class="p-2 z-0 md:px-16 lg:px-32 2xl:px-56">
    <Router {routes} />
  </div>
  <Onboard />
</main>
