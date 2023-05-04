import './app.css';
import App from './App.svelte';
import {
  usePortalSubscription,
  useContactsSubscription,
  useGroupsSubscription,
} from './api';
import { handleSubscriptionEvent } from './state';

usePortalSubscription(handleSubscriptionEvent);
useContactsSubscription(handleSubscriptionEvent);
useGroupsSubscription(handleSubscriptionEvent);

const app = new App({
  target: document.getElementById('app'),
});

export default app;
