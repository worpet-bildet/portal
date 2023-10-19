import { DocketApps } from './apps/app';
import { OutgoingPals } from './apps/pals';
import { RadioStation } from './apps/radio';
import { ContactRolodex } from './landscape/contact';
import { Groups } from './landscape/groups';
import { SocialGraph } from './portal/graph';
import { ItemCollection } from './portal/item';

export type State = {
  items: ItemCollection;
  groups: Groups;
  apps: DocketApps;
  contacts: ContactRolodex;
  pals: OutgoingPals;
  radioStations: RadioStation[];
  social: SocialGraph;
  darkmode: boolean;
  muteNotifications: boolean;
  notificationsLastChecked: string;
  blogs: string[];
  isLoaded: boolean;
  palsLoaded: boolean;
  lastViewedPost: string;
  s3: any; // TODO
  payment: any; // TODO
  tip: any; // TODO
  appDevs: any; // TODO
  isComposing: boolean;
  isSearching: boolean;
  isOnboarding: boolean;
};
