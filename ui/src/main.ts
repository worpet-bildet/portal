import App from './App.svelte';
import { useSubscription } from './api';
import './app.css';
import { handleSubscriptionEvent } from './state';

useSubscription('portal-store', '/updates', handleSubscriptionEvent);
useSubscription('portal-manager', '/updates', handleSubscriptionEvent);
useSubscription('portal-graph', '/updates', handleSubscriptionEvent);
useSubscription('contacts', '/news', handleSubscriptionEvent);
useSubscription('groups', '/groups', handleSubscriptionEvent);
useSubscription('docket', '/charges', handleSubscriptionEvent);
useSubscription('tower', '/greg/local', handleSubscriptionEvent);
useSubscription('storage', '/all', handleSubscriptionEvent);

declare global {
  interface Window {
    ship: string;
    ethereum: any;
  }
}

const app = new App({
  target: document.getElementById('app'),
});

export default app;
