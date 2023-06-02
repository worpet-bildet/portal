import './app.css';
import App from './App.svelte';
import {
  usePortalStoreSubscription,
  // usePortalManagerSubscription,
  useSocialSubscription,
  useContactsSubscription,
  useGroupsSubscription,
  useDocketSubscription,
  useRadioSubscription,
  useStorageSubscription,
} from './api';
import { handleSubscriptionEvent } from './state';

usePortalStoreSubscription(handleSubscriptionEvent);
// usePortalManagerSubscription(handleSubscriptionEvent);
useSocialSubscription(handleSubscriptionEvent);
useContactsSubscription(handleSubscriptionEvent);
useGroupsSubscription(handleSubscriptionEvent);
useDocketSubscription(handleSubscriptionEvent);
useRadioSubscription(handleSubscriptionEvent);
useStorageSubscription(handleSubscriptionEvent);

const app = new App({
  target: document.getElementById('app'),
});

export default app;
