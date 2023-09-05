export interface Pal {
  lists: string[];
  ack: null | true;
}

export interface OutgoingPals {
  [key: string]: Pal;
}

export interface IncomingPals {
  [key: string]: boolean;
}
