import { ItemCollection } from './portal/item';
import { Groups } from './landscape/groups';
import { ContactRolodex } from './landscape/contact';
import { DocketApps } from './apps/app';
import { OutgoingPals } from './apps/pals';
import { RadioStation } from './apps/radio';
import { SocialGraph } from './portal/graph';

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
  referredTo: { type: string; key: string };
  s3: any; // TODO
  payment: any; // TODO
  tip: any; // TODO
  appDevs: any; // TODO
};
