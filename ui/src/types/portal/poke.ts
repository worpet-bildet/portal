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
  Review,
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
type BespokeCreateType = {
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
    : k extends 'review'
    ? Review
    : k extends 'groups-chat-msg'
    ? GroupsChatMsg
    : k extends 'groups-heap-curio'
    ? GroupsHeapCurio
    : k extends 'groups-diary-note'
    ? GroupsDiaryNote
    : never;
};

type BespokeEditType = {
  [k in ItemStruc]?: k extends 'feed'
    ? Partial<Feed>
    : k extends 'collection'
    ? Partial<Collection>
    : k extends 'app'
    ? Partial<App>
    : k extends 'group'
    ? Partial<Group>
    : k extends 'ship'
    ? Partial<Ship>
    : k extends 'other'
    ? Partial<Other>
    : k extends 'retweet'
    ? Partial<Retweet>
    : k extends 'tip'
    ? Partial<Tip>
    : k extends 'review'
    ? Partial<Review>
    : k extends 'groups-chat-msg'
    ? Partial<GroupsChatMsg>
    : k extends 'groups-heap-curio'
    ? Partial<GroupsHeapCurio>
    : k extends 'groups-diary-note'
    ? Partial<GroupsDiaryNote>
    : never;
};

export interface Create {
  bespoke: BespokeCreateType;
  time?: string;
  'prepend-to-feed'?: ItemKey[];
  'tags-to'?: SocialTag[];
  'append-to'?: ItemKey[];
}

export interface Edit {
  key: ItemKey;
  bespoke: BespokeEditType;
}

export interface SocialTagRequest {
  our: ItemKey;
  their: ItemKey;
  'tag-to': string;
  'tag-from': string;
}

export interface SubToMany {
  'key-list': ItemKey[];
}

export type BlogSub = null;

export interface PaymentRequest {
  seller: string;
  desk: string;
}

export interface PaymentTxHash {
  seller: string;
  'tx-hash': string;
}

export interface SetReceivingAddress {
  'receiving-address': string;
}

export interface TipRequest {
  key: ItemKey;
}

export interface TipTxHash {
  beneficiary: string;
  'tx-hash': string;
  note: string;
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
    : k extends 'sub-to-many'
    ? SubToMany
    : k extends 'blog-sub'
    ? BlogSub
    : k extends 'payment-request'
    ? PaymentRequest
    : k extends 'payment-tx-hash'
    ? PaymentTxHash
    : k extends 'set-receiving-address'
    ? SetReceivingAddress
    : k extends 'tip-request'
    ? TipRequest
    : k extends 'tip-tx-hash'
    ? TipTxHash
    : never;
};
