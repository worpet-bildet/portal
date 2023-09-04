export interface DocketApp {
  chad: Object;
  color: string;
  href: Object;
  image: string;
  info: string;
  license: string;
  ship: string;
  title: string;
  version: string;
  website: string;
}

export interface DocketApps {
  [key: string]: DocketApp;
}

export interface DocketAppResponse {
  initial: DocketApps;
}

export interface KilnAppSyncSource {
  desk: string;
  ship: string;
}

export interface KilnApp {
  hash: string;
  sync: KilnAppSyncSource;
  wefts: Object[];
  zest: 'live' | 'dead';
}

export interface KilnApps {
  [key: string]: KilnApp;
}
