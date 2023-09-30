import { writable } from 'svelte/store';

export const sigVisible = writable(false);
export const sigItems = writable([]);
export const sigLocation = writable({ x: 0, y: 0, height: 0 });
export const sigProps = writable({ editor: null, range: null });
