import { ItemKey } from './item';

export interface GraphTarget {
  [key: string]: ItemKey[];
}

export interface SocialGraph {
  [key: string]: GraphTarget;
}
