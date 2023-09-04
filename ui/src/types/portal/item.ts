export interface ItemKey {
  struc: string;
  ship: string;
  cord: string;
  time: string;
}

export interface ItemMeta {
  createdAt: string;
  updatedAt: string;
}

export interface Item {
  keyObj: ItemKey;
  bespoke: any;
  keyStr: string;
  lens: string;
  meta: ItemMeta;
}

export interface ItemCollection {
  [key: string]: Item;
}
