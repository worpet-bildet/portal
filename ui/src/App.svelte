<script>
  import Router, { location } from 'svelte-spa-router';
  import { state } from '@root/state';

  import { CuratorIndex, Feed, Item, Group, App, Other } from './pages';
  import { Curator, EditCurator } from './pages/Curator';
  import { Collection, EditCollection } from './pages/Collection';
  import { Navbar, Onboard } from '@components';

  const routes = {
    '/': Feed,
    '/index': CuratorIndex,
    '/feed': Feed,
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
    // TODO: get the onboarding status of the user here
  });

  location.subscribe(() => {
    window.scrollTo(0, 0);
  });
</script>

<main>
  <div class="relative z-10">
    <Navbar />
  </div>
  <div class="p-10 z-0 lg:px-16 2xl:px-56">
    <Router {routes} />
  </div>
  <Onboard />
</main>
