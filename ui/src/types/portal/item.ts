export type ItemStruc =
  | 'feed'
  | 'collection'
  | 'app'
  | 'group'
  | 'ship'
  | 'other'
  | 'retweet'
  | 'tip';

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
