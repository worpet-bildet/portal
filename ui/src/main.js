import './app.css';
import App from './App.svelte';
import {
  usePortalSubscription,
  useContactsSubscription,
  usePalsSubscription,
} from './api';
import { handleSubscriptionEvent } from './state';

usePortalSubscription(handleSubscriptionEvent);
useContactsSubscription(handleSubscriptionEvent);
usePalsSubscription(handleSubscriptionEvent);

const app = new App({
  target: document.getElementById('app'),
});

export default app;
