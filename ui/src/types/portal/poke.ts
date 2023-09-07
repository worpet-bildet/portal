import {
  ItemKey,
  ItemStruc,
  Feed,
  Collection,
  App,
  Group,
  Ship,
  Other,
  Retweet,
  Tip,
  GroupsChatMsg,
  GroupsHeapCurio,
  GroupsDiaryNote,
} from './item';

export interface Poke {
  app: 'portal-manager';
  type: 'portal-action';
  json: PokeData;
}

export interface Bespoke {
  feed: Feed;
  collection: Collection;
  app: App;
  group: Group;
  ship: Ship;
  other: Other;
  retweet: Retweet;
  tip: Tip;
  'groups-chat-msg': GroupsChatMsg;
  'groups-heap-curio': GroupsHeapCurio;
  'groups-diary-note': GroupsDiaryNote;
}

export interface SocialTag {
  key: ItemKey;
  'tag-to': string;
  'tag-from': string;
}

// TODO: There's probably a better way to do this
type BespokeType = {
  [k in ItemStruc]?: k extends 'feed'
    ? Feed
    : k extends 'collection'
    ? Collection
    : k extends 'app'
    ? App
    : k extends 'group'
    ? Group
    : k extends 'ship'
    ? Ship
    : k extends 'other'
    ? Other
    : k extends 'retweet'
    ? Retweet
    : k extends 'tip'
    ? Tip
    : k extends 'groups-chat-msg'
    ? GroupsChatMsg
    : k extends 'groups-heap-curio'
    ? GroupsHeapCurio
    : k extends 'groups-diary-note'
    ? GroupsDiaryNote
    : never;
};

export interface Create {
  bespoke: BespokeType;
  time?: string;
  'prepend-to-feed'?: ItemKey[];
  'tags-to'?: SocialTag[];
  'append-to'?: ItemKey[];
}

export interface Edit {
  bespoke: any;
}

export interface SocialTagRequest {
  our: ItemKey;
  their: ItemKey;
  'tag-to': string;
  'tag-from': string;
}

export type PokeTypes =
  | 'create'
  | 'edit'
  | 'add-tag-request'
  | 'sub-to-many'
  | 'blog-sub'
  | 'payment-request'
  | 'payment-tx-hash'
  | 'set-receiving-address'
  | 'tip-request'
  | 'tip-tx-hash';

export type PokeData = {
  [k in PokeTypes]?: k extends 'create'
    ? Create
    : k extends 'edit'
    ? Edit
    : k extends 'add-tag-request'
    ? SocialTagRequest
    : never;
};
