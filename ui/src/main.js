import './app.css';
import App from './App.svelte';
import {
  usePortalSubscription,
  useContactsSubscription,
  useGroupsSubscription,
  useDocketSubscription,
  useRadioSubscription,
} from './api';
import { handleSubscriptionEvent } from './state';

usePortalSubscription(handleSubscriptionEvent);
useContactsSubscription(handleSubscriptionEvent);
useGroupsSubscription(handleSubscriptionEvent);
useDocketSubscription(handleSubscriptionEvent);
useRadioSubscription(handleSubscriptionEvent);

const app = new App({
  target: document.getElementById('app'),
});

export default app;
