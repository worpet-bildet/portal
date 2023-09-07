export type ItemStruc =
  | 'feed'
  | 'collection'
  | 'app'
  | 'group'
  | 'ship'
  | 'other'
  | 'retweet'
  | 'tip'
  | 'blog'
  | 'groups-chat-msg'
  | 'groups-heap-curio'
  | 'groups-diary-note';

export interface ItemKey {
  struc: ItemStruc;
  ship: string;
  cord: string;
  time: string;
}

export interface ItemMeta {
  createdAt: string;
  updatedAt: string;
}

export interface FeedItem {
  key: ItemKey;
  ship: string;
  time: number;
}

export interface Item {
  embedding: any;
  keyObj: ItemKey;
  bespoke: any;
  keyStr: string;
  lens: string;
  meta: ItemMeta;
  score: number | null;
}

export interface ItemCollection {
  [key: string]: Item;
}

export interface Feed {}
export interface Collection {
  title: string;
  blurb: string;
  image: string;
  'key-list': ItemKey[];
}
export interface App {}
export interface Group {}
export interface Ship {}
export interface Other {
  title: string;
  blurb: string;
  link: string;
  image: string;
}
export interface Retweet {
  ref: ItemKey;
  blurb: string;
}
export interface Tip {}
export interface GroupsChatMsg {}
export interface GroupsHeapCurio {}
export interface GroupsDiaryNote {}
