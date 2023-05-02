<script>
  import Router, { location } from 'svelte-spa-router';
  import { state } from '@root/state';

  import { CuratorIndex, Feed, Item, Group } from './pages';
  import { Curator, EditCurator } from './pages/Curator';
  import { Navbar, Onboard } from '@components';

  const routes = {
    '/': Feed,
    '/index': CuratorIndex,
    '/feed': Feed,
    '/item/:itemkey': Item,
    '/group/:host/:cord': Group,
    '/:patp': Curator,
    '/:patp/edit': EditCurator,
  };

  state.subscribe((s) => {
    console.log({ state: s });
    // TODO: get the onboarding status of the user here
  });

  console.log({ $location });
</script>

<main>
  <Navbar />
  <div class="p-10 relative">
    <Router {routes} />
  </div>
  <Onboard />
</main>
